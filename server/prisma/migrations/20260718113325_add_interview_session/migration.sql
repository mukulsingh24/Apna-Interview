-- CreateTable
CREATE TABLE "InterviewSession" (
    "id" SERIAL NOT NULL,
    "firebaseUid" TEXT NOT NULL,
    "targetRole" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "interviewType" TEXT NOT NULL,
    "totalQuestions" INTEGER NOT NULL,
    "overallScore" INTEGER,
    "questions" JSONB NOT NULL,
    "answers" JSONB,
    "feedback" JSONB,
    "status" TEXT NOT NULL DEFAULT 'IN_PROGRESS',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "InterviewSession_pkey" PRIMARY KEY ("id")
);
