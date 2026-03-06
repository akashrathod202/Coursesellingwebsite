const express=require("express")
const userrouter=require('./Routes/user')
const CourseRouter=require('./Routes/course')
const app=express()
 


app.use('/user',userrouter)
app.use('/course',CourseRouter)





app.listen(8000,()=>{
    console.log("the server is runing on the port 8000")
})