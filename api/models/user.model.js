
// create schema

import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    
    username: {
        type: String,
        required:[true,"username is required"],
        unique:[true,"username must be unique"]
    },

    email: {
        type: String,
        required:[true,"email is required"],
        unique:[true,"email must be unique"]
    },
    password: {
        type: String,
        required:[true,"password is required"],
    },

    avatar: {
        type: String,
        default : "https://th.bing.com/th/id/R.bef8db8237a5d806ad51485439d1c84a?rik=FpgdXWfAKan7jg&pid=ImgRaw&r=0"
    }

} , {timestamps:true})

// create and export model

export const User = mongoose.model("User",userSchema)