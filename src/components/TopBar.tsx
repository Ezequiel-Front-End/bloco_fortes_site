import React from 'react';
import { Phone, Mail, Clock, Eye, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data';

interface TopBarProps {
  highContrast: boolean;
  onToggleHighContrast: () => void;
  fontScale: number;
  onAdjustFontScale: (delta: number) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  highContrast,
  onToggleHighContrast,
  fontScale,
  onAdjustFontScale,
}) => {
  return (
    <header
      role="banner"
      id="top-bar"
      className="w-full bg-[#080E18] text-xs text-slate-300 border-b border-slate-800/80 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Contact Info Items */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {/* Phone */}
          <a
            id="topbar-phone-link"
            href={`tel:${COMPANY_INFO.phoneRaw}`}
            className="inline-flex items-center gap-1.5 text-slate-200 hover:text-amber-400 transition-colors focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none rounded px-1 py-0.5"
            aria-label={`Call us at ${COMPANY_INFO.phone}`}
          >
            <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
            <span className="font-medium tracking-wide">{COMPANY_INFO.phone}</span>
          </a>

          {/* Email */}
          <a
            id="topbar-email-link"
            href={`mailto:${COMPANY_INFO.email}`}
            className="inline-flex items-center gap-1.5 text-slate-300 hover:text-amber-400 transition-colors focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none rounded px-1 py-0.5"
            aria-label={`Email us at ${COMPANY_INFO.email}`}
          >
            <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline font-normal">{COMPANY_INFO.email}</span>
            <span className="sm:hidden font-normal">Email Us</span>
          </a>

          {/* Working Hours */}
          <div
            id="topbar-hours"
            className="hidden md:inline-flex items-center gap-1.5 text-slate-400"
            aria-label={`Working hours: ${COMPANY_INFO.hours}`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
            <span>{COMPANY_INFO.hours}</span>
          </div>
        </div>

        {/* Right side: Accessibility Controls & Social Icons */}
        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          {/* A11y Toolbar */}
          <div
            role="toolbar"
            aria-label="Accessibility settings"
            className="flex items-center bg-slate-900/90 rounded-md border border-slate-800 px-2 py-0.5 gap-1"
          >
            <button
              id="btn-font-decrease"
              type="button"
              onClick={() => onAdjustFontScale(-0.1)}
              disabled={fontScale <= 0.9}
              className="px-1.5 py-0.5 text-slate-300 hover:text-amber-400 disabled:opacity-40 disabled:hover:text-slate-400 text-[11px] font-bold focus-visible:ring-1 focus-visible:ring-amber-400 rounded"
              title="Decrease text size"
              aria-label="Decrease text size"
            >
              A-
            </button>
            <span className="text-[10px] text-slate-500 select-none">|</span>
            <button
              id="btn-font-increase"
              type="button"
              onClick={() => onAdjustFontScale(0.1)}
              disabled={fontScale >= 1.3}
              className="px-1.5 py-0.5 text-slate-300 hover:text-amber-400 disabled:opacity-40 disabled:hover:text-slate-400 text-[11px] font-bold focus-visible:ring-1 focus-visible:ring-amber-400 rounded"
              title="Increase text size"
              aria-label="Increase text size"
            >
              A+
            </button>
            <span className="text-[10px] text-slate-500 select-none">|</span>
            <button
              id="btn-high-contrast"
              type="button"
              onClick={onToggleHighContrast}
              className={`px-1.5 py-0.5 text-[11px] font-medium rounded transition-colors inline-flex items-center gap-1 ${
                highContrast
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-300 hover:text-amber-400'
              }`}
              title={highContrast ? 'Turn off high contrast' : 'Turn on high contrast'}
              aria-label={highContrast ? 'Disable high contrast mode' : 'Enable high contrast mode'}
              aria-pressed={highContrast}
            >
              <Eye className="w-3 h-3" aria-hidden="true" />
              <span className="hidden lg:inline">Contrast</span>
            </button>
          </div>

          {/* Social Icons matching design: Facebook, Twitter/X, Instagram, LinkedIn */}
          <div className="flex items-center space-x-2 text-slate-400" aria-label="Social media links">
            <a
              id="social-facebook"
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="FlowRight Plumbing on Facebook"
              className="hover:text-amber-400 transition-colors p-1 focus-visible:ring-2 focus-visible:ring-amber-400 rounded"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              id="social-twitter"
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="FlowRight Plumbing on Twitter"
              className="hover:text-amber-400 transition-colors p-1 focus-visible:ring-2 focus-visible:ring-amber-400 rounded"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              id="social-instagram"
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="FlowRight Plumbing on Instagram"
              className="hover:text-amber-400 transition-colors p-1 focus-visible:ring-2 focus-visible:ring-amber-400 rounded"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              id="social-linkedin"
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="FlowRight Plumbing on LinkedIn"
              className="hover:text-amber-400 transition-colors p-1 focus-visible:ring-2 focus-visible:ring-amber-400 rounded"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
