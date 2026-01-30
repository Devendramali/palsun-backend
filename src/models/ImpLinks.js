const mongoose = require("mongoose");


const LinkSchema =  new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },
      isActive: { type: Boolean, default: true },
},{timestamps:true})
 module.exports = mongoose.model("ImpLinks", LinkSchema)
