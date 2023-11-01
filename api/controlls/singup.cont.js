import {User} from "../models/user.model.js";
import bcryptjs from "bcryptjs";
export const singupFunc = async (req, res,next) => {
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
