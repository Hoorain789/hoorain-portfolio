import React, { useState } from 'react';
import { ArrowUpRight, Play, ExternalLink, Sparkles, X, Terminal, Cpu } from 'lucide-react';
import { FEATURED_PROJECTS } from '../data/portfolioData';
import { VoiceCalculatorDemo } from './VoiceCalculatorDemo';
import { DairyFarmDemo } from './DairyFarmDemo';
import { Project } from '../types';

export const FeaturedProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'ai'>('all');
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const filteredProjects = FEATURED_PROJECTS.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'web') return p.tag === 'Web Development';
    if (activeFilter === 'ai') return p.tag === 'AI & Python';
    return true;
  });

  return (
    <section id="projects" className="py-20 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header with Category Tabs (Alex Rivera signature) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <span>[01]</span>
              <span>Portfolio & Case Studies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured Work
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              Production web applications, accessible speech-recognition tools, and full-stack software built with modern engineering workflows.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-white dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-slate-900 text-white dark:bg-blue-600'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Work ({FEATURED_PROJECTS.length})
            </button>
            <button
              onClick={() => setActiveFilter('web')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'web'
                  ? 'bg-slate-900 text-white dark:bg-blue-600'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Web Applications
            </button>
            <button
              onClick={() => setActiveFilter('ai')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'ai'
                  ? 'bg-slate-900 text-white dark:bg-blue-600'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              AI & Speech (FYP)
            </button>
          </div>
        </div>

        {/* Live Interactive Sandbox Banner (if opened) */}
        {activeDemo && (
          <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                <Sparkles className="w-4 h-4" />
                <span>Interactive Live Sandbox Environment</span>
              </div>
              <button
                onClick={() => setActiveDemo(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {activeDemo === 'calculator' && <VoiceCalculatorDemo />}
            {activeDemo === 'dairy' && <DairyFarmDemo />}
          </div>
        )}

        {/* Grid of Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="bg-white dark:bg-slate-800/80 rounded-3xl border border-slate-200/90 dark:border-slate-700/80 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 group"
            >
              {/* Media Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                
                {/* Project Number badge */}
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-lg bg-slate-900/80 text-white font-mono text-[11px] backdrop-blur-xs font-semibold">
                  0{idx + 1}
                </div>

                {/* Tag badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 font-semibold text-xs backdrop-blur-xs shadow-xs">
                  {project.tag}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-2">
                  <div className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold uppercase">
                    {project.category}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Footer Controls: Live Link + Sandbox Toggle */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-3">
                  {/* Action 1: Live Web URL (only if valid URL provided) */}
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      <span>Visit Live Website</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                      <span>Interactive Prototype</span>
                    </span>
                  )}

                  {/* Action 2: Interactive Sandbox or Demo */}
                  {project.demoType === 'calculator' && (
                    <button
                      onClick={() => setActiveDemo(activeDemo === 'calculator' ? null : 'calculator')}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{activeDemo === 'calculator' ? 'Close Sandbox' : 'Try Live Voice Demo'}</span>
                    </button>
                  )}

                  {project.demoType === 'dairy' && (
                    <button
                      onClick={() => setActiveDemo(activeDemo === 'dairy' ? null : 'dairy')}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold transition-all cursor-pointer"
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      <span>{activeDemo === 'dairy' ? 'Close Sandbox' : 'Open ERP Sandbox'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
