const express=require("express");
const app=express();
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const axios=require("axios");
require('./booking_model');
var booking_model=mongoose.model("booking");
app.use(bodyParser.json());

const { response } = require("express");

mongoose.connect('mongodb+srv://rachitjain:16Cse071@cluster0.poztc.mongodb.net/booking', {useMongoClient: true}, function(err){
    if(err) {
        console.log('Some problem with the connection ' +err);
    } else {
        console.log('The Mongoose connection is ready');
    }
})
app.get("/bookinginfo",(req,res)=>{
    booking_model.find().then(booking_list=>{
        res.send(booking_list);
    })
})


app.post("/booking",(req,res)=>{
    console.log(req.body);
            var new_bookingData={
                name1:req.body.name1,
                name2:req.body.name2,
                Date:req.body.Date,
                Time:req.body.Time
            }
            var newBooking=new booking_model(new_bookingData);
            newBooking.save().then(()=>{
                console.log("data saved")
                res.send("data saved");
            }).catch((err)=>{
                if(err)
                    throw err;
            })




               
        })

        app.get('/',(req,res)=>{
            res.send("This is bookinginfo server");
        })

app.listen(3003,()=>{
    console.log("this is booking server");
})