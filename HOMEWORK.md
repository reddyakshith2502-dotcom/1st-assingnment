# Homework Assignment Submission

This document outlines the prompts, AI assistance, and manual improvements for the settings form React component project.

---

## 1. The Prompts Used

### Round 1: Vague Prompt (Scaffolding & Layout)
> "Build a settings form with validation."

### Round 2: Precise Prompt (Production-Grade Specs & Verification)
> "You are a senior frontend engineer tasked with building a user settings form with validation and unit tests on the `feature/settings-precise` branch.
> 
> Please follow these exact requirements and constraints:
> 
> 1. **File Structure**:
>    - Component: `src/components/SettingsForm/index.tsx`
>    - CSS: `src/components/SettingsForm/SettingsForm.css`
>    - Unit Tests: `src/components/SettingsForm/SettingsForm.test.tsx`
> 
> 2. **Form Fields & Validation**:
>    - Full Name (required, 2-50 chars, letters/hyphens/spaces only).
>    - Email Address (required, valid format).
>    - Password (optional, min 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char).
>    - Confirm Password (required if password set, must match password).
>    - Theme Selection (options: light, dark, system. Default: system).
>    - Receive Notifications (checkbox, default true).
>    - Weekly Digest (select options: none, summary, full. Disabled if notifications are unchecked).
>    - Bio (textarea, max 200 chars, show remaining char counter).
> 
> 3. **Behavior & validation UX**:
>    - Validate on submit. Clear errors on-change once the input becomes valid.
>    - Disable all fields and submit button during the 1-second simulated API request loading.
>    - Show a success toast that auto-dismisses after 4 seconds (with manual close button).
> 
> 4. **Accessibility (a11y)**:
>    - Associate labels via `htmlFor`. Link errors to inputs using `aria-describedby` and `aria-invalid="true"`.
>    - Success toast must have `role="status"` and `aria-live="polite"`. Close button must have `aria-label`.
> 
> 5. **Unit Tests**:
>    - Write tests using Vitest and React Testing Library covering rendering, validations, digest disabling, async saving timers, and a11y."

---

## 2. How the AI Helped
- **Initial Setup**: Scaffolded the Vite and React-TS folder structure and dependencies (Vitest and JSDOM).
- **CSS Styling Structure**: Generated CSS code using the project's CSS variables, styling modern dark/light card designs.
- **Component Skeleton**: Created the state management hooks (`useState`, `useEffect`) and HTML layouts.
- **Test Scaffolding**: Generated the mock tests and fake timers (`vi.useFakeTimers()`) to test asynchronous loading.

---

## 3. Manual Improvements and Corrections Made
- **TypeScript vite.config.ts casting**: Fixed the TypeScript build failure caused by Vite and Vitest type definitions colliding in `vite.config.ts` by casting the configuration object (`as any`).
- **Bio Textarea Validation Correction**: Added the native HTML `maxLength={200}` attribute to the textarea. The AI had initially displayed a dynamic character counter but allowed users to exceed the character limit natively.
- **Input Locking**: Ensured all inputs were correctly disabled during loading states to prevent race conditions.
