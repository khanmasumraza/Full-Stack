const express=require("express")
const mongoose=require("mongoose")
const userModel=require("./models/user")
const movieModel=require("./models/movie")
const validatorReq=require("../Frontend/validators/validator")
const bcrypt=require("bcrypt")
const cookieParser=require("cookie-parser")
const jwt=require("jsonwebtoken")
const userAuth=require("../middleware/userAuth")
const ReqModel=require("./models/connectionRequest")

require("./database")
const app=express()

// Use for connect frontend to backend
const cors=require("cors")


app.use(express.json())
app.use(cors())
app.use(cookieParser())

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
    console.log("Received body:", req.body); 

   // bcrypt pass  
   
   const passwordHash= await bcrypt.hash(password,10)
   
   const user=new userModel({
    firstname,lastname,emailId,password:passwordHash,skills,age
   })
   
   await user.save();
    res.send(user)
}

catch(err){
    res.status(400).json({error:err.message})
}
})

app.post("/login",async(req,res)=>{
    try{

const {password,emailId}=req.body;

const user= await userModel.findOne({emailId})
if(!user){
    throw new Error("Email not found")
}

const passValid= await bcrypt.compare(password,user.password)
if(!passValid){
    throw new Error("Invalid credeintals")
}

// create jwt token
const token= await jwt.sign({_id:user._id,emailId:user.emailId,},"Masum@145")

// craete cookie
res.cookie("token", token, {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000
});

res.send("Login succesfully")
}

catch(err){
    res.status(400).json({error
      :err.message})
}
})

app.post("/logout",async(req,res)=>{
    res.cookie("token","", {expires: new Date(0)})
    res.send("Logout succesfully")
})

app.get("/view",userAuth,(req,res)=>{

const user=req.user
res.send(user)
})

app.post("/request/send/:status/:reciever", userAuth, async (req, res) => {
  
  try{
    // Read 
    const sender=req.user._id;
    const reciever=req.params.reciever;
const status=req.params.status

// Validating status
const validStatus=["intrested","ignored"]
if(!validStatus.includes(status)){
  throw new Error("Status is not valid")
}
const senderUser = await userModel.findById(sender);

// Checking user is present in db or not
const existingUser= await userModel.findById(reciever)
if(!existingUser){
  throw new Error("User not available in db");
}

// Avoiding duplicate request
const ConnectionExist= await ReqModel.findOne({
  $or:[
    {sender:sender,reciever:reciever},
    {sender:reciever,reciever:sender}
  ]
})
if(ConnectionExist){
  throw new Error("Connection Already Exist");
}

// Avoiding to send req to own
if(String(sender)===String(reciever)){
  throw new Error("You can send req to yourself");
}

const connectionRequest= new ReqModel({
  sender,reciever,status
})

const user= await connectionRequest.save();

res.send(`${senderUser.firstname} is ${status} in ${existingUser.firstname}`);

  }
  catch(err){
    res.status(400).send("ERROR:"+ err.message)
  }
})

app.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
try{

 const loggedInUser=req.user;
 const {status,requestId}=req.params

 const validStatus=["accepted","rejected"]
 if(!validStatus.includes(status)){
  throw new Error("Status is not valid")
 }
const cleanRequestId = requestId.trim()

 const connectionReq= await ReqModel.findOne({
  _id:cleanRequestId,
  reciever:loggedInUser._id,
  status:"intrested"
 })

 if(!connectionReq){
  return res.status(400).send("Connection Req not found");
 }

 connectionReq.status=status

 const data=await connectionReq.save();

 res.send("Connection req update")
}
catch(err){
  res.status(400).send("ERROR:"+err.message)
}
})

app.get("/user/requests/received",userAuth,async (req,res)=>{

  try{
    const loggedInUserId=req.user

     const connectionReq= await ReqModel.find({
      reciever:loggedInUserId._id,
      status:"intrested"
    }).populate("sender", "firstname lastname ")
    
   return res.json({message:"Data fetched succesfully",data:connectionReq})
  }
  catch(err){
    res.status(400).send("ERROR: "+err.message)
  }

})

app.get("/user/connections",userAuth,async (req,res)=>{
  try{
const loggedInUserId=req.user

const connectionRequest= await ReqModel.find({
  $or:[
    {sender:loggedInUserId._id,status:"accepted"},
    {reciever:loggedInUserId._id,status:"accepted"}
  ]
}).populate("sender","firstname lastname photoUrl")

  const data=  connectionRequest.map((row)=>{
if(row.sender._id.toString()===loggedInUserId._id.toString()){
  return row.reciever
}
return row.sender
  });
res.send(data)
  }
  catch(err){
    res.status(400).send("ERROR:" + err.message)
  }
})
app.get("/getuser",async(req,res)=>{
    const find=await userModel.find()
    res.send(find)
})

app.post("/movie",async(req,res)=>{
try{
    const {title,releaseDate,actor,heroine,budget}=req.body;

    const data= new movieModel({
        title,releaseDate,actor,heroine,budget
    })
    await data.save();
        res.json({message:"Movie data send succesfully",data})
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