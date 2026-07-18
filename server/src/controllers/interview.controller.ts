import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import prisma from "../config/prisma";
import {
  GenerateInterviewQuestions,
  EvaluateInterview,
} from "../services/api.service";

export const startInterview = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    const {
      targetRole,
      difficulty,
      interviewType,
      totalQuestions,
    } = req.body;

    if (
      !targetRole ||
      !difficulty ||
      !interviewType ||
      !totalQuestions
    ) {
      return res.status(400).json({
        success: false,
        message: "All interview settings are required.",
      });
    }

    const generatedQuestions = await GenerateInterviewQuestions(
      targetRole,
      difficulty,
      interviewType,
      totalQuestions,
    );

    const session = await prisma.interviewSession.create({
      data: {
        firebaseUid: req.user.uid,
        targetRole,
        difficulty,
        interviewType,
        totalQuestions,
        questions: generatedQuestions.questions,
        status: "IN_PROGRESS",
      },
    });

    return res.status(201).json({
      success: true,
      session,
    });
  } catch (err) {
    console.error("INTERVIEW START ERROR:", err);

    return res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

export const completeInterview = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    const sessionId = Number(req.params.id);
    const { answers } = req.body;

    if (!sessionId || !answers || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: "Session ID and interview answers are required.",
      });
    }

    const session = await prisma.interviewSession.findFirst({
      where: {
        id: sessionId,
        firebaseUid: req.user.uid,
      },
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Interview session not found.",
      });
    }

    const evaluation = await EvaluateInterview(
      session.targetRole,
      session.difficulty,
      session.interviewType,
      answers,
    );

    const updatedSession = await prisma.interviewSession.update({
      where: {
        id: session.id,
      },
      data: {
        answers,
        feedback: evaluation,
        overallScore: evaluation.overallScore,
        status: "COMPLETED",
        completedAt: new Date(),
      },
    });

    return res.status(200).json({
      success: true,
      session: updatedSession,
      evaluation,
    });
  } catch (err) {
    console.error("INTERVIEW COMPLETE ERROR:", err);

    return res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

export const getInterviewHistory = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    const history = await prisma.interviewSession.findMany({
      where: {
        firebaseUid: req.user.uid,
        status: "COMPLETED",
      },
      orderBy: {
        completedAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      history,
    });
  } catch (err) {
    console.error("INTERVIEW HISTORY ERROR:", err);

    return res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};