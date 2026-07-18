import {
  FiMessageCircle,
  FiVideo,
  FiMic,
  FiBarChart2,
  FiBriefcase,
  FiZap,
} from "react-icons/fi";
import type { IconType } from "react-icons";

type UpcomingFeature = {
  icon: IconType;
  title: string;
  description: string;
  badge: string;
};

const upcomingFeatures: UpcomingFeature[] = [
  {
    icon: FiMessageCircle,
    title: "Personalized AI Career Coach",
    description:
      "Chat with an AI career assistant that understands your profile, skills, resume, and target role to provide personalized career guidance.",
    badge: "Coming Soon",
  },
  {
    icon: FiVideo,
    title: "AI Video Interviews",
    description:
      "Experience realistic mock interviews with camera-enabled sessions designed to simulate real technical and HR interview environments.",
    badge: "Planned",
  },
  {
    icon: FiMic,
    title: "Voice-Based Interviews",
    description:
      "Answer interview questions naturally using your voice and receive AI-powered feedback on your responses and communication.",
    badge: "Coming Soon",
  },
  {
    icon: FiBarChart2,
    title: "Advanced Performance Insights",
    description:
      "Track your resume scores, job matches, and interview performance through detailed analytics and personalized progress insights.",
    badge: "Planned",
  },
  {
    icon: FiBriefcase,
    title: "Personalized Job Recommendations",
    description:
      "Discover job opportunities matched to your skills, experience, resume profile, and career goals.",
    badge: "Future",
  },
  {
    icon: FiZap,
    title: "Adaptive Interview Practice",
    description:
      "Practice with AI-generated interview sessions that dynamically adjust question difficulty based on your previous answers and performance.",
    badge: "Future",
  },
];

export default function UpcomingFeatures() {
  return (
    <section id="upcoming-features" className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[13px] font-semibold uppercase tracking-wider text-indigo-600">
            What&apos;s Next
          </span>

          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            The future of your interview preparation
          </h2>

          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            We&apos;re building smarter, more personalized tools to make career
            preparation feel closer to the real hiring experience.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingFeatures.map(
            ({ icon: Icon, title, description, badge }) => (
              <div
                key={title}
                className="group relative rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_40px_-16px_rgba(15,23,42,0.12)] sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-all duration-300 group-hover:bg-linear-to-br group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white">
                    <Icon size={20} />
                  </div>

                  <span className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
                    {badge}
                  </span>
                </div>

                <h3 className="font-display mt-5 text-[17px] font-semibold text-slate-900">
                  {title}
                </h3>

                <p className="mt-2 text-[14.5px] leading-relaxed text-slate-600">
                  {description}
                </p>
              </div>
            ),
          )}
        </div>

        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-sm text-slate-500">
            Have an idea for Apna Interview? More AI-powered career preparation
            features are on the way.
          </p>
        </div>
      </div>
    </section>
  );
}