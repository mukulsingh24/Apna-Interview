import { Request, Response } from "express";
import pdf from "pdf-parse";
import { AnalyzeResume,AnalyzeJobMatch } from "../services/api.service";
export const uploadResume = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No resume uploaded.",
      });
    }
    const data = await pdf(req.file.buffer);
    const analysis = await AnalyzeResume(data.text);
    return res.status(200).json({
      success: true,
      resumeText: data.text,
      analysis: analysis,
    });
  } catch (err) {
    console.error("ERROR:", err);
    return res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};
export const jobMatch = async (req: Request, res: Response) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Resume text and job description are required.",
      });
    }

    const analysis = await AnalyzeJobMatch(
      resumeText,
      jobDescription
    );

    return res.status(200).json({
      success: true,
      analysis,
    });

  } catch (err) {
    console.error("ERROR:", err);

    return res.status(500).json({
      success: false,
      error: err instanceof Error
        ? err.message
        : "Failed to analyze job match.",
    });
  }
};