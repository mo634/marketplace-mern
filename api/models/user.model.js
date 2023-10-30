
// create schema

import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    
    username: {
        type: String,
        required,
        unique:[true,"username must be unique"]
    },

    email: {
        type: String,
        required:[true,"email is required"],
        unique:[true,"email must be unique"]
    },
    password: {
        type: String,
        required:[true,"username is required"],
    },

} , {timestamps:true})

// create and export model

export const User = mongoose.model("User",userSchema)