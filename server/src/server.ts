import express from "express";
import resumeRoutes from "./routers/resume.routes";
const app = express();
app.get("/", (req, res) => {
  res.send("Backend Server Started");
});
app.post("/upload", (req, res) => {
  console.log("POST HIT");
  res.json({
    success: true,
  });
});
app.use("/api/resume", resumeRoutes);
app.listen(5052, () => {
  console.log("Server Started");
});