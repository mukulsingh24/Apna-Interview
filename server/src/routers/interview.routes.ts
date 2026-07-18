import express from "express";
import { verifyFirebaseToken } from "../middleware/auth.middleware";
import {
  startInterview,
  completeInterview,
  getInterviewHistory
} from "../controllers/interview.controller";
const router = express.Router();

router.post(
  "/start",
  verifyFirebaseToken,
  startInterview,
);

router.post(
  "/:id/complete",
  verifyFirebaseToken,
  completeInterview,
);

router.get(
  "/history",
  verifyFirebaseToken,
  getInterviewHistory,
);

export default router;