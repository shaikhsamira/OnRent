const mongoose =require("mongoose")
const {ObjectId}=mongoose.Schema.Types

const Post =new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    rent:{
        type:Number,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    avail:{
        type:Date,
        required:true
    },
    postedBy:{
        type:ObjectId,
        ref:"Users",
        // required:true
    },
    comments:[{
        text:String,
        postedBy:{type:String}
    }],
   tag:{
       type:String,
       required:true
   }

    
})

mongoose.model("Post",Post)