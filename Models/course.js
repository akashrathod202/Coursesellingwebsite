const mongoose=require('mongoose')

const CoureseSchema= new mongoose.Schema({
  
    title:{
        type:String,

    },

    description:{
       type:String
    },

    price:{
        type:Number
    },

    imgurl:{

       type: String,
    },

    creatorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})

module.exports=mongoose.model('Course',CoureseSchema)