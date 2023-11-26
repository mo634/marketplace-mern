import express from "express";
import { deleteUser, test, update } from "../controlls/user.cont.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);

router.post("/update/:id",verifyUser,update)
router.delete("/delete/:id",verifyUser,deleteUser)


export default router;
