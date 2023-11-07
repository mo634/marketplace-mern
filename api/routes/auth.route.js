import { Router } from "express";
import { singnIn, singup } from "../controlls/auth.cont.js";

const router = Router()

router.post("/signup",singup)
router.post("/signin",singnIn)

export default router