import express from "express";
import { deleteUser, getListings, test, update,getUser } from "../controlls/user.cont.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);

router.post("/update/:id",verifyUser,update)
router.delete("/delete/:id",verifyUser,deleteUser)
router.get("/listings/:id",verifyUser,getListings)
router.get("/:id",verifyUser,getUser)


export default router;
