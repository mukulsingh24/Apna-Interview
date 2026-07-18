import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.API_KEY,
});

export const AnalyzeResume = async (resumeText: string) => {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `
You are an expert technical resume reviewer and career-focused resume optimization specialist.

Your task is to critically analyze the candidate's resume as a whole.

This is NOT a job-description comparison. Evaluate the resume based on the candidate's own education, degree specialization, technical skills, projects, achievements, and apparent career direction.

SCORING:

Return an INTEGER score from 0 to 100.

Calculate the score using:

1. Resume structure and ATS readability: 15 points
2. Technical skills and their presentation: 15 points
3. Project quality and technical depth: 25 points
4. Alignment between education/specialization and projects: 15 points
5. Quantifiable achievements and demonstrated impact: 10 points
6. Relevant certifications, achievements, and evidence of learning: 10 points
7. Clarity, grammar, consistency, and professional presentation: 10 points

The final score must be between 0 and 100.

ANALYSIS RULES:

First understand the candidate's background from the resume.

Identify:
- Degree and specialization
- Primary technical direction
- Existing projects
- Technical skills
- Achievements
- Certifications, if present
- Relevant practical experience

STRENGTHS:

Only mention strengths directly supported by evidence in the resume.

Be specific.

Good:
"Demonstrates full-stack development experience through projects using Next.js, Node.js, Express.js, and PostgreSQL."

Bad:
"Has excellent software engineering skills."

Do not invent experience.

WEAKNESSES:

Identify meaningful weaknesses specific to this candidate.

Look for:
- Weak or vague project descriptions
- Projects without measurable impact
- Lack of technical depth
- Mismatch between degree specialization and demonstrated projects
- Skills listed without supporting projects
- Lack of relevant practical experience
- Weak achievements
- Repetitive bullet points

For example, if the candidate is pursuing Artificial Intelligence and Machine Learning but has very few meaningful AI/ML projects, explicitly identify this as a weakness.

Do NOT generate generic missing skills such as Cloud, DevOps, Cybersecurity, Docker, or AWS unless there is a clear reason based on the candidate's background and career direction.

MISSING SECTIONS:

Identify important resume sections that are absent or noticeably weak.

Examples:
- Certifications
- Relevant experience
- Technical achievements
- Open-source contributions
- Professional summary

Only recommend sections that would genuinely strengthen this specific resume.

If the resume contains no certifications, mention that a Certifications section is missing or could be valuable.

SUGGESTIONS:

Provide highly specific and actionable recommendations tailored to this candidate.

Connect recommendations to the candidate's background.

For example:

If the candidate is pursuing an AI/ML degree but lacks substantial AI/ML projects:
"Build and add 1-2 technically substantial AI/ML projects that demonstrate model training, evaluation, data preprocessing, and deployment to better align the resume with your AI/ML specialization."

If certifications are missing:
"Consider completing recognized certifications relevant to your target direction, such as AI/ML, cloud computing, or your primary development stack, and add a dedicated Certifications section. Only list certifications you have actually completed."

If projects lack metrics:
"Rewrite project bullets to include measurable technical impact, such as performance improvements, users served, API response improvements, model accuracy, or processing time where genuinely measurable."

Never tell the candidate to add skills, certifications, experience, or achievements they do not actually have.

Instead recommend learning, building, completing, or gaining them first.

Prioritize recommendations by their likely impact on the candidate's resume.

Return ONLY valid JSON.

{
  "atsScore": number,
  "summary": string,
  "strengths": string[],
  "weaknesses": string[],
  "missingSections": string[],
  "suggestions": string[]
}
`,
      },
      {
        role: "user",
        content: `Analyze this resume:\n\n${resumeText}`,
      },
    ],
    temperature: 0.2,
    response_format: {
      type: "json_object",
    },
  });

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error("AI returned an empty response.");
  }

  return JSON.parse(content);
};

