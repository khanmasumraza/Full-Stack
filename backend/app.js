const express=require("express")
const mongoose=require("mongoose")
const userModel=require("./models/user")
const validatorReq=require("../Frontend/validators/validator")
require("./database")
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

app.post("/adduser",validatorReq,async(req,res)=>{
try{
   const {firstname,lastname,emailId,password,skills,age}=req.body

   const user=new userModel({
    firstname,lastname,emailId,password,skills,age
   })
   await user.save();
    res.send("Data send succesfully")
}
catch(err){
    res.status(400).send("data not add")
}
})

app.get("/getuser",async(req,res)=>{
    const find=await userModel.find({})
    res.send(find)
})
app.listen(8888,()=>{
    console.log("Server is running on 8888 port")
})