import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
dotenv.config();

const app = express();

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

// create user route

app.use("/api/user", userRouter);
