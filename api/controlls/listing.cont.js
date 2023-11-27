import Listing from '../models/Listing.js';
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