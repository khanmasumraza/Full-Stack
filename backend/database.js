const {connect}=require("mongoose")

require("dotenv").config();   // .env ko load karega

mongoose.connect(process.env.MONGO_URL)  // yaha se password wala URL lega

async function dbconnect(){
    const url=""
    await connect(url);
}
module.exports=dbconnect;

