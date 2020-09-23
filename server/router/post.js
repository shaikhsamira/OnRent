const express =require("express")
const router=express.Router()
const mongoose=require('mongoose')
const Post= mongoose.model("Post")


router.post("/createpost",(req,res)=>{
    const {title,desc,url,rent,avail,postedBy,tag}=req.body
    const json = postedBy;
    const obj = JSON.parse(json);
    const posts=new Post({
        title,
        desc,
        url,
        avail,
        rent,
        postedBy:obj,tag
    })
    posts.save()
    .then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err);
    })
    
})


router.get('/allpost',(req,res)=>{
    Post.find()
    .populate("postedBy","_id name")
    .then((posts)=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err);
    })
})

router.put('/comment',(req,res)=>{
    
    const json = req.body.user;
    const obj = JSON.parse(json);

    if(obj==null){
        return res.status(422).json({error:"log in"})
    }
    const comment = {
        text:req.body.text,
        postedBy:obj.name
    }
    Post.findByIdAndUpdate(req.body.postId,{
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
            res.json(result)
            // console.log(result);
        }
    })
})

router.delete("/deletepost/:id",(req,res)=>{
    Post.findByIdAndRemove(req.params.id,(err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        else{
            res.json(post)
        }

    })
})









module.exports = router