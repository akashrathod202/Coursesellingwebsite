const express=require('express')
const userrouter=express.Router()




userrouter.get('/start',(req,res)=>{
    res.json("ok")
})


userrouter.post("/signup",(req,res)=>{
    try{
       res.json({
        message:"signup endpooint"
       })
    }
    catch(error){
        console.log(error)
    }
})



userrouter.post("/signin",(req,res)=>{
    try{
        res.json({
            message: "sigin endpoint"
        })
    }
    catch(error){
        console.log("error")
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