import {User} from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from './../utils/error.js';
import jwt from 'jsonwebtoken';
export const singup = async (req, res, next) => {
    try {
    const {username, email, password} = req.body;

    // hashing pass

    const hashedPassword = bcryptjs.hashSync(password, 10);
    
    const newUser = new User({username, email, password: hashedPassword});
    
        await newUser.save();
        res.status(201).json({success:true});
    } catch (error) {
        console.log("error from catch block")
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
        res.cookie("access_token", token).status(200).json({ user: rest, message: 'Authentication successful',success:true });

    } catch (error) {
        next(error)
    }

    console.log(email)
    console.log(password)
}

export const googleSingIn = async (req, res, next) => {
    console.log(req.body)
    try {
        // check if user exist

        const validUser = await User.findOne({ email: req.body.email })
        
        if (validUser) {
            // authenticat user 
        const token = jwt.sign({ id: validUser._id },process.env.JWT_SECRET)
    
        //return data wihtout the password 
        const { password:pass , ...rest}= validUser._doc
        // send auth info to cookies 
        res.cookie("access_token", token).status(200).json({ user: rest, message: 'Authentication successful',success:true });

        }
        else {
            // generate random defaul password to not get error in schema
            let defaultPassword= Math.random().toString(36).slice(-8) + Math.random().toString().slice(-8)
            
            // hash password 
            
            const hashedPassword = bcryptjs.hashSync(defaultPassword, 10);
            
            const newUser = new User({
                // moHamed mostafA  -> mohamedmostafa1234
                username:req.body.username.split(" ").join("").toLowerCase() +Math.random().toString(36).slice(-4) 
                , email:req.body.email
                , password: hashedPassword
            });
            
            await newUser.save();
                // authenticat user
                const token = jwt.sign({ id: newUser._id },process.env.JWT_SECRET)
            
                //return data wihtout the password 
                const { password:pass , ...rest}= newUser._doc
                // send auth info to cookies 
                res.cookie("access_token", token).status(200).json({ user: rest, message: 'Authentication successful',success:true });
                    
                }
    } catch (error) {
        console.log(error)
    }
}