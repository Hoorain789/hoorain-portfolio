/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScrollProgressIndicator } from './components/ScrollProgressIndicator';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutAndSkillsSection } from './components/AboutAndSkillsSection';
import { FeaturedProjectsSection } from './components/FeaturedProjectsSection';
import { CertificationsAndExperienceSection } from './components/CertificationsAndExperienceSection';
import { ArticlesSection } from './components/ArticlesSection';
import { FooterAndContactSection } from './components/FooterAndContactSection';
import { CvModal } from './components/CvModal';

export default function App() {
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if user previously preferred dark mode or system preference
    const isDarkStored = localStorage.getItem('theme') === 'dark';
    if (isDarkStored) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans selection:bg-blue-500/20 selection:text-blue-700 transition-colors duration-200">
      {/* Thin animated scroll progress bar at the very top of the screen */}
      <ScrollProgressIndicator />

      {/* Header Bar: Monogram HH, Nav links, Dark/Light Toggle, Resume/CV CTA */}
      <Navbar
        onOpenCv={() => setIsCvOpen(true)}
        isDark={isDark}
        onToggleDark={toggleDarkMode}
      />

      <main>
        {/* [00] Hero: Status badge, Bold typography, 4 Metrics Strip, Showcase Card */}
        <Hero onOpenCv={() => setIsCvOpen(true)} />

        {/* [01] Featured Work: Category Filter Tabs, Live Web Links (Raja Dairy Farm, etc.), Live Sandboxes */}
        <FeaturedProjectsSection />

        {/* [02] Biography & [03] Capabilities: Academic Scholarship focus & Skills Matrix */}
        <AboutAndSkillsSection onOpenCv={() => setIsCvOpen(true)} />

        {/* [04] Experience Timeline & [05] Verified Google Certifications */}
        <CertificationsAndExperienceSection />

        {/* [06] Research & Case Notes (Signature Alex Rivera feature) */}
        <ArticlesSection />

        {/* [07] Direct Connection, Contact Form & Minimalist Footer */}
        <FooterAndContactSection onOpenCv={() => setIsCvOpen(true)} />
      </main>

      {/* Curriculum Vitae Modal with Print & Markdown Copy */}
      <CvModal isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} />
    </div>
  );
}
