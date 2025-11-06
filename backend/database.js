const mongoose=require("mongoose")
require("dotenv").config();  

mongoose.connect(process.env.MONGO_URL)  

.then(()=>{
    console.log("Database connection done")
})
.catch(err=>{
    console.log("Database connection failed")
})
