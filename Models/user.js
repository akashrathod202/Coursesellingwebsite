const mongoose=require('mongoose')

const user=new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    cretedAt:{
        type:Date,
        default:Date.now
    }

})


module.exports=mongoose.module("user",userSchema)