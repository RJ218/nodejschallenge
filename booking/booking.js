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



app.post("/booking", (req, res) => {
    let found1 = 0;
    let found3 = 0;
    axios.get("http://localhost:3001/userlist").then(response => {
       // console.log(response.data);
      //  console.log(req.body);
        for (var i in response.data) {
            console.log("i=" + i);
            if (response.data[i].First_name == req.body.name1)
                found1 = 1;
            if (response.data[i].First_name == req.body.name2)
                found3 = 1;
        }
        //console.log(found1 + "+" + found3);
    }).then(() => {
        var date_found = 0;
        axios.get("http://localhost:3003/bookinginfo").then(response => {
            console.log(response.data);
            console.log(req.body);
            for (var i in response.data) {
                if (response.data[i].Date == req.body.Date)
                    {date_found = 1;
                        break;
                    }
            }
            if (date_found == 0) {
              console.log("date found");
            }
            else
            {
                console.log("date not found");
            }
        })

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
            res.send("not found these names");

        }

    })

})

app.get('/', (req, res) => {
    res.send("This is bookinginfo server");
})

app.listen(3003, () => {
    console.log("this is booking server");
})