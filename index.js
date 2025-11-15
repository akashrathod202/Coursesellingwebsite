const express=require("express")
const app=express()
 


app.get('/start',(req,res)=>{
    res.json("ok")
})

app.listen(3000,()=>{
    console.log("✅ Server running on http://localhost:3000")
})