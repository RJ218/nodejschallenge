const mongoose = require("mongoose");

mongoose.model("user" , {
    First_name: {
        type:String,
        require:true
    },
    Last_name:{
        type:String,
        require:true
    },
   contactnumber:{
       type:String,
       require:true
   },
   emailid:{
       type:String,
       require:true
   }
})