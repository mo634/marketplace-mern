import { User } from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import  bcryptjs  from 'bcryptjs';

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

