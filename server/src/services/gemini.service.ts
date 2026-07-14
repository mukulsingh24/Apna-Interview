import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";
export const AnalyzeResume = async (resumeText: string) => {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
  });
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: `
You are an ATS Resume Analyzer.

Return ONLY valid JSON.

Do not wrap JSON inside markdown.

Do not explain anything.

JSON Schema:

{
  "atsScore": number,
  "summary": string,
  "strengths": string[],
  "missingSkills": string[],
  "suggestions": string[]
}

Resume:

${resumeText}
`,
  });
  const cleaned = (response.text ?? "")
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Invalid JSON returned by Gemini:", cleaned);
    throw new Error("Gemini returned invalid JSON.");
  }
};