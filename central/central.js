
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const axios = require("axios");
const { response } = require("express");
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send("This is the central microservice");
})


//for booking of a person
app.post('/book',(req,res)=>{
    //console.log(req.body);
    var newbooking={
        name1:req.body.name1,
        name2 :req.body.name2,
        Date:req.body.Date,
        Time:req.body.Time
    };
    axios.post('http://localhost:3003/booking',newbooking).then(response=>{
        console.log(response.data);
        res.send(response.data);
    })

    })

    //for user registration
app.post('/user_resgistration',(req,res)=>{
    var userinfo={
        First_name: req.body.First_name,
        Last_name:req.body.Last_name,
       contactnumber:req.body.contactnumber,
       emailid:req.body.emailid
    }
    axios.post('http://localhost:3000/user',userinfo).then(response=>{
        console.log(response.data);
        res.send(response.data);
    })
})

app.listen(3004,()=>{
    console.log("this is the central microservice");
})