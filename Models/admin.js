const mongoose =require('mongoose')

const AdminShema=new mongoose.Schema({

     firstname:{
        type:String,
         required:true
    },
     lastname:{
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

     createdat:{
        type:Date,
        default:Date.now
     }


})


module.exports=mongoose.model("Admin",AdminShema)

// Create a model called Admin using the adminSchema,
//  and export it so other files can use it to interact with 
//  the database."