import { Router } from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { createList } from "../controlls/listing.cont.js";
import { deleteList } from "../controlls/listing.cont.js";


const router = Router()

router.post("/create",verifyUser,createList)
router.delete("/delete/:id",verifyUser,deleteList)

export default router