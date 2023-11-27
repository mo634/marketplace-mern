import { Router } from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { createList } from "../controlls/listing.cont.js";


const router = Router()

router.post("/create",verifyUser,createList)

export default router