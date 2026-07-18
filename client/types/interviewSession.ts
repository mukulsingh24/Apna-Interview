export interface InterviewSession {
  id: number;
  firebaseUid?: string;
  targetRole: string;
  difficulty: string;
  interviewType: string;
  totalQuestions: number;
  overallScore: number | null;
  questions: unknown;
  answers: unknown;
  feedback: unknown;
  status: string;
  createdAt: string;
  completedAt: string | null;
}