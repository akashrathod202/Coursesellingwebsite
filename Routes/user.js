const express=require('express')
const userrouter=express.Router()
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const User=require('../Models/user')
const {userAuth} =require('../middlware/authmiddleware')




userrouter.get('/start',(req,res)=>{
    res.json("ok")
})


userrouter.post("/signup",async(req,res)=>{
    try{

        const {
            firstname,lastname,email,password} =req.body
        
        const existingUser=await User.findOne({email})

        if(existingUser){
            return res.status(400).json({message:"Email already registerd"})
        }

        const hashedPassword=await bcrypt.hash(password,10)

        const User =await User.create({
            firstname,
            lastname,
            email,
            password:hashedPassword
        })

        res.status(201).json({
            message:"user created successfully"
        })

}catch(error){
        console.log(error)
    }
})



userrouter.post("/signin",async(req,res)=>{
    try{
        const { email, password } = req.body

        // Check if user exists
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" })
        }
        const ismatch =await bcrypt.compare(password,user.password)
       
        if(!ismatch){
            return res.status(400).json({message:"Invallid email or password"})
        }
        

        
       const token =jwt.sign(
        {id:user._id,role:"user"},
        process.env.JWT_SECRET,
        {
            expiresIn:"7d"
        }
       )

       res.status(200).json({

        message:"login successful",token
       })
        
    }
    catch(error){
        console.log(error)  // log actual error not just string
        return res.status(500).json({ message: "Server error", error })
    }
})




userrouter.post("/Purchases ",(req,res)=>{
    try{
        res.json({
            message: "sigin endpoint"
        })
    }
    catch(error){
        console.log("error")
    }
})

module.exports = userrouter;