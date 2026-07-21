# Week 01 Deliverable: Portfolio Sitemap & AI Tutor Setup ("Draw the Path")

**Deliverable**: Portfolio Sitemap Sketch, AI Toolkit Setup, Configured Claude Tutor Project, & Pressure-Test Audit Log  
**Author**: Akshith Reddy (`reddyakshith2502@gmail.com`)  
**Repository**: `1st-assingnment`  

---

## 1. AI Toolkit Accounts Verification

The following free-tier tools have been established to support the 8-week portfolio engineering workflow:

| Tool / Platform | Account Status | Intended Use & Role |
| :--- | :--- | :--- |
| **Claude (Anthropic)** | ✅ Configured | Primary AI Tutor & Project Lead for all 8 build weeks |
| **ChatGPT (OpenAI)** | ✅ Configured | Secondary logic validation & alternative code refactoring |
| **Gemini (Google)** | ✅ Configured | Multi-modal visual UI review & search context |
| **Perplexity AI** | ✅ Configured | Technical research, library API benchmarks, & documentation lookup |

---

## 2. Core Positioning Strategy

- **Target Audience ("The One Person")**: Senior Frontend Tech Lead / Engineering Manager looking to hire an intern or junior engineer who writes clean, accessible, test-driven React/Next.js code.
- **Proof Statement (Core Claim)**: *"I build production-grade, accessible (WCAG 2.1 AA compliant), test-driven React & Next.js frontend applications with performance-first architecture and verified zero-defect quality."*
- **The One Action**: *"Schedule a 15-minute technical interview / code walkthrough."*

---

## 3. Minimalist Portfolio Sitemap Sketch

Every page and section is strictly aligned to validate the core claim and drive the user to the **One Action**.

```text
[ LANDING PAGE (Hero + Claim + Live A11y Badge) ]
                       │
       ┌───────────────┴───────────────┐
       ▼                               ▼
[ FEATURED CASE STUDIES ]     [ ABOUT & WORKFLOW ]
 (Code Diffs & Tests)          (AI Fluency & Stack)
       │                               │
       └───────────────┬───────────────┘
                       ▼
         [ SCHEDULE INTERVIEW (One Action) ]
```

![Portfolio Sitemap Sketch](file:///c:/Users/REDDY/Desktop/AKSHITH%20REDDY/internship/1st%20assingnment/public/portfolio_sitemap_sketch.png)

### Page & Section Breakdown:
1. **Hero Section (Landing)**: Clear statement of the claim, live interactive accessibility & Vitest status badge, and prominent CTA ("Schedule Tech Interview").
2. **Featured Work / Case Studies**: 3 flagship projects showcasing the problem statement, TypeScript architecture, code diffs, Vitest test suites, and WCAG compliance proof.
3. **About & Engineering Philosophy**: Concise overview of technical stack (React 19, Next.js, Vitest, Tailwind, Vanilla CSS) and AI-augmented developer workflow.
4. **Contact / Action Hub**: Integrated booking widget (Calendly), GitHub link, and direct contact form to trigger the target hiring outcome.

---

## 4. Configured Claude Tutor Project Setup

### Project Settings: `8-Week Portfolio Build & AI Tutor`
- **Role**: Act as a Senior AI Engineering Tutor & Technical Lead guiding an 8-week portfolio construction.
- **Custom Instructions**:
  > *"You are my Senior AI Engineering Tutor for an 8-week portfolio build project. My target audience is a Senior Frontend Tech Lead looking for candidates with strong frontend engineering fundamentals. My core proof statement is: 'I build production-grade, accessible, test-driven React & Next.js applications.' My target action is getting the hiring manager to schedule a 15-minute technical interview. Challenge my assumptions, enforce strict code quality, insist on WCAG 2.1 AA compliance, and evaluate all deliverables against my target action."*
- **Project Knowledge Base**: Pre-loaded with `CLAUDE.md`, `WORKFLOW_AUDIT.md`, and project architecture rules.

![Claude Tutor Project Setup](file:///c:/Users/REDDY/Desktop/AKSHITH%20REDDY/internship/1st%20assingnment/public/claude_tutor_project.png)

---

## 5. Real Pressure-Test Prompt & AI Response

### The Pressure-Test Prompt:
> *"Act as my Senior AI Engineering Tutor. Pressure-test my proposed 4-page portfolio sitemap against my target audience (Senior Frontend Tech Lead), my core proof statement ('I build production-grade, accessible, test-driven React & Next.js applications'), and my one desired action ('Schedule a 15-min tech interview'). Identify any friction, unnecessary pages, or missed opportunities to prove my claim immediately upon landing."*

![Pressure Test Prompt & Output](file:///c:/Users/REDDY/Desktop/AKSHITH%20REDDY/internship/1st%20assingnment/public/claude_pressure_test.png)

### Key Feedback & Analysis from Claude:
1. **Friction Point (Standalone About Page)**: A standalone "About" page introduces unnecessary navigation friction. Tech leads evaluating portfolios focus primarily on code quality and proof of competence before reading personal backgrounds.
2. **Substantiating the Claim**: Claiming "accessible & test-driven" in the hero header without immediate interactive proof is unconvincing. Proof must be visible above the fold within 3 seconds of landing.
3. **Conversion Path Optimization**: The CTA to schedule an interview should be persistently visible (sticky header) rather than isolated at the bottom of a contact page.

---

## 6. Actionable Sitemap Refinements (Post Pressure-Test)

Based on the pressure-test analysis, two major improvements were made:

- **Refinement 1 (Sitemap Consolidation)**: Collapsed the standalone "About" page directly into a streamlined section on the primary Landing Page. This reduces navigation depth to a single high-conversion scroll page + dedicated project deep-dives.
- **Refinement 2 (Immediate Proof Badge)**: Added a dynamic "WCAG 2.1 AA & Vitest Test Coverage Widget" directly inside the Hero preview component to validate the core claim immediately upon page load.
