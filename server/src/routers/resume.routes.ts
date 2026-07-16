import express from "express";
import upload from "../middleware/upload.middleware";
import { uploadResume,jobMatch } from "../controllers/resume.controller";
const router = express.Router();
router.post(
  "/upload",
  upload.single("resume"),
  uploadResume
);
router.post("/job-match", jobMatch);
export default router;