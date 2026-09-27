import React, { useState } from 'react';
import { Download, Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenCv: () => void;
  isDark: boolean;
  onToggleDark: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCv, isDark, onToggleDark }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Monogram Wordmark Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-blue-600 text-white font-mono font-bold text-sm flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
            HH
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
              {PERSONAL_INFO.fullName}
            </span>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 -mt-0.5 hidden sm:block">
              BSCS Candidate · Web & UX
            </span>
          </div>
        </a>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
          <a href="#about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            About
          </a>
          <a href="#projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Projects
          </a>
          <a href="#skills" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Skills
          </a>
          <a href="#experience" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Experience
          </a>
          <a href="#certifications" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Certifications
          </a>
          <a href="#writing" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Writing
          </a>
          <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Contact
          </a>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle (Alex Rivera style) */}
          <button
            onClick={onToggleDark}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Download CV CTA */}
          <button
            onClick={onOpenCv}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Resume / CV</span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            <a href="#home" onClick={() => setMobileMenuOpen(false)} className="py-1">Home</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="py-1">About</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="py-1">Projects</a>
            <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="py-1">Skills</a>
            <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="py-1">Experience</a>
            <a href="#certifications" onClick={() => setMobileMenuOpen(false)} className="py-1">Certifications</a>
            <a href="#writing" onClick={() => setMobileMenuOpen(false)} className="py-1">Writing & Research</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="py-1">Contact</a>
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCv();
              }}
              className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Academic CV</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