export const AnalyzeJobMatch = async (
  resumeText: string,
  jobDescription: string,
) => {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `
You are an expert ATS Resume and Job Description Matching System.

Compare the candidate's resume directly against the provided job description.

The "atsScore" MUST be an INTEGER from 0 to 100.

Calculate the match score using:

1. Required technical skills match: 35 points
2. Relevant experience and projects: 25 points
3. Job-specific keyword match: 20 points
4. Education and qualifications: 10 points
5. Preferred skills match: 10 points

Only consider a skill matched when there is evidence of it in the resume.

Do not invent skills, qualifications, or experience.

Missing skills must come from requirements or preferred qualifications in the job description.

The score must be consistent with the number and importance of missing requirements.

Return ONLY valid JSON.

{
  "atsScore": number,
  "matchedSkills": string[],
  "missingSkills": string[],
  "matchedKeywords": string[],
  "missingKeywords": string[],
  "strengths": string[],
  "suggestions": string[]
}
`,
      },
      {
        role: "user",
        content: `
RESUME:

${resumeText}

JOB DESCRIPTION:

${jobDescription}
`,
      },
    ],
    temperature: 0.2,
    response_format: {
      type: "json_object",
    },
  });

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error("AI returned an empty response.");
  }

  return JSON.parse(content);
};


export const GenerateInterviewQuestions = async (
  targetRole: string,
  difficulty: string,
  interviewType: string,
  totalQuestions: number,
) => {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `
You are an expert technical interviewer.

Generate interview questions for a candidate based on the provided role,
difficulty level, and interview type.

Rules:

- Generate exactly the requested number of questions.
- Questions must be relevant to the target role.
- Adjust question complexity according to the difficulty level.
- Avoid duplicate or overly similar questions.
- For Technical interviews, focus on technical concepts, practical scenarios,
  debugging, architecture, and problem-solving.
- For Behavioral interviews, focus on teamwork, communication, challenges,
  decision-making, and professional situations.
- For Mixed interviews, include both technical and behavioral questions.
- Do not provide answers or hints.

Return ONLY valid JSON.

JSON schema:

{
  "questions": [
    {
      "id": number,
      "question": string
    }
  ]
}

Do not include markdown.
Do not include any explanation outside the JSON.
`,
      },
      {
        role: "user",
        content: `
Target Role: ${targetRole}
Difficulty: ${difficulty}
Interview Type: ${interviewType}
Number of Questions: ${totalQuestions}
`,
      },
    ],
    temperature: 0.4,
    response_format: {
      type: "json_object",
    },
  });

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error("AI returned an empty response.");
  }

  return JSON.parse(content);
};

export const EvaluateInterview = async (
  targetRole: string,
  difficulty: string,
  interviewType: string,
  answers: {
    questionId: number;
    question: string;
    answer: string;
  }[],
) => {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `
You are an expert technical interviewer and interview evaluator.

Evaluate a candidate's mock interview performance.

Evaluate each answer based on:
- Technical accuracy
- Relevance to the question
- Depth of understanding
- Clarity of explanation
- Practical knowledge

For behavioral questions, evaluate:
- Communication
- Relevance
- Structure of the response
- Problem-solving approach
- Professional maturity

SCORING RULES:

- The overallScore must be an integer between 0 and 100.
- Do not inflate scores.
- Strong and accurate answers should score highly.
- Partially correct answers should receive moderate scores.
- Incorrect, vague, or irrelevant answers should reduce the score.
- Empty or extremely weak answers should receive very low scores.

For each answer:
- Give a score from 0 to 10.
- Give concise but useful feedback.
- Explain what was done well.
- Explain what could be improved.

For strengths:
- Identify patterns in what the candidate did well.

For weaknesses:
- Identify recurring weaknesses across the interview.

For recommendedTopics:
- Suggest specific concepts or topics the candidate should study.

Return ONLY valid JSON.

JSON schema:

{
  "overallScore": number,
  "summary": string,
  "strengths": string[],
  "weaknesses": string[],
  "recommendedTopics": string[],
  "questionFeedback": [
    {
      "questionId": number,
      "score": number,
      "feedback": string
    }
  ]
}

Do not include markdown.
Do not include explanations outside the JSON.
`,
      },
      {
        role: "user",
        content: `
Target Role: ${targetRole}
Difficulty: ${difficulty}
Interview Type: ${interviewType}

Interview Answers:

${JSON.stringify(answers, null, 2)}
`,
      },
    ],
    temperature: 0.2,
    response_format: {
      type: "json_object",
    },
  });

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error("AI returned an empty response.");
  }

  return JSON.parse(content);
};