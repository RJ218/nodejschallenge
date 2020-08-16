const express=require("express");
const app=express();
const mongoose=require("mongoose");

require("./user");
const user_model=mongoose.model("user");

const bodyParser=require("body-parser");
const { type } = require("os");

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

app.get("/userlist",(req,res)=>{
    user_model.find().then(user_list=>{
        res.send(user_list);
    })
})

//ignore
app.get("/userid",(req,res)=>{
    user_model.find().then(user_listt=>{
        for(var i in user_listt)
            {
                if(i.First_name==req.body.First_name && i.Last_name==req.body.Last_name)
                    {
                        console.log(i._id);
                        res.send(i._id);
                        break;
                    }
            }
            res.send("not found");
    })
})

app.post("/user",(req,res)=>{
    console.log("data recieved");
    console.log(req.body);
   
    if((req.body.Last_name)[0]=='a'||(req.body.Last_name)[0]=='A')
        {
            
            var newUserdata={
                First_name:req.body.First_name,
                Last_name:req.body.Last_name,
                contactnumber:req.body.contactnumber,
                emailid:req.body.emailid
            }
            var newuser=new user_model(newUserdata);
            newuser.save().then(()=>{
                console,log("new user info added")
            }).catch((err)=>{
                if(err)
                    throw err;
            })
        
            
            res.send("data recieved");

        }
        else
        {
            res.send("The last name must start with 'a'");

}
})

app.listen(3000,()=>{
    console.log("server for userregistration");
})