const express=require("express");
const app=express();
const mongoose=require("mongoose");
const axios=require("axios");



require("./user");
const user_model=mongoose.model("user");

const bodyParser=require("body-parser");

app.use(bodyParser.json());


app.get('/userlist',(req,res)=>{
    axios.get("http://localhost:3000/user").then((response=>{
        console.log(response);
    }))
})

app.get('/userid',(req,res)=>{
    axios.get("http://localhost:3000/userid").then((response=>{
        console.log(response);
        res.send(response);
    }))
})

app.get('/',(req,res)=>{
    res.send("this is userlisting speaking.how u do")
})


app.listen(3001,()=>{
    console.log("server xvffg");
})