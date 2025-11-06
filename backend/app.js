const express=require("express")
const mongoose=require("mongoose")
const userModel=require("./models/user")
const dbconnect=require("./database")
const app=express()

// Use for connect frontend to backend
const cors=require("cors")


app.use(express.json())
app.use(cors())

app.post("/hello",(req,res)=>{
    res.send("You get this data from home")
})

app.post("/about",(req,res)=>{
    res.send("You get this data from about")
})

app.post("/contact",(req,res)=>{
    res.send("You get this data from contact")
})

app.post("/adduser",async(req,res)=>{
try{
    const data={
        firstname:"khan",
        lastname:"masum",
        emailId:"khan1234@gmail.com",
        password:"khanbro@12"
    }
    const user=await userModel(data)
    await user.save();

    res.send("Data send succesfully")
}
catch(err){
    res.status(400).send("data not add")
}
})

dbconnect()

.then(()=>{
    console.log("Database connection done")
})
.catch(err=>{
    console.log("Database connection failed")
})
app.listen(8888,()=>{
    console.log("Server is running on 8888 port")
})