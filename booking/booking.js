const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const axios = require("axios");
require('./booking_model');
var booking_model = mongoose.model("booking");
app.use(bodyParser.json());

const { response } = require("express");

mongoose.connect('mongodb+srv://rachitjain:16Cse071@cluster0.poztc.mongodb.net/booking', { useMongoClient: true }, function (err) {
    if (err) {
        console.log('Some problem with the connection ' + err);
    } else {
        console.log('The Mongoose connection is ready');
    }
})
app.get("/bookinginfo", (req, res) => {
    booking_model.find().then(booking_list => {
        res.send(booking_list);
    })
})

function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum/1000;
}

app.post("/booking", (req, res) => {
    console.log(req.body);
    let found1 = 0;
    let res_timestamp=toTimestamp(req.body.Date+" "+req.body.Time);
    let found3 = 0;
    let timestamp_found=0;
    //console.log(toTimestamp(req.body.Date+" "+req.body.Time));
    axios.get("http://localhost:3001/userlist").then(response => {
        // console.log(response.data);
        //  console.log(req.body);
        for (var i in response.data) {
           // console.log("i=" + i);
            if (response.data[i].First_name == req.body.name1)
                found1 = 1;
            if (response.data[i].First_name == req.body.name2)
                found3 = 1;
        }
        //console.log(found1 + "+" + found3);
    }).then(() => {
       if(found1 == 0 || found3 == 0)
        {
            console.log("Person that you are trying to book do not exist.");
            res.send("Person that you are trying to book do not exist.");
        }
        axios.get("http://localhost:3003/bookinginfo").then(response => {
            //console.log(response.data);
            //console.log(req.body);
            for (var i in response.data) {
                //console.log(response.data[i].Date == req.body.Date);
               // console.log(req.body.Date);
               console.log((Math.abs(response.data[i].timestmp-res_timestamp)/1000));
                console.log((((Math.abs(response.data[i].timestmp-res_timestamp))/3600 )%24));
               if((((Math.abs(response.data[i].timestmp-res_timestamp))/3600 )%24)<1)
                    {
                        timestamp_found=1;
                        break;
                    }
            }
        }).then(() => {
            //console.log(date_found);
            if (timestamp_found == 1) {
                res.send("already booked choose another time")
                //console.log("date found");
               
              //  console.log(time_found);

              /*
                for(var i =0;i<time_found.length;i++)
                    {
                        if(Math.abs((time.getTime()-time_found[i].getTime())/(1000*60*60))>=1)
                            {
                                if (found1 == 1 && found3 == 1) {
                                    var new_bookingData = {
                                        name1: req.body.name1,
                                        name2: req.body.name2,
                                        Date: req.body.Date,
                                        Time: req.body.Time
                                    }
                                    var newBooking = new booking_model(new_bookingData);
                                    newBooking.save().then(() => {
                                        console.log("data saved")
                                        res.send("data saved");
                                    }).catch((err) => {
                                        if (err)
                                            throw err;
                                    })
                                }
                                else {
                                    console.log("else part");
                                    res.send("1"+1);
                    
                                }
                                break;
                            }

                    }
                res.send(`${toTimestamp(req.body.Date+" "+req.body.Time)}`);
            */
            }
            else {
               // console.log("date not found");
                if (found1 == 1 && found3 == 1) {
                    var new_bookingData = {
                        name1: req.body.name1,
                        name2: req.body.name2,
                        timestmp:toTimestamp(req.body.Date+" "+req.body.Time)
                    }
                    var newBooking = new booking_model(new_bookingData);
                    newBooking.save().then(() => {
                        console.log("data saved")
                        res.send("data saved");
                    }).catch((err) => {
                        if (err)
                            throw err;
                    })
                }
                else {
                    console.log("Person that you are trying to book do not exist.");
                    res.send("Person that you are trying to book do not exist.");
    
                }
            }
        })





    })

})

app.get('/', (req, res) => {
    res.send("This is bookinginfo server");
})

app.listen(3003, () => {
    console.log("this is booking server");
})

