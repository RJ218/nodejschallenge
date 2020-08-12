const mongoose = require("mongoose");

mongoose.model("user" , {
    name: {
        type:String,
        require:true
    },
    booked:{
        type:String,
        require:false
    }
})