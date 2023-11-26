import { Router } from "express";
import { googleSingIn, singnIn, singnOut, singup } from "../controlls/auth.cont.js";

const router = Router()

router.post("/signup",singup)
router.post("/signin",singnIn)
router.get("/signout",singnOut)
router.post("/google",googleSingIn)

export default router