import Listing from '../models/Listing.js';
import { errorHandler } from './../utils/error.js';
export const createList = async(req,res ,next) => {
    try {
        const data = await Listing.create(req.body)
        res.status(201).json({
            success: true,
            data
        })
    } catch (error) {
        next(error)
    }
}

export const deleteList = async (req, res, next) => {
    
    const listing = await Listing.findById(req.params.id)
    
    if (!listing) {
        return next(errorHandler(404,"Listing not exist "))
    }

    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401,"you can delete only your account "))
    }

    try {
        await Listing.findByIdAndDelete(req.params.id)
        res.status(200).json("deleted successfuly")
    }
    catch(error) {
        next(error)
    }


}


export const updateList=async(req,res,next) => {
    const listings = await Listing.findById(req.params.id)
    
    if (!listings) {
        return next(errorHandler(404,"listings not found"))
    }

    if (req.user.id !== listings.userRef) {
        return next(errorHandler(401,"you can update your own listings"))
    }

    try {

        const updatedListings = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true })
        
        res.status(200).json(updatedListings)
    } catch (error) {
        next(error)
    }
}


export const getList=async(req,res,next) => {
try {
    const listing = await Listing.findById(req.params.id)

    if (!listing) {
        return next(404,"listing not found")
    }

    res.status(200).json(listing)
} catch (error) {
    next(error)
}
    
}