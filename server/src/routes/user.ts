import express from "express";
import {
  SIGN_UP,
  LOGIN,
  GET_USER,
  LOGOUT,
} from "../controllers/user.controller";
import verifyToken from "../middlewares/verification";

const router = express.Router();

router.post("/signup", SIGN_UP);
router.post("/login", LOGIN);
router.get("/:id", verifyToken, GET_USER);
router.get("/logout/:id", verifyToken, LOGOUT);

export default router;
