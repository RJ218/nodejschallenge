const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const axios = require("axios");

function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum/1000;
}


app.get('/',(req,res)=>{
    console.log(toTimestamp("01/04/1999 5:00:00"));
    console.log(toTimestamp("01/04/1999 5:00:01"));
    console.log(((Math.abs(toTimestamp("01/04/1999 4:00:00")-toTimestamp("01/04/1999 5:00:00")))));
})

app.listen(3005,()=>{
    console.log("testing")
})