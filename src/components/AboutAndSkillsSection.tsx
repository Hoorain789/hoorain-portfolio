import React from 'react';
import { User, Sparkles, ArrowRight, Code, Brain, PenTool, Wrench, Users, CheckCircle2, GraduationCap } from 'lucide-react';
import { PERSONAL_INFO, SKILL_GROUPS } from '../data/portfolioData';
import { GithubContributionCalendar } from './GithubContributionCalendar';

interface AboutAndSkillsSectionProps {
  onOpenCv: () => void;
}

export const AboutAndSkillsSection: React.FC<AboutAndSkillsSectionProps> = ({ onOpenCv }) => {
  const renderSkillIcon = (iconType: string) => {
    switch (iconType) {
      case 'code':
        return <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'brain':
        return <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'pen':
        return <PenTool className="w-5 h-5 text-pink-600 dark:text-pink-400" />;
      case 'wrench':
        return <Wrench className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'users':
        return <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      default:
        return <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
    }
  };

  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top: About Me Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Bio & Academic Vision */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <span>[02]</span>
              <span>Biography & Philosophy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Bridging Human Usability with Computational Intelligence.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                {PERSONAL_INFO.aboutMeText}
              </p>
              <p>
                My multidisciplinary background unites software engineering, rigorous UX design methodology (empathize, define, ideate, prototype, test), and educational pedagogy. As a Computer Science instructor for secondary students, I have honed the craft of translating abstract computational logic into clear, user-friendly experiences.
              </p>
            </div>

            {/* Academic Scholarship Focus Highlights */}
            <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 space-y-3">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                <GraduationCap className="w-4 h-4" />
                <span>Graduate Scholarship Ambition</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Actively seeking fully funded Master's scholarship opportunities in Computer Science, HCI, and Artificial Intelligence across <strong>China (CSC/University), the United Kingdom, Germany (DAAD), Italy, and the United States</strong>.
              </p>
            </div>

            <div>
              <button
                onClick={onOpenCv}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer shadow-xs"
              >
                <span>Read Full Academic Profile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Skills Matrix (Alex Rivera style) */}
          <div id="skills" className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <span>[03]</span>
              <span>Capabilities & Tooling</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Skills Matrix
            </h2>

            <div className="space-y-4">
              {SKILL_GROUPS.map((skill) => (
                <div
                  key={skill.id}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-700 shadow-xs shrink-0">
                      {renderSkillIcon(skill.iconType)}
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          {skill.title}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-mono">
                        {skill.tags}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Real-Time GitHub Activity & Contribution Calendar */}
        <GithubContributionCalendar />
      </div>
    </section>
  );
};
