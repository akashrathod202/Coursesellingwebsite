const express =require('express')
const CourseRouter=express.Router()


    CourseRouter.post("/Purchase ",(req,res)=>{
    try{
        res.json({
            message: "sigiint"
        })
    }
    catch(error){
        console.log("error")
    }
})

    CourseRouter.get("/Course",(req,res)=>{
    try{
        res.json({
            message: "Courses"
        })
    }
    catch(error){
        console.log("error")
    }
})

module.exports=CourseRouter; 