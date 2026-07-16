import React, { useState } from 'react';

interface DisclosureProps {
  title: string;
  children: React.ReactNode;
  id?: string;
}

export default function Disclosure({ title, children, id = 'disclosure' }: DisclosureProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = `${id}-panel`;
  const buttonId = `${id}-button`;

  return (
    <div className="w-full border border-border rounded-2xl bg-bg/40 backdrop-blur-md overflow-hidden">
      {/* Trigger Button */}
      <button
        type="button"
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-text-h hover:bg-bg/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 transition-all"
      >
        <span>{title}</span>
        <svg
          className={`h-5 w-5 text-text transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-accent' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expandable Panel */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
        className={`px-6 py-4 border-t border-border bg-bg/25 text-sm text-text transition-all duration-300 ${
          isOpen ? 'block animate-slide-down' : 'hidden'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
