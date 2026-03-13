require('dotenv').config()
const express = require("express")
const userrouter = require('./Routes/user')
const CourseRouter = require('./Routes/course')
const adminRouter = require("./Routes/Admin")
const app = express()
const connectDB = require('./config/db')
const mongoose = require("mongoose")




app.use('/admin', adminRouter)
app.use('/user', userrouter)
app.use('/course', CourseRouter)

connectDB()
app.use(express.json())


 

const PORT =process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})








// dotenv loads .env
//         ↓
// server.js reads MONGO_URL
//         ↓
// mongoose.connect(MONGO_URL)
//         ↓
// connects to MongoDB database