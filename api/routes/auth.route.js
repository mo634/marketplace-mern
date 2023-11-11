import { Router } from "express";
import { googleSingIn, singnIn, singup } from "../controlls/auth.cont.js";

const router = Router()

router.post("/signup",singup)
router.post("/signin",singnIn)
router.post("/google",googleSingIn)

export default router