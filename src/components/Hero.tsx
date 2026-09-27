import React from 'react';
import { ArrowDown, Mail, ExternalLink, Globe, Layers, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenCv: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCv }) => {
  return (
    <section id="home" className="relative pt-12 pb-20 md:pt-18 md:pb-24 overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors duration-200 bg-grid-pattern">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text & Impact Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              Designing Accessible UX & Engineering{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                Intelligent Web Systems.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              Hello, I'm <strong className="font-semibold text-slate-900 dark:text-white">{PERSONAL_INFO.fullName}</strong> — a Computer Science final year student at University of Education, Lahore. Specializing in frontend/full-stack development, human–centered UX research, and AI-enabled software solutions.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-blue-500/20 cursor-pointer"
              >
                <Layers className="w-4 h-4" />
                <span>Explore Selected Projects</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenCv}
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-semibold text-sm rounded-xl transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>View Academic CV</span>
              </button>
            </div>

            {/* Metrics Strip (Alex Rivera style) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200/80 dark:border-slate-800">
              <div className="space-y-0.5">
                <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                  Final Year
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  BSCS · Univ of Education
                </div>
              </div>

              <div className="space-y-0.5">
                <div className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono">
                  10+
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Google Certifications
                </div>
              </div>

              <div className="space-y-0.5">
                <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                  4+
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Full-Stack Systems
                </div>
              </div>

              <div className="space-y-0.5">
                <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                  120+
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Students Mentored
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Alex Rivera Style Portrait Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm rounded-3xl bg-gradient-to-b from-slate-100 to-white dark:from-slate-800 dark:to-slate-900 p-3 sm:p-4 border border-slate-200 dark:border-slate-800 shadow-xl">
              {/* Image Frame */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800">
                <img
                  src={PERSONAL_INFO.avatarImage}
                  alt={PERSONAL_INFO.fullName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = PERSONAL_INFO.fallbackImage;
                  }}
                />

                {/* Bottom Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                  <div className="text-xs font-mono text-blue-300">
                    {PERSONAL_INFO.location}
                  </div>
                  <div className="text-lg font-bold leading-tight">
                    {PERSONAL_INFO.fullName}
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    {PERSONAL_INFO.roleLine}
                  </div>
                </div>
              </div>

              {/* Quick Tech Badge Row */}
              <div className="pt-3 pb-1 flex flex-wrap items-center justify-between gap-2 px-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span>React</span>
                  <span>·</span>
                  <span>Python</span>
                  <span>·</span>
                  <span>UX / Figma</span>
                  <span>·</span>
                  <span>Node.js</span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="LinkedIn"
                  >
                    <i className="fa-brands fa-linkedin-in text-sm"></i>
                  </a>
                  <a
                    href={PERSONAL_INFO.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="GitHub"
                  >
                    <i className="fa-brands fa-github text-sm"></i>
                  </a>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
