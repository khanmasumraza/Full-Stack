const mongoose=require("mongoose")

const connectionRequestSchema= new mongoose.Schema({

    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        enum:{
values:["ignored","intrested","rejected","accepted"],
message: "{VALUE} is not a valid status"
        },
        default:"intrested"
    }
},{
    timestamps:true
})

connectionRequestSchema.index({fromUserId:1,toUserId:1})

connectionRequestSchema.pre("save",function(next){
    const connectionRequest=this;
    // Check if the fromUserId is same as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to yourself")
    }
    next();
})
const ConnectionRequestModel=new mongoose.model("ConnectionRequest",connectionRequestSchema)

module.exports=ConnectionRequestModel;