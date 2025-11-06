const express=require("express")
const mongoose=require("mongoose")
const user=require("express")
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

// dbconnect()

// .then(()=>{
//     console.log("Database connection done")
// })
// .catch(err=>{
//     console.log("Database connectio failed")
// })
app.listen(8888,()=>{
    console.log("Server is running on 8888 port")
})