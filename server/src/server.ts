import express from "express";
import dotenv from "dotenv";
import resumeRoutes from "./routers/resume.routes";
import cors from "cors";
import profileRoutes from "./routers/profile.routes";
import resumeAnalysisRoutes from "./routers/resumeAnalysis.routes";
import jobMatchRoutes from "./routers/jobMatch.routes";
import interviewRoutes from "./routers/interview.routes";
dotenv.config();
const PORT = process.env.PORT || 5050;
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Backend Server Started");
});
app.use("/api/resume", resumeRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/resume-analysis-history", resumeAnalysisRoutes);
app.use("/api/job-match", jobMatchRoutes);
app.use("/api/interview", interviewRoutes);
app.listen(PORT, () => {
  console.log("Server Started");
});