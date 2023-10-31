import express, { json } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import singupRouter from "./routes/singup.route.js";
dotenv.config();

const app = express();

app.use(express.json())

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

//singnup route
app.use("/api/auth", singupRouter);
