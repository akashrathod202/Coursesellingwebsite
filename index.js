const express=require("express")
const app=express()
 


app.get('/start',(req,res)=>{
    res.json("ok")
})


app.post("user/signup",(req,res)=>{
    try{
       res.json({
        message:"signup endpooint"
       })
    }
    catch(error){
        console.log(error)
    }
})

app.post("user/signin",(req,res)=>{
    try{
        res.json({
            message: "sigin endpoint"
        })
    }
    catch(error){
        console.log("error")
    }
})


app.post("user/Purchass ",(req,res)=>{
    try{
        res.json({
            message: "sigin endpoint"
        })
    }
    catch(error){
        console.log("error")
    }
})

app.get("/Courses",(req,res)=>{
    try{
        res.json({
            message: "Courses"
        })
    }
    catch(error){
        console.log("error")
    }
})