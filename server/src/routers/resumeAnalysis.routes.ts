import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const {
      firebaseUid,
      fileName,
      atsScore,
      summary,
      strengths,
      weaknesses,
      missingSections,
      suggestions,
    } = req.body;

    if (!firebaseUid) {
      return res.status(400).json({
        success: false,
        message: "Firebase UID is required.",
      });
    }

    const analysis = await prisma.resumeAnalysis.create({
      data: {
        firebaseUid,
        fileName,
        atsScore,
        summary,
        strengths,
        weaknesses,
        missingSections,
        suggestions,
      },
    });

    return res.status(201).json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error("Save resume analysis error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save resume analysis.",
    });
  }
});

router.get("/:firebaseUid", async (req, res) => {
  try {
    const { firebaseUid } = req.params;

    const analyses = await prisma.resumeAnalysis.findMany({
      where: {
        firebaseUid,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json({
      success: true,
      analyses,
    });
  } catch (error) {
    console.error("Fetch resume analysis error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch resume analyses.",
    });
  }
});

router.get("/:firebaseUid/latest", async (req, res) => {
  try {
    const { firebaseUid } = req.params;

    const analysis = await prisma.resumeAnalysis.findFirst({
      where: {
        firebaseUid,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error("Fetch latest resume analysis error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch latest resume analysis.",
    });
  }
});

export default router;