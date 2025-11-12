const express=require("express")
const mongoose=require("mongoose")
const userModel=require("./models/user")
const movieModel=require("./models/movie")
const validatorReq=require("../Frontend/validators/validator")
const bcrypt=require("bcrypt")
const cookieParser=require("cookie-parser")
const jwt=require("jsonwebtoken")
const userAuth=require("../middleware/userAuth")
const connectionRequest=require("./models/connectionRequest")

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
   console.log(passwordHash);
   
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

app.post("/login",userAuth,async(req,res)=>{
    try{
        console.log(req.body)
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
const token= await jwt.sign({_id:user._id,emailId:user.emailId},"Masum@145")

// craete cookie
res.cookie("token",token,   {httpOnly: true},  { maxAge: 7 * 24 * 60 * 60 * 1000 } )
    res.send("Login succesfull")
 
}
catch(err){
    res.status(400).json({error:err.message})
}
})

app.post("/logout",async(req,res)=>{
    res.cookie("token","", {expires: new Date(0)})
    res.send("Logout succesfully")
})

app.get("/view",userAuth,(req,res)=>{
res.send(" Welcome " + req.user.emailId)
})

app.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    // 🔹 1. Get IDs & status
    const fromUserId = req.user_id; // from logged-in user (middleware)
    const toUserId = req.params.toUserId; // from URL
    const status = req.params.status; // from URL

    // 🔹 2. Validate allowed status values
    const allowedStatus = ["ignored", "interested"];
    if (!allowedStatus.includes(status)) {
      return res
        .status(400)
        .json({ message: "Invalid status type: " + status });
    }

    // 🔹 3. Check if target user exists
    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(400).json({ message: "User not found!" });
    }

    // 🔹 4. Check for existing connection request (both directions)
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingConnectionRequest) {
      return res
        .status(400)
        .send({ message: "Connection request already exists" });
    }

    // 🔹 5. Create and save new connection request
    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();

    // 🔹 6. Send response
    res.json({
      message: `${req.user.firstName} is ${status} in ${toUser.firstName}`,
      data,
    });
  } catch (err) {
    // 🔹 7. Handle errors
    res.status(400).send("ERROR: " + err.message);
  }
});

app.get("/getuser",async(req,res)=>{
    const find=await userModel.find()
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