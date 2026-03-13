const mongoose = require('mongoose')
const ObjectId=mongoose.Schema.Types.ObjectId

const PurchaseSchema = new mongoose.Schema({
    
    userId:{
     type:ObjectId,
     required:true,
     ref:"User"

    },

    courseId:{
        type:ObjectId,
        ref:"Course",
    },

    PurchasedAt  :{
        type:Date,
        default:Date.now
    },

    amount:{
        type:Number,
        required:true
    },

  paymentStatus:{
    type:String,
     enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  }

})

module.exports=mongoose.model('purchase',PurchaseSchema)