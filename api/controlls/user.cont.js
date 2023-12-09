import { User } from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import  bcryptjs  from 'bcryptjs';
import Listing from './../models/Listing.js';

export const test = (req, res) => {
    res.send("hi");
}


export const update = async (req, res, next) => {
    console.log("body",req.body)
    if (req.user.id !== req.params.id) return next(errorHandler(401, "update only your account"))

    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password,10)
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            {
            
                $set: {
                    username:req.body.username,
                    email:req.body.email,
                    password:req.body.password,
                    avatar:req.body.avatar,
                }
        }
            , { new: true })
        
        
        const { password, ...rest } = updatedUser._doc
        console.log("rest",rest)
        res.status(200).json({user:rest})
        
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async(req,res,next)=>
{

    if(req.user.id!== req.params.id) return next(errorHandler(401, "delete only your account"))

    try {
        await User.findByIdAndDelete(req.params.id)

        res.clearCookie("access_token")
        res.status(200).json({message:"user deleted succussfuly"})
    }
    catch(err) {
        next(err)
    }
}

export const getListings =async(req,res,next) => {
    if (req.user.id === req.params.id)
    {
        try {
            const data = await Listing.find({userRef:req.params.id})
        
            res.status(200).json(data)
        }
        catch (error) {
            next(error)
        }
    }
        else {
        return next(errorHandler(401, "you can only view you own listings"))
    }
}

export const getUser =async(req,res ,next) => {
    try {
        const userData = await User.findById(req.params.id)
        
        if (!userData) return next(errorHandler(404, "User not found"))
        
        const { password: pass, ...rest } = userData._doc
        
        
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}