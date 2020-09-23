const express =require("express")
const app=express()
const PORT=5000
const mongoose=require('mongoose')
const {MONGOURL} =require('./config/keys')
require('./models/user')
require('./models/post')
require('./models/chats')

mongoose.connect(MONGOURL,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected',()=>{
    console.log("conneted to database")
})
mongoose.connection.on('error',(err)=>{
    console.log("err while connecting",err)
})



app.use(express.json())

app.use(require('./router/auth'))
app.use(require('./router/post'))
app.use(require('./router/chat'))






app.listen(PORT,()=>{
    console.log("Port is on");
})