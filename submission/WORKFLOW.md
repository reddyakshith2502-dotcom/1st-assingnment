# Workflow Comparison: Vague vs. Precise Engineering

This report compares the workflow and deliverables of a settings form component implemented under two paradigms: a vague prompt with no instructions (Round 1) and a precise prompt with strict constraints, planning, and a verification loop (Round 2).

## 1. Correctness and Verification
- **Vague Branch (`feature/settings-vague`):** Had no password or password confirmation fields. Validation was basic, and there was no test suite to verify behavior. The UI functioned, but there was no automated proof of correctness.
- **Precise Branch (`feature/settings-precise`):** Implemented strict validation including a secure password regex (minimum 8 characters, one uppercase, one lowercase, one number, and one special character) and matching confirm passwords. Verification was automated with a Vitest suite (`SettingsForm.test.tsx`) executing 8 tests covering validation rules, field states, and timing.

## 2. Accessibility (a11y)
The difference in screen-reader friendliness is stark:
- **Vague Branch:** The error messages were printed as simple text nodes. The input elements had no associations with the errors, failing WCAG compliance.
- **Precise Branch:** Inputs dynamically update with `aria-invalid` ('true'/'false') and bind to their error elements via `aria-describedby` (e.g. `aria-describedby="email-error"`). The success toast is wrapped in `role="status"` and `aria-live="polite"` for live screen reader updates. The close button contains an explicit `aria-label="Close notification"`, preventing screen-readers from reading the raw '×' character.

## 3. Edge Cases
- **Vague Branch:** Omitted input disabling during the simulated API request. Users could edit the fields while the form was submitting, leading to data race conditions. The textarea showed character count limits but lacked the native HTML `maxLength` attribute, letting users type beyond boundaries.
- **Precise Branch:** All form controls are disabled (`disabled={isLoading}`) during submission. The "Weekly Digest" dropdown is conditionally disabled when notifications are toggled off. Textarea limits are enforced natively with `maxLength={200}`.

## 4. Review Effort & Time
- **Vague Round:** Generation was fast (30 seconds), but manual review immediately flagged 4 UX bugs and complete lack of a11y. Refactoring it to meet production standards would take 15-20 minutes of active coding.
- **Precise Round:** Spent 5 minutes drafting specifications and planning. The generated output was immediately production-grade, with passing tests. End-to-end time was cut by 50% since post-generation debugging was eliminated.

## 5. Caught AI Mistakes
1. **Omission of native constraints:** The vague AI showed a character count limit (`X/150`) but forgot to add the `maxLength` attribute to the `<textarea>`.
2. **TypeScript vite.config.ts mismatch:** The compiler threw type errors when injecting the `test` block into `defineConfig`. This required casting the config block to `any` to bypass the type definition differences.
