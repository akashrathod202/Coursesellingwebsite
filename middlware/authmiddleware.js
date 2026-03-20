const jwt = require('jsonwebtoken')

// ─── User Middleware ───────────────────────────────
const userAuth = (req, res, next) => {
    try {
        // Step 1: Get token from request headers
        const token = req.headers.authorization?.split(" ")[1]
        // authorization header looks like: "Bearer eyJhbGc..."
        // .split(" ")[1] extracts just the token part

        // Step 2: Check if token exists
        if (!token) {
            return res.status(401).json({ message: "No token, access denied" })
        }

        // Step 3: Verify token
        const decoded = jwt.verify(token, process.env.JWT_USER_SECRET)
        // if token is valid, decoded = { id: "userId", role: "user" }
        // if token is invalid/expired, it throws an error → goes to catch block

        // Step 4: Attach user data to request
        req.user = decoded
        // now any route after this middleware can access req.user

        // Step 5: Move to next function (actual route)
        next()

    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" })
    }
}

// ─── Admin Middleware ───────────────────────────────
const adminAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]

        if (!token) {
            return res.status(401).json({ message: "No token, access denied" })
        }

        const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET,)

        // Extra check — only allow admins
        if (decoded.role !== "admin") {
            return res.status(403).json({ message: "Access denied, admins only" })
        }

        req.admin = decoded
        next()

    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" })
    }
}

module.exports = { userAuth, adminAuth }



// ## How JWT token works in your project:
// ```
// 1. User logs in with email & password
//          ↓
// 2. Server verifies credentials
//          ↓
// 3. Server creates a JWT token:
//    jwt.sign({ id: user._id, role: "user" }, JWT_SECRET)
//          ↓
// 4. Token sent back to frontend
//          ↓
// 5. Frontend stores token (localStorage)
//          ↓
// 6. Every future request sends token in headers:
//    Authorization: Bearer <token>
//          ↓
// 7. Middleware verifies token on protected routes