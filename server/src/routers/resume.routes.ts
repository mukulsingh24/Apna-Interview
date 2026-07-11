import express from "express";
import upload from "../middleware/upload.middleware";
import { uploadResume } from "../controllers/resume.controller";
const router = express.Router();
router.post(
  "/upload",
  upload.single("resume"),
  uploadResume
);
export default router;