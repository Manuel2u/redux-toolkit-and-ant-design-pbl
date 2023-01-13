import express from "express";
import { SIGN_UP, LOGIN, GET_USER, LOGOUT } from "../controllers/user.controller";

const router = express.Router();

router.post("/signup", SIGN_UP);
router.post("/login", LOGIN);
router.get("/:id", GET_USER);
router.get("/logout/:id", LOGOUT);

export default router;