import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'home', href: '#Home' },
    { label: 'education', href: '#Education' },
    { label: 'services', href: '#Services' },
    { label: 'projects', href: '#Projects' },
    { label: 'certifications', href: '#Certifications' },
    { label: 'scholarships', href: '#Scholarships' },
    { label: 'contact', href: '#Contact' },
  ];

  return (
    <footer className="bg-[#151515] py-14 px-6 sm:px-8 border-t border-[#222]">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-6 text-center">
        {/* Social Icons matching original footer: .footer .icons i */}
        <div className="flex items-center gap-4">
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full border border-neutral-600 text-neutral-300 flex items-center justify-center text-lg hover:border-[#83f346] hover:text-[#83f346] hover:shadow-[0_0_15px_#83f346] transition-all"
            aria-label="LinkedIn"
          >
            <i className="fa-brands fa-linkedin" aria-hidden="true"></i>
          </a>

          <a
            href={PERSONAL_INFO.githubPortfolio}
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full border border-neutral-600 text-neutral-300 flex items-center justify-center text-lg hover:border-[#83f346] hover:text-[#83f346] hover:shadow-[0_0_15px_#83f346] transition-all"
            aria-label="GitHub"
          >
            <i className="fa-brands fa-github" aria-hidden="true"></i>
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full border border-neutral-600 text-neutral-300 flex items-center justify-center text-lg hover:border-[#83f346] hover:text-[#83f346] hover:shadow-[0_0_15px_#83f346] transition-all"
            aria-label="Instagram"
          >
            <i className="fa-brands fa-instagram" aria-hidden="true"></i>
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full border border-neutral-600 text-neutral-300 flex items-center justify-center text-lg hover:border-[#83f346] hover:text-[#83f346] hover:shadow-[0_0_15px_#83f346] transition-all"
            aria-label="Twitter"
          >
            <i className="fa-brands fa-twitter" aria-hidden="true"></i>
          </a>
        </div>

        {/* Footer Navbar matching original: .footer .navbar */}
        <nav className="flex flex-wrap items-center justify-center gap-6 my-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-white capitalize hover:text-[#83f346] hover:underline transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Credit paragraph matching original: .footer .credit p */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-[#83f346] capitalize">
          <p className="flex items-center gap-2">
            <i className="fa fa-copyright" aria-hidden="true"></i>
            <span>Hoorain Haqnawaz</span>
            <span className="text-white">||</span>
            <span>all rights reserved</span>
          </p>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-full border border-[#83f346] text-[#83f346] hover:bg-[#83f346] hover:text-[#080808] transition-all cursor-pointer"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
