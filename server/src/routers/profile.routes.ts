import express from "express";
import {
  saveProfile,
  getProfile,
} from "../controllers/profile.controller";
import { verifyFirebaseToken } from "../middleware/auth.middleware";

const router = express.Router();

router.get(
  "/",
  verifyFirebaseToken,
  getProfile,
);

router.put(
  "/",
  verifyFirebaseToken,
  saveProfile,
);

export default router;