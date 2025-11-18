const mongoose=require("mongoose")
const validator=require("validator")

const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        maxLength:8,
        minLength:3,
        required:true
    },
    lastname:{
        type:String,
        minLength:3,
        maxLength:7,
    },
    emailId:{
        type:String,
        uniqued:true,
        validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Email is invalid")
        }
    }
    },
    password:{
        type:String,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter Strong password")
            }
        }
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