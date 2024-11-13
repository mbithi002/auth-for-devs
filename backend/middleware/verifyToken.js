import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'

export const verifyToken = async (req, res, next) => {
    const { token } = req.cookies
    try {
        if (!token) {
            return res.status(401).json({ error: "unauthorized no token provided" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(401).json({ error: "unauthorized invalid token" })
        }
        const { userId } = decoded
        const user = await User.findById(userId).select("-password")
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }
        req.user = user
        console.log("user>>> ", req.user);
        next()
    } catch (error) {
        console.log("Error in verifyToken ", error)
        return res.status(500).json({ error: "Internal server error." })
    }
}