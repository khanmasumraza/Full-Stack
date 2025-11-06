const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    emailId:{
        type:String
    },
    password:{
        type:String
    }
})

const user=mongoose.model("info",userSchema)

module.exports=user;