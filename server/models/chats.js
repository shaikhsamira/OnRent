const mongoose =require("mongoose")
const {ObjectId}=mongoose.Schema.Types

const Chat =new mongoose.Schema({
    postid:{
        type:String,
        required:true
    },
    postedBy:{
        type:String,
        required:true
    },
    useremail:{
        type:String,
        required:true
    },
    postedByemail:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    },
    imgurl:{
        type:String,
        required:true
    },
    comments:[{
        text:String,
        postedBy:{type:String}
    }]


    
})

mongoose.model("Chat",Chat)