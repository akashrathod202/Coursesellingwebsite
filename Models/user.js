const mongoose=require('mongoose')

const user=new mongoose.Schema({

    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        unique:true
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