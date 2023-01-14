import express from "express";

import {
  CREATE_LIST,
  GET_LISTS,
  GET_LIST,
  DELETE_LIST,
} from "../controllers/list.controller";

const router = express.Router();
import verifyToken from "../middlewares/verification";

router.post("/create", verifyToken, CREATE_LIST);
router.get("/lists/:id", verifyToken, GET_LISTS);
router.get("/:id", verifyToken, GET_LIST);
router.delete("/:id", verifyToken, DELETE_LIST);

export default router;
