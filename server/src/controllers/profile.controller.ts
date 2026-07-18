import { Response } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";

export const saveProfile = async (
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
      fullName,
      targetRole,
      experienceLevel,
      education,
      skills,
    } = req.body;

    if (!fullName) {
      return res.status(400).json({
        success: false,
        message: "Full name is required.",
      });
    }

    const profile = await prisma.profile.upsert({
      where: {
        firebaseUid: req.user.uid,
      },
      update: {
        fullName,
        targetRole,
        experienceLevel,
        education,
        skills: Array.isArray(skills) ? skills : [],
      },
      create: {
        firebaseUid: req.user.uid,
        fullName,
        targetRole,
        experienceLevel,
        education,
        skills: Array.isArray(skills) ? skills : [],
      },
    });

    return res.status(200).json({
      success: true,
      message: "Profile saved successfully.",
      profile,
    });
  } catch (error) {
    console.error("PROFILE SAVE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save profile.",
    });
  }
};

export const getProfile = async (
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

    const profile = await prisma.profile.findUnique({
      where: {
        firebaseUid: req.user.uid,
      },
    });

    if (!profile) {
      return res.status(200).json({
        success: true,
        profile: null,
      });
    }

    return res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error("PROFILE FETCH ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile.",
    });
  }
};