const mongoose=require("mongoose")

const SendReqSchema= new mongoose.Schema({
  sender:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
  },
  reciever:{
    type:mongoose.Schema.Types.ObjectId,
      required:true,
  },
  status:{
    type:String,
    enum:{
      values:["accepted","ignored","rejected","intrested"]
    }
  }
},{
  timestamps:true
})

const ReqModel= mongoose.model("connectionreq",SendReqSchema)

module.exports=ReqModel;