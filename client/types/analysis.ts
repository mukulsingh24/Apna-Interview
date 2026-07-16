export interface Analysis {
  atsScore: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  missingSections: string[];
  suggestions: string[];
}