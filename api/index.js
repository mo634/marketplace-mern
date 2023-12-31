import express, { json } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.router.js";
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();
const __dirname = path.resolve();
const app = express();

app.use(express.json())

app.use(cookieParser())

//connect dataBase
mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    console.log("connected successfully to DB");
})
.catch((err) => {
    console.log("error while connect to db", err);
});

app.listen(3000, () => {
    console.log("runnign serever ");
});

// create  routes

//user route
app.use("/api/user", userRouter);

//auth route
app.use("/api/auth", authRouter);

//listing route 

app.use("/api/listing", listingRouter);


app.use(express.static(path.join(__dirname, '/myapp/dist')));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'myapp', 'dist', 'index.html'));
  })
// create middleware to handle errors
app.use((err,req,res,next) => {
    //store status code err 
    const statusCode = err.statusCode || 500 
    
    //store status code err 
    const message = err.message || "Internal Server Error" 
    
    // return res

    return res.status(statusCode).json({
        success: false, 
        statusCode,
        message
    })
})