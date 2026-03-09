const{Router} = require("express")
const adminRouter =Router()


adminRouter.post('/signup',(req,res)=>{
    try{   
         res.json({
            message:"signup endpoint"
         })

    }

    catch(error){
        console.log(error)

    }
})


adminRouter.post('/signin',(req,res)=>{
    try{
res.json({
    message:"signin endpoint"
     })
    }

    catch(error){
           console.log(error)
    }
})




adminRouter.post('/course',(req,res)=>{
    try{
          res.json({
    message:"signup endpoint"
     })
    }

    catch(error){
           console.log(error)
    }
      })



adminRouter.post('/course',(req,res)=>{
    try{
          res.json({
    message:"signup endpoint"
     })
    }

    catch(error){
           console.log(error)
    }
      })


adminRouter.put('/course',(req,res)=>{
        try{
              res.json({
        message:"signup endpoint"
         })
        }
    
        catch(error){
               console.log(error)
        }
          })


adminRouter.put('/course/bulk',(req,res)=>{
            try{
                  res.json({
            message:"signup endpoint"
             })
            }
        
            catch(error){
                   console.log(error)
            }
              })


  






module.exports=adminRouter