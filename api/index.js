import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config()

const app = express()

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("connected successfully to DB")
}).catch((err) => {
    console.log("error while connect to db" , err)
})

//connect dataBase 

app.listen(3000,() => {
    console.log("runnign serever ")
})