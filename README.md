# 🚀 Apna Interview — AI Resume Analyzer & Interview Preparation Platform

Apna Interview is an AI-powered career preparation platform designed to help students and job seekers analyze their resumes, evaluate ATS compatibility, compare their resumes against job descriptions, and prepare for interviews with AI-generated role-specific questions and feedback.

The platform brings resume optimization, job matching, and interview preparation together in a single personalized dashboard.

---

## ✨ Features

### 📄 AI Resume Analysis

- Upload and analyze PDF resumes
- Automatic resume text extraction
- AI-powered ATS score out of 100
- Resume strengths and weaknesses analysis
- Missing section detection
- Personalized resume improvement suggestions
- Resume analysis history

### 🎯 Job Match Analysis

- Compare a resume against a job description
- AI-generated job match score
- Identify matched skills
- Detect missing skills
- Analyze matched and missing keywords
- Receive personalized improvement suggestions
- Track previous job match analyses

### 💬 AI Interview Preparation

- Generate interview questions based on target job roles
- Role-specific interview preparation
- Support for different interview difficulty levels
- Submit answers to AI-generated questions
- AI-powered answer evaluation and feedback
- Interview performance scoring
- Track previous interview sessions

### 📊 Personalized Dashboard

- Latest resume ATS score
- Latest job match score
- Interview readiness tracking
- Quick access to major platform features
- Unified recent activity feed
- Resume, job match, and interview history

### 👤 User Profile

- Create and update a personalized career profile
- Store target job role
- Experience level
- Education details
- Technical skills
- Persistent profile data using PostgreSQL

### 🔐 Authentication & Security

- Firebase Authentication
- Email and password authentication
- Google Sign-In
- Protected dashboard routes
- Firebase ID token-based backend authentication
- User-specific resume, job match, and interview data

### 📱 Responsive UI

- Modern responsive interface
- Mobile-friendly navigation
- Responsive dashboard
- Built with Tailwind CSS
- Optimized for desktop, tablet, and mobile devices

---

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Icons
- Firebase Client SDK

### Backend

- Node.js
- Express.js
- TypeScript
- REST APIs
- Firebase Admin SDK
- Multer
- PDF Parse

### Database

- PostgreSQL
- Prisma ORM

### Authentication

- Firebase Authentication
- Firebase Admin SDK
- Firebase ID Token Verification

### AI Integration

- AI API integration for:
  - Resume analysis
  - ATS evaluation
  - Job description matching
  - Interview question generation
  - Interview answer evaluation

### Deployment

- Vercel — Frontend
- Render — Backend
- SupaBase - Cloud-hosted PostgreSQL database

---

## 🎯 Project Objective

The goal of Apna Interview is to simplify career preparation by combining multiple tools into one AI-powered platform.

Instead of using separate platforms for resume analysis, ATS checking, job description matching, and interview preparation, users can manage their entire preparation workflow from a single dashboard.

The platform is designed particularly for students, fresh graduates, and job seekers who want actionable insights into their resumes and structured interview preparation.

---

## ⚙️ Core Modules

### 1. Resume Analyzer

The Resume Analyzer allows users to upload their resume in PDF format and receive an AI-generated analysis.

It provides:

- ATS compatibility score
- Resume summary
- Strength identification
- Weakness detection
- Missing resume sections
- Personalized improvement suggestions

Each analysis is stored in the database and associated with the authenticated user.

---

### 2. Job Match Analyzer

The Job Match module compares a user's resume against a specific job description.

It analyzes:

- Overall job match score
- Matched skills
- Missing skills
- Matched keywords
- Missing keywords
- Resume strengths for the target role
- Suggestions to improve job compatibility

Users can track their previous job match analyses through their activity history.

---

### 3. AI Interview Preparation

The Interview Preparation module provides personalized mock interview practice.

Users can:

- Select a target role
- Choose an interview difficulty level
- Generate role-specific interview questions
- Submit answers
- Receive AI-generated feedback
- View interview performance scores
- Track completed interview sessions

---

### 4. Personalized Dashboard

The dashboard acts as the central hub of the platform.

It displays:

- Latest resume score
- Latest job match score
- Interview readiness
- Quick actions
- Recent resume analyses
- Recent job matches
- Recent interview sessions

---

### 5. Activity History

The platform maintains user-specific activity history for:

- Resume analyses
- Job match analyses
- Interview sessions

Users can view their previous activities and track their preparation progress over time.

---

### 6. User Profile

Users can maintain a personalized career profile containing:

- Full name
- Target role
- Experience level
- Education
- Skills

The profile information is stored in PostgreSQL and linked to the user's Firebase UID.

---

## 🏗️ System Architecture

```text
┌───────────────────────────────┐
│          Next.js Client       │
│       TypeScript + Tailwind    │
└───────────────┬───────────────┘
                │
                │ REST API
                │ Firebase ID Token
                ▼
┌───────────────────────────────┐
│      Node.js / Express API     │
│           TypeScript           │
└──────────┬───────────┬────────┘
           │           │
           │           │
           ▼           ▼
┌─────────────────┐  ┌─────────────────┐
│   PostgreSQL    │  │     AI API      │
│  + Prisma ORM   │  │    Integration  │
└─────────────────┘  └─────────────────┘

           ▲
           │
┌───────────────────────────────┐
│      Firebase Authentication  │
└───────────────────────────────┘
```

---

## 📂 Project Structure

