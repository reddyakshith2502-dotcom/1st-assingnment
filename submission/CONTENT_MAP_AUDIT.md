# Week 03 Deliverable: Portfolio Content Map & Through-Line ("The Through-Line")

**Deliverable**: One-Line Claim, Page-by-Page Content Map, Call-to-Action Hierarchy, & "Still Need to Gather" Verification List  
**Author**: Akshith Reddy (`reddyakshith2502@gmail.com`)  
**Repository**: `1st-assingnment`  

---

## 1. The One-Line Claim (Single Memorable Sentence)

To arrive at a concise, memorable claim, I generated 10 AI options and sharpened the top candidate:

### AI Brainstorm Options:
1. *I build full-stack web applications with modern AI tools.* (Too generic)
2. *I create beautiful React component libraries.* (Vague)
3. *I write accessible React components tested with Vitest.* (Good)
4. *I engineer zero-defect frontend components using React 19 and Next.js.* (Broad)
5. *I build WCAG 2.1 AA compliant, test-driven React components with verified zero-defect quality.* (Strong)
6. *I build test-driven React components that pass accessibility audits.* (Clean)
7. *I ship production-grade React components backed by Vitest test suites and ARIA standards.* (Solid)
8. *I build accessible frontend systems that eliminate input race conditions and screen reader bugs.* (Technical)
9. *I engineer accessible, test-backed React applications with zero post-generation bugs.* (Clear)
10. *I write clean TypeScript UI components that pass 100% of unit tests and WCAG accessibility standards.* (Specific)

### 🎯 Final Selected & Sharpened One-Line Claim:
> **"I engineer production-grade, WCAG 2.1 AA compliant React and Next.js components backed by automated Vitest test suites."**

---

## 2. Complete Portfolio Content Map

Every page and section is ordered logically, leading with the strongest engineering work and laddering up to the primary target action: **Schedule a 15-Minute Technical Interview**.

```text
[ HOME / LANDING PAGE ]
 ├── 1. Hero Banner (One-Line Claim + Live Test Badge) ───► CTA: "Schedule 15-Min Tech Interview"
 ├── 2. Flagship Case Studies (Strongest Work First) ─────► CTA: "View Live Code on GitHub"
 ├── 3. Engineering Philosophy & AI Fluency Workflow ─────► CTA: "Read Workflow Audit"
 └── 4. Interview Scheduling & Contact Hub ────────────────► CTA: "Book 15-Min Code Walkthrough"

[ DEEP-DIVE CASE STUDY PAGE: /case-studies/settings-form ]
 ├── 1. Overview & Live Demo Header ──────────────────────► CTA: "Try Live Interactive Demo"
 ├── 2. Beat 1: The Problem (ARIA Gaps & Race Conditions)
 ├── 3. Beat 2: What I Did & Decided (TypeScript & State)
 ├── 4. Beat 3: Verified Outcome (Vitest Metrics) ─────────► CTA: "Schedule 15-Min Tech Review"
```

---

### Page 1: Primary Landing Page (`/`)

#### Section 1: Hero Banner
- **Header**: One-Line Claim (*"I engineer production-grade, WCAG 2.1 AA compliant React and Next.js components backed by automated Vitest test suites."*)
- **Subheader**: Developer Bio summary & Voice Card badge (*Direct, technical, plainspoken, pragmatic, zero buzzwords, evidence-first*).
- **Proof Widget**: Dynamic A11y & Vitest test badge (*"8/8 tests passing in 280ms"*).
- **Primary CTA**: **"Schedule a 15-Minute Technical Interview"**

#### Section 2: Flagship Case Studies (Strongest Work Leads)
1. **Lead Case (Case Study 1 - Strongest)**: *Production React Settings Form & Vitest Engine* (`SettingsForm.test.tsx` — problem, ARIA bindings, disabled submit loading, 280ms test suite).
2. **Second Case (Case Study 2)**: *Custom Focus Traps vs UI Library Primitives* (Keyboard navigation, `@base-ui/react` comparative audit, scrollbar layout shift fix).
3. **Third Case (Case Study 3)**: *AI Workflow Audit & Pre-Commit Pipeline* (12-task framework, `oxlint` pre-commit checks in `<2s`).
- **Section CTA**: **"View Code Architecture on GitHub"**

#### Section 3: Engineering Philosophy & AI Fluency
- **Tech Stack Badges**: React 19, Next.js (App Router), TypeScript, Vitest, Vanilla/Tailwind CSS.
- **AI Workflow Method**: Explains how AI accelerates setup while automated tests enforce zero-defect quality gates.
- **Section CTA**: **"Review AI Workflow Audit"**

#### Section 4: Contact & Interview Scheduling Hub
- Integrated Calendly booking widget, GitHub permalink, and direct contact form.
- **Page Final CTA**: **"Schedule a 15-Minute Technical Code Review Interview"**

---

### Page 2: Dedicated Case Study Deep-Dive (`/case-studies/settings-form`)

1. **Section 1: Case Header**: Project title, live Vercel demo link, GitHub permalink, Vitest status badge.
2. **Section 2: Beat 1 — The Problem**: WCAG screen-reader error gaps, textareas exceeding bounds, and input race conditions during API latency.
3. **Section 3: Beat 2 — What I Did & Decided**: Client regex validation, dynamic `aria-invalid="true"` / `aria-describedby` bindings, submission loading lock (`disabled={isLoading}`), and 8 Vitest unit tests with fake timers.
4. **Section 4: Beat 3 — Verified Outcome**: 100% WCAG 2.1 AA compliance, zero race conditions, and test suite execution in 280ms.
- **Page Final CTA**: **"Discuss This Architecture in a 15-Minute Tech Review"**

---

## 3. Honest "Still Need to Gather" Verification List

To ensure the build week is not blocked, here is the status of all required proof assets:

| Proof Asset | Target Location | Current Status | Action Needed Before Build Week |
| :--- | :--- | :--- | :--- |
| **SettingsForm UI Screenshots** | Case Study 1 | ✅ Gathered | Saved in `public/` directory |
| **Vitest CLI Execution Report** | Case Study 1 | ✅ Gathered | Verified (8 passed tests in 280ms) |
| **GitHub Permalinks** | All Case Studies | ✅ Gathered | Live on `master` branch |
| **Live Vercel Interactive Link** | Hero & Case Studies | ⏳ Pending | Deploy Next.js build to Vercel in Week 04 |
| **Mentor Code Review Note** | Case Study 1 | ⏳ Pending | Request 2-line testimonial from internship lead |

---

## 4. Pass / Revise Criteria Checklist

- [x] **Single Memorable Claim**: One tight sentence stating exact engineering proof (no multi-line paragraphs).
- [x] **Ordered Sections & Named CTAs**: Every page has ordered sections; strongest work (`SettingsForm`) leads first.
- [x] **CTAs Ladder to One Action**: All calls-to-action point directly to scheduling a 15-minute technical code review interview.
- [x] **Honest Gather List**: Verified gathered assets vs pending Vercel deployment and mentor note.
