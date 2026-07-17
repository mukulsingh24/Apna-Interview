import express from "express";
import dotenv from "dotenv";
import resumeRoutes from "./routers/resume.routes";
import cors from "cors";
import profileRoutes from "./routers/profile.routes";
import resumeAnalysisRoutes from "./routers/resumeAnalysis.routes";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Backend Server Started");
});
app.use("/api/resume", resumeRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/resume-analysis-history", resumeAnalysisRoutes);
app.listen(5051, () => {
  console.log("Server Started");
});