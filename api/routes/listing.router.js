import { Router } from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { createList, getList, updateList,searchListings } from "../controlls/listing.cont.js";
import { deleteList } from "../controlls/listing.cont.js";


const router = Router()

router.post("/create",verifyUser,createList)
router.delete("/delete/:id",verifyUser,deleteList)
router.post("/update/:id",verifyUser,updateList)
router.get("/get/:id",getList)
router.get("/get",searchListings)

export default router