```text
Apna-Interview/
│
├── client/
│   ├── app/
│   │   ├── (dashboard)/
│   │   ├── firebase/
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot/
│   │
│   ├── components/
│   │   ├── dashboard/
│   │   └── home/
│   │
│   ├── public/
│   └── types/
│
├── server/
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── routers/
│       ├── services/
│       └── server.ts
│
└── README.md
```
---

## 💻 Installation & Setup

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- PostgreSQL or access to a hosted PostgreSQL database
- Firebase project
- AI API credentials

---

### 1. Clone the Repository

```bash
git clone https://github.com/mukulsingh24/Apna-Interview.git
```

```bash
cd Apna-Interview
```

---

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

Create:

```text
client/.env.local
```

Add the required environment variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

NEXT_PUBLIC_API_URL=http://localhost:5050
```

Start the frontend:

```bash
npm run dev
```

The frontend will run at:

```text
http://localhost:3000
```

---

### 3. Install Backend Dependencies

Open another terminal:

```bash
cd server
npm install
```

Create:

```text
server/.env
```

Add your required backend environment variables, including your database connection, Firebase Admin credentials, and AI API credentials.

Example:

```env
DATABASE_URL=your_postgresql_database_url

FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY=your_firebase_private_key

AI_API_KEY=your_ai_api_key
```

Use the actual environment-variable name expected by your AI service implementation.

---

### 4. Generate Prisma Client

```bash
npx prisma generate
```

Apply database migrations:

```bash
npx prisma migrate dev
```

---

### 5. Start the Backend

For development:

```bash
npm run dev
```

The backend will run at:

```text
http://localhost:5050
```

---

## 🚀 Production Deployment

The application uses a separated frontend and backend deployment architecture.

### Frontend

The Next.js frontend can be deployed using Vercel.

Production environment variables should include:

```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

along with the required Firebase client configuration.

### Backend

The Express.js backend can be deployed using Render.

The production server should use:

```ts
const PORT = process.env.PORT || 5050;
```

Required backend environment variables must be configured securely on the hosting platform.

### Firebase

The production frontend domain must be added to:

```text
Firebase Console
→ Authentication
→ Settings
→ Authorized Domains
```

---

## 🔮 Future Scope

Apna Interview is designed to evolve into a more complete AI-powered career preparation ecosystem.

### 🤖 Personalized AI Career Coach

A context-aware AI chatbot that understands the user's:

- Resume
- Skills
- Target role
- Job match results
- Interview performance

The AI coach will provide personalized career guidance and preparation recommendations.

### 🎥 AI Video Mock Interviews

Camera-enabled mock interview sessions that simulate real interview environments.

Future analysis may include:

- Interview response evaluation
- Communication analysis
- Session-level performance insights

### 🎙️ Voice-Based Interviews

Users will be able to answer interview questions naturally using voice instead of typing.

The system can provide AI-powered feedback on:

- Answer quality
- Clarity
- Structure
- Communication effectiveness

### 🧠 Adaptive Interview Practice

Interview difficulty and question selection will dynamically adapt based on the user's previous answers and performance.

### 📊 Advanced Performance Analytics

A detailed analytics dashboard for tracking:

- ATS score improvements
- Job match trends
- Interview performance
- Skill development
- Overall preparation progress

### 💼 Personalized Job Recommendations

AI-powered job recommendations based on:

- Resume skills
- Experience
- Target role
- Job match history
- Career profile

### 🔗 LinkedIn Profile Analysis

Analyze LinkedIn profiles and provide personalized suggestions for improving professional visibility and recruiter discoverability.

### 🌐 Multi-Language Support

Support resume analysis and interview preparation in multiple languages to make the platform accessible to a wider audience.

### 📈 Resume Version Comparison

Allow users to compare multiple versions of their resume and measure improvements in ATS scores and job compatibility.

---

## 🛣️ Roadmap

```text
Phase 1 — Core Platform
├── Authentication                    ✅
├── User Profile                      ✅
├── AI Resume Analysis                ✅
├── ATS Scoring                       ✅
├── Job Match Analysis                ✅
├── AI Interview Preparation          ✅
├── Activity History                  ✅
└── Personalized Dashboard            ✅

Phase 2 — Enhanced Intelligence
├── Personalized AI Career Coach      🔜
├── Adaptive Interview Practice       🔜
├── Advanced Performance Analytics    🔜
└── Resume Version Comparison         🔜

Phase 3 — Immersive Interviewing
├── Voice-Based Interviews            🔮
├── AI Video Mock Interviews          🔮
└── Advanced Communication Feedback   🔮

Phase 4 — Career Ecosystem
├── Personalized Job Recommendations  🔮
├── LinkedIn Profile Analysis         🔮
└── Multi-Language Support            🔮
```

---

## 🌟 Learning Outcomes

This project demonstrates practical experience with:

- Full-stack web application development
- Next.js application architecture
- TypeScript
- REST API development
- Node.js and Express.js
- PostgreSQL database design
- Prisma ORM
- Firebase Authentication
- Firebase Admin SDK
- Token-based API authorization
- AI API integration
- PDF parsing and file uploads
- Protected frontend routes
- User-specific data management
- Responsive UI development
- Production deployment architecture

---

## 🤝 Contributing

Contributions, suggestions, and feedback are welcome.

If you would like to contribute:

1. Fork the repository
2. Create a new feature branch
3. Make your changes
4. Commit your changes
5. Push the branch
6. Open a Pull Request

---

## 👨‍💻 Author

**Mukul Singh**

GitHub: `mukulsingh24`

---

## 📄 License

This project is developed primarily for educational, learning, and portfolio purposes.

---

⭐ If you find this project useful or interesting, consider giving the repository a star.