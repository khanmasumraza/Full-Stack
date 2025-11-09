const jwt=require("jsonwebtoken")
const userAuth=async(req,res,next)=>{
 try{
 const token=req.cookies.token
 console.log("Cookies:", req.cookies);


if(!token){
throw new Error("Token is Invalid")
}

const decoded=await jwt.verify(token,"Masum@145")
if(!decoded){
    throw new Error("Invalid ")
}
 
req.user=decoded;
next();
}
catch (err) {
    res.status(401).send(err.message);
  }
};
module.exports=userAuth;