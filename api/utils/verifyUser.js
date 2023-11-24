import { errorHandler } from './error.js';
import  jwt  from 'jsonwebtoken';
export const verifyUser = (req,res,next) => {
    // check if user auth

    // get token from cookie

    const token = req.cookies.access_token


    if (!token) return next(errorHandler(401, "Unauthorized"))
    
    jwt.verify(token,process.env.JWT_SECRET,(err,user) => {
        
        if (err) return next(errorHandler(403, "Forbiden"))
        
        // if no erro return data form cookie to body
        console.log("from verify func",user)
        req.user = user 
        console.log("req from verify func",req.user)
        
        next()
    })

}