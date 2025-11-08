const express=require("express")
const mongoose=require("mongoose")
const userModel=require("./models/user")
const movieModel=require("./models/movie")
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
   const {firstname,lastname,emailId,password,skills,age,}=req.body

   const user=new userModel({
    firstname,lastname,emailId,password,skills,age
   })
   await user.save();
    res.send(user)
    console.log(user)
}
catch(err){
    res.status(400).send("data not add")
}
})

app.get("/getuser",async(req,res)=>{
    const find=await userModel.findOne({emailId:"roman125@gmail.com"})
    res.send(find)
    console.log(find)
})

app.post("/movie",async(req,res)=>{
try{
    const {title,releaseDate,actor,heroine,budget}=req.body;

    const data= new movieModel({
        title,releaseDate,actor,heroine,budget
    })
    await data.save();
        res.send({message:"Movie data send succesfully"})
}
catch(err){
    res.status(400).send("Error:"+ err.message)
}
})

app.get("/movieList",async(req,res)=>{
    const movie= await movieModel.find()
    console.log(movie)
    res.send(movie)
})

app.listen(8888,()=>{
    console.log("Server is running on 8888 port")
})