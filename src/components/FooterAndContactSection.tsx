import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowUp, Globe, Linkedin, Github } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterAndContactProps {
  onOpenCv: () => void;
}

export const FooterAndContactSection: React.FC<FooterAndContactProps> = ({ onOpenCv }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          subject: subject || 'Portfolio Inquiry',
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit inquiry.');

      setSuccess(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error transmitting message.');
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-slate-900 text-white pt-20 pb-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Contact Grid (Alex Rivera style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-blue-400">
              <span>[07]</span>
              <span>Direct Connection</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Let's Discuss Projects, Research & Scholarship.
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              I am actively seeking admission and scholarship opportunities for Master's study in Computer Science, and I am available for innovative full-stack, frontend, and UX design collaborations.
            </p>

            {/* Direct Contact Chips */}
            <div className="space-y-4 pt-2">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition-colors text-slate-200 hover:text-white"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Email Address</div>
                  <div className="text-xs sm:text-sm font-semibold truncate">{PERSONAL_INFO.email}</div>
                </div>
              </a>

              <a
                href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition-colors text-slate-200 hover:text-white"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Phone & WhatsApp</div>
                  <div className="text-xs sm:text-sm font-semibold">{PERSONAL_INFO.phone}</div>
                </div>
              </a>

              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-slate-200">
                <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Location</div>
                  <div className="text-xs sm:text-sm font-semibold">{PERSONAL_INFO.location}</div>
                </div>
              </div>
            </div>

            {/* Social Icons row */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                title="LinkedIn"
              >
                <i className="fa-brands fa-linkedin-in text-sm"></i>
              </a>

              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                title="GitHub"
              >
                <i className="fa-brands fa-github text-sm"></i>
              </a>

              <a
                href={PERSONAL_INFO.githubPortfolio}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                title="GitHub Pages Portfolio"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Alex Rivera Contact Form */}
          <div className="lg:col-span-7 bg-slate-800/60 border border-slate-700/80 p-6 sm:p-8 rounded-3xl backdrop-blur-xs">
            <h3 className="text-xl font-bold text-white mb-2">Send a Message</h3>
            <p className="text-xs text-slate-400 mb-6">
              Inquiries are forwarded directly to Hoorain's primary inbox.
            </p>

            {success ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Inquiry Transmitted Successfully</h4>
                <p className="text-xs text-emerald-200">
                  Thank you! Hoorain has received your message and will respond promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-slate-300">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Professor / Recruiter"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-slate-300">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@institution.edu"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-slate-300">Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Master's Scholarship / Software Opportunity"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-slate-300">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please describe your proposal, scholarship opportunity, or collaboration inquiry..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-rose-400">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-blue-600/30"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Transmitting...' : 'Send Inquiry Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Minimalist Footer matching Alex Rivera */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center">
              HH
            </div>
            <span>© 2026 {PERSONAL_INFO.fullName}. Crafted with React & Tailwind CSS.</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenCv}
              className="hover:text-white transition-colors cursor-pointer text-blue-400 font-medium"
            >
              Academic CV
            </button>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
