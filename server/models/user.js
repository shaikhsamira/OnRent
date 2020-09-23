const mongoose = require('mongoose')

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    url:{
        type:String,
        default:"https://res.cloudinary.com/shaikhsamira2000/image/upload/v1597500261/images_zqsfv7.jpg"
    }
})


mongoose.model("Users",userSchema)