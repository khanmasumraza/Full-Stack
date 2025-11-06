const validator=require("validator")
const validatorReq=(req,res,next)=>{
try{
    const {firstname,lastname,emailId,password}=req.body

    if(!firstname.length>8){
        throw new Error ("Name should be less than 5 chrac")
    }

  if(!validator.isEmail(emailId)){
    throw new Error ("Email is not valid")
  }

  if(!validator.isStrongPassword(password)){
    throw new Error("Enter strong pass")
  }
  next();
}

catch(err){
    res.status(400).send(err.message)
}
}
module.exports=validatorReq;