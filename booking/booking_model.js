const mongoose = require("mongoose");
const { Timestamp } = require("bson");

mongoose.model("booking" , {
    name1:{
        type:String,
        require:true
    },
    name2:{
        type:String,
        require:true
    },
 
   timestmp:{
        type:Number,
        require:true
   }
   
})