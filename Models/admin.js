const mongoose =require('mongoose')

const adminShema=new mongoose.Schema({

     firstname:{
        type:String,
         required:true
    },
     lastname:{
        type:String,
        required:true
     }


})


module.exports=mongoose.model("admin",adminShema)

// Create a model called Admin using the adminSchema,
//  and export it so other files can use it to interact with 
//  the database."