# Week 04 Deliverable: Technology Stack Audit & Trade-off Analysis ("Three Roads")

**Deliverable**: Four Hard Constraints, 3 Evaluated Stack Options (Simplest to Most Powerful), Pressure-Test Audit, & Personal Selection Rationale  
**Author**: Akshith Reddy (`reddyakshith2502@gmail.com`)  
**Repository**: `1st-assingnment`  

---

## 1. The Four Engineering Constraints

| Constraint Area | Specific Requirement |
| :--- | :--- |
| **1. Budget Constraint** | 100% Free tier hosting & tools only ($0 budget). |
| **2. Honest Developer Skill Level** | Frontend Intern proficient in React 19, TypeScript, Next.js (App Router), Vanilla/Tailwind CSS, and Vitest unit testing. |
| **3. Portfolio Functionality** | Must support our 4-section Content Map: Hero Claim, 3 Flagship Case Studies, AI Philosophy, and Interview Booking Hub. |
| **4. Work Display Requirements** | Must natively render interactive React form controls (`SettingsForm`), live ARIA states, code diff viewers, Vitest test reports, and embedded Calendly CTAs. |
| **5. Backend & Dynamic Needs** | **No custom backend required yet**. Static Site Generation (SSG) with client-side interactive state is 100% sufficient. |

---

## 2. Three Evaluated Stack Options (Simplest to Most Powerful)

---

### Option 1: Static HTML5, Vanilla CSS, & JavaScript (Simplest)
- **Architecture**: Plain static HTML/CSS files with vanilla JS DOM manipulation.
- **Hosting**: GitHub Pages (Free).
- **Backend Requirement**: None.
- **Real Trade-off**: Extremely simple to host, but completely fails to showcase modern React 19 and Next.js engineering skills. Rendering complex interactive form states (`SettingsForm`) and Vitest test harnesses requires manual DOM hacking, making code verbose and non-modular.

---

### Option 2: Next.js 16 (App Router / SSG) + TypeScript + Tailwind CSS (Balanced Front-Runner)
- **Architecture**: Next.js 16 App Router using Static Site Generation (SSG) for lightning-fast page loads, combined with interactive React client components (`'use client'`).
- **Hosting**: Vercel Free Production Tier.
- **Backend Requirement**: **Not yet**. Client-side state and SSG handle all interactive requirements cleanly.
- **Real Trade-off**: Requires Node/npm build pipeline, but provides complete type safety, native React component rendering, instant HMR during development, and automatic Vercel deployments.

---

### Option 3: Full-Stack Next.js + Server Actions + PostgreSQL (Supabase/Neon) (Most Powerful)
- **Architecture**: Full-stack Next.js app with Server Actions, API routes, and a remote PostgreSQL database to store user submissions and analytics dynamically.
- **Hosting**: Vercel + Supabase Free Tier.
- **Backend Requirement**: **Yes** (Database connection pooling, migrations, API route handlers).
- **Real Trade-off**: Adds heavy operational maintenance overhead. Managing database schemas, connection limits, cold-start latencies, and environment secret leaks introduces high failure risks during build week without adding any extra proof value for a frontend hiring manager.

---

## 3. Pressure-Testing the Options

1. **What breaks if I pick Option 1 (Simplest)?**
   - My primary proof claim (*"I engineer production-grade, WCAG-compliant React components"*) is crippled because static HTML cannot natively render React components, custom hooks, or Vitest unit test harnesses without heavy webpack bundling.

2. **What do I maintain if I pick Option 3 (Most Powerful)?**
   - I would have to maintain database connection pools, migration scripts, backend error handling, and API rate limits. If a database connection fails during a hiring manager's review, the entire site breaks.

3. **Can I finish in two weeks?**
   - **Option 2** can be fully built and polished in **3 days**. Option 3 risks scope creep, database connection bugs, and an unfinished build week.

4. **Does it show my work the way it needs to be shown?**
   - **Option 2** natively showcases React 19 component architecture, live interactive form validation, TypeScript interfaces, and Vitest test reports exactly as needed.

---

## 4. Personal Selection Rationale (In My Own Words)

> **Chosen Stack**: **Option 2 (Next.js 16 + TypeScript + Tailwind CSS on Vercel)**.
>
> **Why I Chose Option 2**:
> *"I chose Option 2 because it strikes the perfect balance between professional engineering rigor and rapid execution velocity. Next.js 16 with TypeScript allows me to natively showcase the exact React component architecture (`SettingsForm`), WCAG ARIA bindings, and Vitest test suites that my target hiring manager wants to evaluate. Hosting on Vercel is 100% free, gives me sub-second page loads via Static Site Generation, and auto-deploys every git push instantly."*
>
> **Why I Rejected Options 1 and 3**:
> *"I rejected Option 1 (Static HTML/JS) because it cannot render my React components or Vitest test harnesses cleanly, crippling my primary claim. I rejected Option 3 (Full-Stack PostgreSQL) because adding a custom database introduces unnecessary maintenance overhead—if a backend connection drops, my site breaks for zero added value. On the question of 'Can I maintain this?', Option 2 requires zero server maintenance while showing my code at peak quality."*
>
> **Honest Backend Decision**:
> *"Do I need a backend yet? **No.** A static site with interactive client components handles my case studies, form states, and Calendly interview scheduling perfectly without backend complexity."*

---

## 5. Pass / Revise Criteria Checklist

- [x] **Three Genuine Options Evaluated**: Option 1 (Static HTML), Option 2 (Next.js SSG), and Option 3 (Full-Stack PostgreSQL) analyzed with real trade-offs.
- [x] **Chosen Stack Matches Real Needs**: Option 2 is free ($0), matches my skill set, and displays React/Vitest work natively.
- [x] **Rationale in Own Words**: Explicitly addresses "Can I maintain this?" and "Does it show my work well."
- [x] **Honest Backend Answer**: Correctly identified "not yet needed" to prevent build week scope creep.
