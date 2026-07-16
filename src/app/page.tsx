import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 md:py-20 max-w-3xl mx-auto">
      {/* Badge */}
      <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent border border-accent/20 mb-6 animate-pulse">
        Phase 1: Foundations Live
      </span>

      {/* Main Title */}
      <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-text-h mb-6">
        Modern Component Workflow <br />
        <span className="bg-gradient-to-r from-accent via-purple-500 to-indigo-500 bg-clip-text text-transparent">
          Built to Production Standards
        </span>
      </h1>

      {/* Description */}
      <p className="text-lg text-text mb-10 max-w-xl">
        A premium Showcase application engineered with Next.js, TypeScript, and Tailwind CSS. Featuring strict type safety, fully accessible form validations, and live previews.
      </p>

      {/* Interactive CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-16">
        <Link
          href="/settings"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-accent text-white font-semibold text-sm shadow-lg shadow-accent/20 hover:bg-accent/90 hover:scale-[1.02] active:scale-100 transition-all duration-200"
        >
          Configure Settings Form
        </Link>
        <Link
          href="/health"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-border bg-bg/50 text-text-h font-semibold text-sm hover:bg-bg hover:scale-[1.02] active:scale-100 transition-all duration-200"
        >
          View System Health
        </Link>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
        <div className="p-6 rounded-2xl border border-border bg-bg/40 backdrop-blur-md hover:border-accent/40 transition-colors">
          <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 border border-accent/20">
            <span className="text-accent text-lg">🔒</span>
          </div>
          <h3 className="font-semibold text-text-h mb-2">A11y Compliant</h3>
          <p className="text-sm text-text">
            WCAG-compliant keyboard focus indices, custom ARIA labels, and live announcement error binds.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-bg/40 backdrop-blur-md hover:border-accent/40 transition-colors">
          <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 border border-accent/20">
            <span className="text-accent text-lg">⚡</span>
          </div>
          <h3 className="font-semibold text-text-h mb-2">Next.js App Router</h3>
          <p className="text-sm text-text">
            Fast Server Components by default with interactive client integrations where necessary.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-bg/40 backdrop-blur-md hover:border-accent/40 transition-colors">
          <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 border border-accent/20">
            <span className="text-accent text-lg">🧪</span>
          </div>
          <h3 className="font-semibold text-text-h mb-2">Automated Tests</h3>
          <p className="text-sm text-text">
            Full coverage suite verified via Vitest and Testing Library ensuring no regression slips.
          </p>
        </div>
      </div>
    </div>
  );
}
