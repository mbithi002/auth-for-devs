import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from "express";
import { connectDb } from "./db/connectDB.js";
import authRoutes from './routes/auth.route.js';

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json({ limit: "5mb" }))
app.use(cookieParser())
app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
    connectDb()
})