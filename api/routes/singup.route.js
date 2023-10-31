import { Router } from "express";
import { singupFunc } from "../controlls/singup.cont.js";

const router = Router()

router.post("/signup",singupFunc)

export default router