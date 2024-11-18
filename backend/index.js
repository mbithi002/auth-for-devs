import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from "express";
import path from "path";
import job from './cron.js';
import { connectDb } from "./db/connectDB.js";
import authRoutes from './routes/auth.route.js';

dotenv.config()
job.start()
const app = express()
const PORT = process.env.PORT || 5000
const __dirname = path.resolve()

app.use(express.json({ limit: "5mb" }))
app.use(cookieParser())
app.use("/api/auth", authRoutes)

if (process.env.NODE_ENV = "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
    connectDb()
})