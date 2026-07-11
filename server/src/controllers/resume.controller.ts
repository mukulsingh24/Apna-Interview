import { Request, Response } from "express";

export const uploadResume = (
  req: Request,
  res: Response
) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No resume uploaded.",
    });
  }

  console.log({
    filename: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
  });

  return res.status(200).json({
    success: true,
    filename: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
  });
};