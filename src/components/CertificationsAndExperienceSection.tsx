import React, { useState } from 'react';
import { Award, Briefcase, ArrowUpRight, ShieldCheck, CheckCircle2, X, ExternalLink } from 'lucide-react';
import { CERTIFICATIONS_LIST, EXTRA_CERTIFICATIONS, EXPERIENCE_TIMELINE } from '../data/portfolioData';

export const CertificationsAndExperienceSection: React.FC = () => {
  const [showAllModal, setShowAllModal] = useState(false);

  return (
    <section id="experience" className="py-20 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Experience Timeline */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                <span>[04]</span>
                <span>Work & Leadership</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Experience Timeline
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Practical instruction, laboratory supervision, and project coordination.
              </p>
            </div>

            {/* Timeline cards */}
            <div className="space-y-6 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
              {EXPERIENCE_TIMELINE.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Node */}
                  <div className="absolute -left-[1.85rem] top-1.5 w-3.5 h-3.5 rounded-full bg-white dark:bg-slate-900 border-2 border-blue-600 dark:border-blue-400 group-hover:scale-125 transition-transform" />

                  <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 shadow-xs transition-all space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {item.role}
                      </h3>
                      <span className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400">
                        {item.period}
                      </span>
                    </div>

                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {item.institution}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                      {item.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Google Certifications */}
          <div id="certifications" className="lg:col-span-6 space-y-8">
            <div className="flex items-end justify-between">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  <span>[05]</span>
                  <span>Verified Credentials</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Google Certifications
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Professional specializations completed through Coursera.
                </p>
              </div>

              <button
                onClick={() => setShowAllModal(true)}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer shrink-0"
              >
                <span>View All 10</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Certifications 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CERTIFICATIONS_LIST.map((cert) => (
                <div
                  key={cert.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all flex flex-col justify-between shadow-xs space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-base tracking-tight">
                        <span className="text-[#4285F4]">G</span>
                        <span className="text-[#EA4335]">o</span>
                        <span className="text-[#FBBC05]">o</span>
                        <span className="text-[#4285F4]">g</span>
                        <span className="text-[#34A853]">l</span>
                        <span className="text-[#EA4335]">e</span>
                      </span>
                      <span className="p-1 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                        <ShieldCheck className="w-4 h-4" />
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                      {cert.title}
                    </h4>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">
                      {cert.issuer}
                    </span>
                    <span className="font-mono text-[11px] text-blue-600 dark:text-blue-400">
                      {cert.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* View Full Credential Callout */}
            <div
              onClick={() => setShowAllModal(true)}
              className="p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between cursor-pointer hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white/20">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold">Comprehensive Credential Dossier</div>
                  <div className="text-xs text-blue-100">Review all 10 completed courses & specializations</div>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Modal with Full 10+ Google Certifications */}
      {showAllModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto space-y-6 shadow-2xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
              <div>
                <h3 className="text-xl font-bold">All 10 Google Professional Credentials</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Completed on Coursera by Hoorain Haqnawaz
                </p>
              </div>
              <button
                onClick={() => setShowAllModal(false)}
                className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[...CERTIFICATIONS_LIST, ...EXTRA_CERTIFICATIONS].map((c, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700 space-y-1.5"
                >
                  <div className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                    {c.title}
                  </div>
                  <div className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
                    {c.issuer}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {c.date}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-end">
              <button
                onClick={() => setShowAllModal(false)}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-blue-700"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
