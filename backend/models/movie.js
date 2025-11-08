const mongoose=require("mongoose")

const movieSchema= new mongoose.Schema({
    
    title:{
        type:String
    },
    releaseDate:{
        type:Number
    },
    actor:{
        type:String
    },
    heroine:{
        type:String
    },
    budget:{
        type:Number
    }
})

const movieModel= mongoose.model("movies",movieSchema)

module.exports=movieModel