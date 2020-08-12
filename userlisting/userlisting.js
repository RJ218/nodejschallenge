const express=require("express");
const app=express();
const mongoose=require("mongoose");

require("./user");
const user_model=mongoose.model("user");

const bodyParser=require("body-parser");

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://rachitjain:16Cse071@cluster0.poztc.mongodb.net/test', {useMongoClient: true}, function(err){
    if(err) {
        console.log('Some problem with the connection ' +err);
    } else {
        console.log('The Mongoose connection is ready');
    }
})


app.get('/',(req,res)=>{
    res.send("this is userinfo speaking.how u do")
})

app.get("/user",(req,res)=>{
    user_model.find().then(user_list=>{
        console.log(user_list);
        res.json(user_list);
    })
})
app.listen(3000,()=>{
    console.log("server xvffg");
})