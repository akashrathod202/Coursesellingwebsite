const mongoose=require("mongoose")

const connectDB = async ()=>{
    try {
 
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongoDB Connected Successfully")
    }
    catch (error) {
        console.log("monggoDB connection failed",error)
        process.exit(1)
        // stop the serve if db fails
    }
}

module.exports = connectDB