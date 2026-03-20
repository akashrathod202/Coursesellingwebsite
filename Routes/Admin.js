const { Router } = require("express")
const adminRouter = Router()
const bcrypt=require('bcrypt')
const admin=require('../Models/admin')
const express = require("express")
const jwt=require('jsonwebtoken')




adminRouter.post('/signup',async (req, res) => {
    try {

        const {firstname,lastname,email,password}=req.body

        const existingadmin=await admin.findOne({email})

        if(existingadmin){
           return res.status(200).json({message:"User is allready registerd"})
        }

        const hashpassword=await bcrypt.hash(password,10)

        const newadmin= await admin.create({
            firstname,
            lastname,
            email,
            password:hashpassword
        })

        res.status(201).json({message:"admin created succesfully"})
         

    }

    catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"server error",error
        })

    }
})


adminRouter.post('/signin', async(req, res) => {
    try {
        
        const {email,password}=req.body 

        const existingadmin= await admin.findOne({email})

    if(!existingadmin){
        return res.status(400).json({message:"Invaild email and password"})
    }

    // User exists or not

    

    const ismatch=await bcrypt.compare(password,existingadmin.password)
    // Password correct or not
    if(!ismatch){
        return res.status(400).json({message:"Invalid email or password"})
    }

    const token = jwt.sign({ id: existingadmin._id }, process.env.JWT_ADMIN_SECRET, {
        expiresIn: '7d'
    });

        res.status(200).json({ message: "Login successful", token })

    }
    
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error", error })
    }
})






adminRouter.post('/course', (req, res) => {
    try {

        const {title,description,price,imgurl}=req.body

        if(!title || !description|| !price){
            return res.status(400).json({message:"all fields are required"})
        }

        res.json({
            message: "signup endpoint"
        })
    }

    catch (error) {
        console.log(error)
    }
})

adminRouter.put('/course', (req, res) => {
    try {
        res.json({
            message: "signup endpoint"
        })
    }

    catch (error) {
        console.log(error)
    }
})

adminRouter.put('/course/bulk', (req, res) => {
    try {
        res.json({
            message: "signup endpoint"
        })
    }

    catch (error) {
        console.log(error)
    }
})









module.exports = adminRouter