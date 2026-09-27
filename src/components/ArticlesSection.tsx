import React from 'react';
import { ArrowUpRight, BookOpen, Clock, Tag } from 'lucide-react';
import { ARTICLES_AND_INSIGHTS } from '../data/portfolioData';

export const ArticlesSection: React.FC = () => {
  return (
    <section id="writing" className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <span>[06]</span>
              <span>Academic Writing & Notes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Research & Case Notes
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              Architectural reflections, UX accessibility research, and findings from machine learning & automation workflows.
            </p>
          </div>
        </div>

        {/* 3 Articles Grid matching Alex Rivera */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICLES_AND_INSIGHTS.map((article) => (
            <article
              key={article.id}
              className="p-6 sm:p-7 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 font-mono font-medium shadow-2xs">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1 text-slate-400 font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {article.summary}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">{article.date}</span>
                <a
                  href={article.link}
                  className="inline-flex items-center gap-1 font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
