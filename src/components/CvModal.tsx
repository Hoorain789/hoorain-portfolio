import React, { useEffect, useState } from 'react';
import { X, Printer, Download, Copy, Check, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO, FEATURED_PROJECTS, CERTIFICATIONS_LIST, EXTRA_CERTIFICATIONS, EXPERIENCE_TIMELINE } from '../data/portfolioData';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    const text = `
# HOORAIN HAQ NAWAZ — CURRICULUM VITAE
BSCS Candidate | Frontend Developer | UX Designer | AI Enthusiast
Jauharabad, Punjab, Pakistan | +92 304 5856474 | hoorainhaqnawaz221@gmail.com
Portfolio: ${PERSONAL_INFO.githubPortfolio} | LinkedIn: ${PERSONAL_INFO.linkedin}

## ACADEMIC & PROFESSIONAL PROFILE
${PERSONAL_INFO.aboutMeText}

## EDUCATION
- Bachelor of Science in Computer Science (BSCS) — University of Education, Lahore — Final Year Student
- Intermediate (ICS) — Superior Group of Colleges — 701/1100
- Matriculation (Science) — Ali Memorial Public Model High School, Jauharabad — 853/1100

## PROFESSIONAL EXPERIENCE
- Computer Teacher — Ali Memorial Public Model High School, Jauharabad | 2023–Present
- Teaching & Research Experience (2021-2023)

## CERTIFICATIONS
- Google IT Automation with Python Professional Certificate (Coursera | Sep 2026)
- Google AI Professional Certificate (Coursera | Aug 2026)
- Google UX Design Certificate (Coursera | Aug 2026)
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white print:static">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-6 print:border-none print:shadow-none print:bg-white print:text-black print:m-0">
        {/* Modal Toolbar (hidden on print) */}
        <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
              Academic Curriculum Vitae
            </span>
            <span className="text-xs text-slate-500 hidden sm:inline">
              Hoorain Haqnawaz · BSCS Graduate Candidate
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
              aria-label="Close CV Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Document Container */}
        <div className="p-6 sm:p-10 max-h-[80vh] overflow-y-auto print:max-h-none print:overflow-visible text-slate-800 bg-white space-y-7 font-sans">
          {/* Header */}
          <div className="border-b border-slate-200 pb-6 space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {PERSONAL_INFO.fullName.toUpperCase()}
            </h1>
            <div className="text-sm font-bold text-blue-600">
              {PERSONAL_INFO.roleLine}
            </div>
            <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500 pt-1">
              <span>{PERSONAL_INFO.location}</span>
              <span aria-hidden="true">·</span>
              <span>{PERSONAL_INFO.phone}</span>
              <span aria-hidden="true">·</span>
              <span>{PERSONAL_INFO.email}</span>
            </div>
            <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500">
              <span>Portfolio: {PERSONAL_INFO.githubPortfolio}</span>
              <span aria-hidden="true">·</span>
              <span>LinkedIn: {PERSONAL_INFO.linkedin}</span>
            </div>
          </div>

          {/* Academic & Professional Profile */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 border-b border-slate-100 pb-1">
              Academic & Professional Profile
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {PERSONAL_INFO.aboutMeText}
            </p>
          </div>

          {/* Formal Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 border-b border-slate-100 pb-1">
              Formal Education
            </h2>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Bachelor of Science in Computer Science (BSCS)</span>
                  <span className="text-xs font-mono text-slate-500">2023 – Present</span>
                </div>
                <div className="text-xs text-blue-600 font-semibold">University of Education, Lahore · Final Year Student</div>
                <p className="text-xs text-slate-500 mt-1">Lead Developer on Multilingual Voice-Based Calculator FYP.</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Intermediate in Computer Science (ICS)</span>
                  <span className="text-xs font-mono text-slate-500">2021 – 2023</span>
                </div>
                <div className="text-xs text-blue-600 font-semibold">Superior Group of Colleges · Score: 701/1100</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Matriculation (Science & Computer Science)</span>
                  <span className="text-xs font-mono text-slate-500">2019 – 2021</span>
                </div>
                <div className="text-xs text-blue-600 font-semibold">Ali Memorial Public Model High School, Jauharabad · Score: 853/1100</div>
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 border-b border-slate-100 pb-1">
              Professional & Teaching Experience
            </h2>
            <div className="space-y-3">
              {EXPERIENCE_TIMELINE.map((exp, i) => (
                <div key={i} className="text-xs sm:text-sm">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>{exp.role}</span>
                    <span className="text-xs font-mono text-slate-500">{exp.period}</span>
                  </div>
                  <div className="text-xs text-slate-500 mb-1">{exp.institution}</div>
                  <p className="text-xs text-slate-600">{exp.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 border-b border-slate-100 pb-1">
              Featured Projects & Systems
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FEATURED_PROJECTS.map((p) => (
                <div key={p.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div className="font-bold text-slate-900">{p.title}</div>
                  <div className="text-[11px] text-blue-600 font-medium">{p.category}</div>
                  <p className="text-[11px] text-slate-500 mt-1">{p.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 border-b border-slate-100 pb-1">
              Google Professional Certifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[...CERTIFICATIONS_LIST, ...EXTRA_CERTIFICATIONS].map((c, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="font-bold text-slate-900">{c.title}</div>
                  <div className="text-[11px] text-slate-500">{c.issuer} · {c.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
