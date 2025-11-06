const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        maxLength:8,
    },
    lastname:{
        type:String
    },
    emailId:{
        type:String
    },
    password:{
        type:String
    },
    skills:{
        type:[String]
    },
    age:{
        type:Number
    },
    about:{
        type:String,
    default:"Welcome to our platform"
    }
})

const user=mongoose.model("info",userSchema)

module.exports=user;