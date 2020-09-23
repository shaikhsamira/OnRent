const express =require("express")
const router= express.Router()
const bcrypt= require('bcrypt')
const mongoose=require('mongoose')
const jwt= require("jsonwebtoken")
const Users = mongoose.model("Users")
const {JWTSCRETE} =require('../config/keys')


router.get('/',(req,res)=>{
    res.send("On Rent")
})

//Signup
router.post('/signup',(req,res)=>{
    const {name,email,password,url} = req.body
    if(!name || !email || !password){
        return console.log("Please Fill all field")
    }
    Users.findOne({email:email})
    .then((exiteduser)=>{
        if(exiteduser){
            return res.status(422).json({message:"User Already Exist"})
        }
        bcrypt.hash(password,12)
        .then(hashedPass=>{
            const user=new Users({
                name,
                email,
                password:hashedPass,
                url
            })
            user.save()
            .then(user=>{
                return res.json({message:"Signup Successful"})
                history.push('/signin')
            })
            .catch(err=>{
                console.log(err);
            })
        })
        .catch(err=>{
            console.log(err);
        })
    })
})


// Signin = set token and user 
router.post('/signin',(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(422).json({error:"please add email or password"})
    }
    Users.findOne({email:email})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,user.password)
        .then(domatch=>{
            if(domatch){
                const token = jwt.sign({_id:user._id},JWTSCRETE)
                const {_id,name,email,url} = user
                 res.json({token,user:{_id,name,email,url}})
            }
            else{
             return res.status(422).json({error:"Invalid Email or password"})
            }
        })
        .catch(err=>{
            console.log(err);
        })
    })
})



module.exports=router