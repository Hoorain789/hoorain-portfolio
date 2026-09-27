import React, { useEffect } from 'react';
import { X, CheckCircle2, Layers, Cpu, Compass, Users } from 'lucide-react';
import { Project } from '../types';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenDemo?: (demoType: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose, onOpenDemo }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden text-neutral-200 my-8">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-neutral-800 flex items-start justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-indigo-400 mb-1">
              UX Case Study & Technical Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm text-neutral-400 mt-1">{project.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[75vh] overflow-y-auto">
          {/* Key Metric Banner */}
          <div className="p-4 bg-indigo-950/30 border border-indigo-500/20 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
              <div>
                <div className="text-xs text-neutral-400">Validated Outcome</div>
                <div className="text-sm font-semibold text-white">{project.metrics}</div>
              </div>
            </div>
            {onOpenDemo && (
              <button
                onClick={() => {
                  onClose();
                  onOpenDemo(project.demoType);
                }}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                Launch Sandbox
              </button>
            )}
          </div>

          {/* Problem & Target Audience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-neutral-950/70 border border-neutral-800 rounded-xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                <Compass className="w-4 h-4 text-rose-400" />
                <span>The Core Challenge</span>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {project.caseStudy.problem}
              </p>
            </div>

            <div className="bg-neutral-950/70 border border-neutral-800 rounded-xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Target Demographic & Context</span>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {project.caseStudy.targetUsers}
              </p>
            </div>
          </div>

          {/* UX Design Thinking Methodology */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>UX Research & Design Thinking Process</span>
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {project.caseStudy.uxMethodology}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {project.caseStudy.wireframeSteps.map((ws, i) => (
                <div key={i} className="bg-neutral-950 border border-neutral-800/80 rounded-xl p-4 space-y-1.5">
                  <div className="text-xs font-mono font-bold text-indigo-400">{ws.step}</div>
                  <div className="text-sm font-semibold text-white">{ws.title}</div>
                  <div className="text-xs text-neutral-400 leading-normal">{ws.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Engineering Solution & Tech Stack */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>Technical Implementation & Solution Architecture</span>
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {project.caseStudy.solution}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs text-neutral-400 mr-2">Technologies Used:</span>
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-neutral-950 border border-neutral-800 rounded-md text-xs font-mono text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Learnings */}
          <div className="space-y-3 bg-neutral-950/60 border border-neutral-800 rounded-xl p-5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Engineering & UX Insights Learned
            </h4>
            <ul className="space-y-2 text-sm text-neutral-300">
              {project.caseStudy.keyLearnings.map((learning, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                  <span>{learning}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div className="text-xs text-neutral-500">
            Portfolio of Hoorain Haq Nawaz · Department of Computer Science
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
};
