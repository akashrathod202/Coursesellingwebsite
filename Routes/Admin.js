const { Router } = require("express")
const adminRouter = Router()
const bcrypt = require('bcrypt')
const admin = require('../Models/admin')
const jwt = require('jsonwebtoken')
const Course = require('../Models/course')        // ✅ only one import, capital C
const { adminAuth } = require('../middlware/authmiddleware')


adminRouter.post('/signup', async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body

        const existingadmin = await admin.findOne({ email })
        if (existingadmin) {
            return res.status(409).json({ message: "Admin already registered" })
        }

        const hashpassword = await bcrypt.hash(password, 10)
        await admin.create({ firstname, lastname, email, password: hashpassword })

        res.status(201).json({ message: "Admin created successfully" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error", error })
    }
})


adminRouter.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body

        const existingadmin = await admin.findOne({ email })
        if (!existingadmin) {
            return res.status(400).json({ message: "Invalid email or password" })
        }

        const ismatch = await bcrypt.compare(password, existingadmin.password)
        if (!ismatch) {
            return res.status(400).json({ message: "Invalid email or password" })
        }

        const token = jwt.sign(
            { id: existingadmin._id, role: "admin" },
            process.env.JWT_ADMIN_SECRET,
            { expiresIn: '7d' }
        )

        res.status(200).json({ message: "Login successful", token })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error", error })
    }
})


adminRouter.post('/course', adminAuth, async (req, res) => {
    try {
        const { title, description, price, imgurl } = req.body

        if (!title || !description || !price) {
            return res.status(400).json({ message: "All fields are required" })
        }

        // ✅ renamed to newCourse to avoid conflict with Course model
        const newCourse = await Course.create({
            title,
            description,
            price,
            imgurl,
            creatorId: req.admin.id    // ✅ req.admin.id (lowercase id)
        })

        res.status(201).json({ message: "Course created successfully", course: newCourse })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error", error })
    }
})


adminRouter.put('/course/:id', adminAuth, async (req, res) => {
    try {
        const { title, description, price, imgurl } = req.body

        const updatedCourse = await Course.findOneAndUpdate(
            { _id: req.params.id, creatorId: req.admin.id },  // ✅ req.admin.id
            { title, description, price, imgurl },
            { new: true }
        )

        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found or unauthorized" })
        }

        res.status(200).json({ message: "Course updated successfully", course: updatedCourse })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error", error })
    }
})


adminRouter.delete('/course/:id', adminAuth, async (req, res) => {
    try {
        const deletedCourse = await Course.findOneAndDelete({
            _id: req.params.id,
            creatorId: req.admin.id    // ✅ creatorId not adminId
        })

        if (!deletedCourse) {
            return res.status(404).json({ message: "Course not found or unauthorized" })
        }

        res.status(200).json({ message: "Course deleted successfully", course: deletedCourse })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error", error })
    }
})


adminRouter.get('/courses', adminAuth, async (req, res) => {
    try {
        const courses = await Course.find({ creatorId: req.admin.id })  // ✅ req.admin.id
        res.status(200).json({ courses })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error", error })
    }
})


module.exports = adminRouter