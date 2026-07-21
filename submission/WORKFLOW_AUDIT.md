# Phase: Setup — AI Workflow Audit & System Configuration

**Deliverable**: 1 to 2 Page Workflow Audit, Claude Project Setup Evidence, Target Tasks & Success Definitions  
**Author**: Akshith Reddy (`reddyakshith2502@gmail.com`)  
**Repository**: `1st-assingnment`  

---

## 1. AI Toolkit & Academy Enrollment Verification

| Tool / Platform | Account Status | Setup Details & Course Enrollment |
| :--- | :--- | :--- |
| **Claude (Anthropic)** | ✅ Active (Free Tier) | Configured Claude Account & Custom Projects Workspace |
| **ChatGPT (OpenAI)** | ✅ Active (Free Tier) | Enabled Custom Instructions & GPT-4o access |
| **Anthropic Academy** | ✅ Verified | Enrolled in *AI Fluency: Framework & Foundations* |
| **Course Module** | ✅ Module 1 Completed | Completed Module 1: *Foundations of AI Collaboration & Task Allocation Framework* |

---

## 2. Configured Claude Project Setup

### Project Profile: `Frontend Engineering & AI Fluency`
- **User Profile**: Akshith Reddy — Frontend Developer Intern specializing in React 19, Next.js (App Router), TypeScript, and Web Accessibility (a11y).
- **Tone Preferences**: Concise, highly technical, direct, code-first, and pragmatic. Avoid conversational intro/outro fluff, generic explanations, or unsubstantiated assumptions.
- **Current Goals**: Master AI workflow fluency, build production-grade WCAG-compliant UI components, automate repetitive testing & linting tasks, and establish strict verification loops.
- **Project Knowledge Base**: Pre-loaded with `CLAUDE.md`, `WORKFLOW.md`, and project design guidelines.

![Claude Project Configuration](file:///c:/Users/REDDY/Desktop/AKSHITH%20REDDY/internship/1st%20assingnment/public/claude_project_screenshot.png)

---

## 3. Weekly Workflow Audit (12 Recurring Tasks)

The following classification is based on Ethan Mollick's task-allocation framework (*Onboarding Your AI Intern*).

| # | Recurring Task | Classification | Rationale (One Line) |
| :-: | :--- | :--- | :--- |
| 1 | **Writing Vitest unit test suites for React components** | Delegate to AI with review | AI generates boilerplate test cases rapidly, but requires manual validation to ensure edge-case correctness and clean execution. |
| 2 | **Scaffolding dev environments (Next.js, Tailwind, ESLint)** | Collaborate with AI | AI accelerates project initialization, while I maintain control over dependencies, version compatibility, and architectural constraints. |
| 3 | **Implementing ARIA attributes & keyboard focus traps** | Collaborate with AI | Web accessibility requires human design of the focus flow, while AI helps implement event listeners and precise ARIA state bindings. |
| 4 | **Peer Code Reviews (Logic, Security, Architecture)** | **Just me** | Code safety, domain context, and security decisions require accountable human judgment that cannot be outsourced. |
| 5 | **Synthesizing third-party library documentation (Radix/shadcn)** | Collaborate with AI | Extracting specific component API props via AI speeds up comprehension, but requires manual validation against live docs. |
| 6 | **Styling components with vanilla CSS & design tokens** | Delegate to AI with review | CSS layout generation is highly mechanical, leaving me to review and polish micro-interactions, responsive breakpoints, and glassmorphism. |
| 7 | **Resolving package dependency & peer version conflicts** | Collaborate with AI | AI quickly identifies conflicting version constraints, while I evaluate patch strategies and test build stability. |
| 8 | **Structuring daily standup notes & sprint progress logs** | Delegate to AI with review | Converting raw daily activity notes into structured bullet points saves formatting time after quick factual accuracy review. |
| 9 | **Architecting core database schemas & API contracts** | **Just me** | Data modeling and API design dictate the fundamental system architecture, trade-offs, and long-term maintainability. |
| 10 | **Formatting & pre-commit code linting scripts** | Fully automate | Git pre-commit hooks running `oxlint` and Prettier eliminate manual execution and catch syntax errors automatically. |
| 11 | **Drafting Git commit messages (Conventional Commits)** | Delegate to AI with review | AI summarizes staged diffs into Conventional Commit format, requiring quick manual verification for proper scope and type. |
| 12 | **Triaging and categorizing incoming GitHub issues** | Collaborate with AI | AI aids in scanning and summarizing user reports, but assigning priority and root cause identification requires human engineering insight. |

---

## 4. Three Target Audit Tasks & Success Definitions

These three tasks will be reused and expanded across **FL-02** (Prompting & Context), **FL-03** (AI Delegation & Review), and **FL-04** (Systemic Automation).

### 🎯 Task 1: Writing Unit Tests for Complex React Form Validation & Dynamic ARIA States (FL-02 Focus)
- **Task Description**: Building Vitest unit test suites covering client-side form validation (e.g. password strength regex, matching password confirmation), dynamic character counters, conditional control states, and timing (simulated API delay & auto-dismissing toasts).
- **Definition of "Done Well" (Measurable Success)**:
  1. **100% Edge-Case Coverage**: Tests verify all valid/invalid regex inputs, disabled state during loading (`disabled={isLoading}`), conditional dropdown disabling, and dynamic error clearing on-change.
  2. **Timing Accuracy**: Timers (`vi.useFakeTimers()`) correctly validate 1s API delay and 4s toast dismissal without hanging or race conditions.
  3. **Accessibility Verification**: Tests explicitly assert `aria-invalid="true"`, `aria-describedby` error linkages, `role="status"`, and `aria-live="polite"` attributes.
  4. **Performance & Cleanliness**: Test suite completes execution in under 500ms with zero console warnings or type casting hacks.

---

### 🎯 Task 2: Scaffolding & Refactoring Accessible UI Components with Keyboard Focus Traps (FL-03 Focus)
- **Task Description**: Designing and implementing accessible Modal Dialogs, Tabs, and Disclosures with manual focus traps, keyboard navigation (`Tab`, `Shift+Tab`, `Escape`, `Arrow` keys), and ARIA bindings without layout shifts.
- **Definition of "Done Well" (Measurable Success)**:
  1. **WCAG 2.1 AA Compliance**: Complete keyboard accessibility where Modal locks focus inside the dialog, `Escape` closes it, and focus returns to the triggering element on close.
  2. **Zero Layout Shifts**: Page scroll-locking handles scrollbar offsets cleanly without content jump or background pointer interactions.
  3. **Clean Component Architecture**: Modular TypeScript implementation with strict prop interfaces, zero `any` types, and proper fallback defaults.
  4. **Verification Proof**: Comparative audit document documenting custom implementation vs standard library primitives (e.g. `@base-ui/react` / `shadcn/ui`).

---

### 🎯 Task 3: Automated Pre-commit Formatting, Linting, & Conventional Commits Workflow (FL-04 Focus)
- **Task Description**: Setting up an automated Git hook pipeline (`Husky` / `lint-staged` / `oxlint`) that automatically formats modified code, lints for errors, and verifies commit message formatting prior to git push.
- **Definition of "Done Well" (Measurable Success)**:
  1. **Speed & Efficiency**: Pre-commit checks complete in `<2 seconds` on staged files only, avoiding developer workflow interruption.
  2. **Strict Quality Gates**: Commits automatically fail if lint errors, type mismatches, or invalid commit headers (violating Conventional Commits specification) are detected.
  3. **Automation Reliability**: 100% deterministic pre-commit execution across all developer local environments without manual intervention.
