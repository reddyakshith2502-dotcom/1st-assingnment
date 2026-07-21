import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 md:py-20 max-w-4xl mx-auto px-4">
      {/* Monogram & Status Badge */}
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-10 rounded-xl bg-[#0f172a] border border-[#6366f1]/40 flex items-center justify-center font-extrabold text-[#f8fafc] text-sm shadow-md">
          AR
        </div>
        <span className="inline-flex items-center rounded-full bg-[#6366f1]/10 px-3.5 py-1 text-xs font-semibold text-[#6366f1] border border-[#6366f1]/30">
          <span className="h-2 w-2 rounded-full bg-[#6366f1] mr-2 animate-ping" />
          Empty But Live — Production Host Active
        </span>
      </div>

      {/* Developer Name & Title */}
      <p className="text-sm font-semibold tracking-wider text-[#94a3b8] uppercase mb-3">
        Akshith Reddy — Frontend Engineering Portfolio
      </p>

      {/* Main One-Line Claim */}
      <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#f8fafc] mb-6 leading-tight max-w-3xl">
        I engineer production-grade, WCAG 2.1 AA compliant React and Next.js components backed by automated Vitest test suites.
      </h1>

      {/* Voice Card Description */}
      <p className="text-base sm:text-lg text-[#94a3b8] mb-10 max-w-2xl leading-relaxed">
        Direct, technical, plainspoken, pragmatic, zero buzzwords, evidence-first. Every component is built with strict TypeScript types, dynamic ARIA error bindings, and verified zero-defect unit test coverage.
      </p>

      {/* Call to Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto">
        <a
          href="https://calendly.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#6366f1] text-white font-bold text-sm shadow-lg shadow-[#6366f1]/25 hover:bg-[#4f46e5] hover:scale-[1.02] active:scale-100 transition-all duration-200"
        >
          Schedule 15-Minute Technical Interview
        </a>
        <Link
          href="/settings"
          className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-[#94a3b8]/30 bg-[#0f172a] text-[#f8fafc] font-semibold text-sm hover:bg-[#1e293b] hover:scale-[1.02] active:scale-100 transition-all duration-200"
        >
          Explore SettingsForm & Test Engine
        </Link>
      </div>

      {/* Content Map Preview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
        <div className="p-6 rounded-2xl border border-[#94a3b8]/20 bg-[#0f172a]/60 backdrop-blur-md">
          <div className="text-[#6366f1] text-xs font-bold uppercase tracking-wider mb-2">Case Study 01</div>
          <h3 className="font-bold text-[#f8fafc] text-base mb-2">React Settings Form & Vitest</h3>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            Full regex validation, dynamic ARIA bindings, disabled submit loading state, and 8 Vitest tests passing in 280ms.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-[#94a3b8]/20 bg-[#0f172a]/60 backdrop-blur-md">
          <div className="text-[#6366f1] text-xs font-bold uppercase tracking-wider mb-2">Case Study 02</div>
          <h3 className="font-bold text-[#f8fafc] text-base mb-2">Custom ARIA Focus Traps</h3>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            Keyboard focus traps, Escape key close, and architectural audit against Base UI / Radix primitives.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-[#94a3b8]/20 bg-[#0f172a]/60 backdrop-blur-md">
          <div className="text-[#6366f1] text-xs font-bold uppercase tracking-wider mb-2">Case Study 03</div>
          <h3 className="font-bold text-[#f8fafc] text-base mb-2">Pre-Commit AI Pipeline</h3>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            12-task weekly audit framework, custom Claude Project, and automated oxlint checks under 2 seconds.
          </p>
        </div>
      </div>
    </div>
  );
}
