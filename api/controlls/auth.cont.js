import {User} from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from './../utils/error.js';
import jwt from 'jsonwebtoken';
export const singup = async (req, res,next) => {
    const {username, email, password} = req.body;

    // hashing pass

    const hashedPassword = bcryptjs.hashSync(password, 10);
    
    const newUser = new User({username, email, password: hashedPassword});
    try {
        await newUser.save();
        res.status(201).json("user added successfuly");
} catch (error) {
        // if err go to next middleWare 
        next(error)
    }
};

export const singnIn = async (req,res,next) => {
    // get data from the user 
    const { email, password } = req.body

    try {
        // check if the email in db 
        const validUser = await User.findOne({ email })
        if (!validUser) {
            return next(errorHandler(404,"user not found"))
        }
        
        //check pass 
        const validPass = bcryptjs.compareSync(password , validUser.password)
        
        if (!validPass) {
            return next(errorHandler(401," wrong password "))
        }

        // authenticat user 
        const token = jwt.sign({ id: validUser._id },process.env.JWT_SECRET)
    
        //return data wihtout the password 
        const { password:pass , ...rest}= validUser._doc
        // send auth info to cookies 
        res.cookie("access_token", token).status(200).json({ user: rest, message: 'Authentication successful' });

    } catch (error) {
        next(error)
    }

    console.log(email)
    console.log(password)
}