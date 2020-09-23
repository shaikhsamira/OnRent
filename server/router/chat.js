const { User } = require("actions-on-google/dist/service/actionssdk/conversation/user")
const express =require("express")
const router=express.Router()
const mongoose=require('mongoose')
const Chat= mongoose.model("Chat")
const Users= mongoose.model("Users")
const Post= mongoose.model("Post")

router.post('/chatwith',(req,res)=>{
        const id=req.body.id;
        const creater=req.body.creater._id;
        const json = req.body.user;
        const obj = JSON.parse(json);
        var Creater=""
        var useremail=obj.email;
        var createremail;

        Users.findById(req.body.creater._id)
        .then(result=>{
            Chat.find({postid:id,postedByemail:result.email,useremail}) 
            .then(result=>{
                if(result.length>0){
                res.json({already:"already existed"})
                }
                else{
                    Users.findById(creater)
                    .then(user1=>{
                        Post.findById(id)
                        .then(postimg=>{
                            const imgurl=postimg.url
                            // console.log(imgurl);
                            
                            const chats=new Chat({
                                postid:id,
                                postedByemail:user1.email,
                                useremail:obj.email,
                                user:obj.name,
                                postedBy:user1.name,
                                imgurl:imgurl
                            })
            
                            chats.save()
                            .then(result=>{
                                // console.log(result);
                                // result=JSON.stringify(result)
                                res.json({result})
                            })
                            .catch(err=>{
                                console.log(err);
                            })
                            
                        })
                        
                    })
                            }
            })
                
        })



    //     // var createrid = mongoose.Types.ObjectId(creater);
    // console.log(creater);
})

router.post('/tomeChat',(req,res)=>{
    const {postid,postedBy,user,postedByemail}=req.body
    const obj = JSON.parse(user);
    const email=obj.email;
    Chat.find({postedByemail:email})
    .then((post)=>{
        res.json({post})
    })
    .catch(err=>{
        console.log(err);
    })
})

router.put('/chatfromMe',(req,res)=>{
    const {postid,postedBy,username,postedByemail,useremail}=req.body
    Chat.find({ $and: [ {postedByemail:postedByemail }, { useremail:useremail},{postid:postid}]})
    .then((chats)=>{
        res.json({chats});
    })
    .catch(err=>{
        console.log(err);
    })
})

router.put('/chatToMe',(req,res)=>{
    const {postid,postedBy,user,postedByemail,useremail}=req.body
    Chat.find({ $and: [ {postedByemail:postedByemail }, { useremail:useremail},{postid:postid}]})
    .then((chats)=>{
        res.json({chats});
        // console.log(chats);
    })
    .catch(err=>{
        console.log(err);
    })
})




router.put('/chats',(req,res)=>{
    const postid=req.body.postid;
    const postedBy=req.body.postedBy;
    const postedByemail=req.body.postedByemail;
    const text=req.body.text;

    const json = req.body.user;
    const obj = JSON.parse(json);

    // console.log(req.body.postedBy);
    
    if(text== null){
        return res.status(422).json({error:"Please enter text"})
    }

    const comment = {
        text,
        postedBy:obj.name
    }

    // remianing from here

    
    Chat.findOne({postid:postid,useremail:obj.email})
    .then(chat=>{
            Chat.findByIdAndUpdate(chat._id,{
                $push:{comments:comment}
            },{
                new:true
            })
            // .populate("comments.postedBy","_id name")
            // .populate("postedBy","_id name")
            .exec((err,result)=>{
                if(err){
                    return res.status(422).json({error:err})
                }else{
                    // console.log(result);
                    res.json(result)
                }
            })
    })
})


router.put('/commented',(req,res)=>{
    const chatdata=req.body.chatdata;
    const text=req.body.text;
    const obj = chatdata;
    const user=req.body.user;
    // console.log(req.body.user);

    if(text== null){
        return res.status(422).json({error:"Please enter text"})
    }
   
    const comment = {
        text,
        postedBy:user
    }


    Chat.findOne({ $and: [ {postedByemail:chatdata.postedByemail }, { useremail:chatdata.useremail},{postid:chatdata.postid}]})
    .then((chats)=>{
        console.log(chats);
        const id=chats._id;
        console.log(id);

        Chat.findByIdAndUpdate(chats._id,{
            $push:{comments:comment}
        },{
            new:true
        })
        .exec((err,result)=>{
            if(err){
                return res.status(422).json({error:err})
            }else{
                res.json(result)
            }
        })
    })
    .catch(err=>{
        console.log(err);
    })
})



router.post('/mychatall',(req,res)=>{
    const user=req.body.user;
    const obj=JSON.parse(user);
    Chat.find({ $or: [ {postedByemail:obj.email }, { useremail:obj.email}]})
    .then((chats)=>{
       res.json({chats});
    //    console.log(chats);
    })
    .catch(err=>{
        console.log(err);
    })
    
})


router.post('/mychat',(req,res)=>{

            const json = req.body.user;
            const obj = JSON.parse(json);
            var chatarry=[]
            var postid=[]

            const email=obj.email;
            Chat.find({ $or: [ {postedBy:email }, { useremail:email}]})
            // .populate("postedBy","_id name")
            .then((chats)=>{
                // res.json({chats})
                // console.log(chats);
                chats.map(item=>{
                    chatarry.push(item.comments)
                    postid.push(item.postid)
                })
                res.json({chatarry,postid})
                // console.log(postid);
            })
            .catch(err=>{
                console.log(err);
            })
})




router.post('/seepost',(req,res)=>{

    const postid = req.body.postid;

    Post.find({_id:postid})
    .then((post)=>{

        res.json({post})

    })
    .catch(err=>{
        console.log(err);
    })
})


router.post('/chatto',(req,res)=>{

    const postid = req.body.postid;
    const user = req.body.user;
    // console.log(user);
   
})







module.exports = router