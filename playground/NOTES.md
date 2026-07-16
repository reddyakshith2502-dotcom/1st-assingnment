# Comparison Notes: Custom ARIA Components vs. shadcn/ui

This document compares the manual implementations of accessible components (Modal, Tabs, Disclosure) against shadcn/ui components (which wrap `@base-ui/react` primitives).

---

## Custom Implementation Summary
- **Modal Dialog**: Implements `role="dialog"`, `aria-modal="true"`, custom keyboard focus trap (loops focus inside the dialog using `Tab` and `Shift+Tab`), `Escape` key close capability, and restores focus back to the triggering element.
- **Tabs**: Implements `role="tablist"`, `role="tab"`, and `role="tabpanel"`. Restricts tab focus (`tabIndex`) to the active tab, supporting arrow key navigation (`ArrowLeft`/`ArrowRight`), `Home`, and `End` keys.
- **Disclosure**: Implements basic accordion expansion utilizing linked `aria-expanded` and `aria-controls` bindings.

---

## Gaps Handled by shadcn/ui (Base UI / Radix)

Here are the concrete gaps handled by shadcn/ui that our custom implementation lacked or simplified:

### 1. Portal-Based Rendering
- **Our Custom Version**: Renders inline directly within the parent component's DOM tree. This makes it susceptible to being clipped by elements with `overflow: hidden`, or layout breaks due to parent styling and `z-index` stacking context limitations.
- **shadcn/ui**: Utilizes a `DialogPortal` which teleports the modal container to the root of the document body (`document.body`). This guarantees that it stays on the topmost layer of the application regardless of where it is declared in the code.

### 2. Scroll Locking & Layout Shift Prevention
- **Our Custom Version**: Locks page scrolling simply by setting `document.body.style.overflow = 'hidden'`. This works but causes a noticeable "layout shift" on desktops because the scrollbar disappears and the content shifts to fill the gap.
- **shadcn/ui**: Radix/Base UI implements a robust scroll lock that adds a dynamic padding-right offset (matching the scrollbar width) to the document body on open. This locks scroll interaction while maintaining absolute alignment stability for layout elements.

### 3. Stacking Context & Interaction Locking
- **Our Custom Version**: Clicking the background backdrop works, but it does not prevent keyboard or mouse interactions with background page elements that are not focus-trapped (e.g. background pointer events or tab indexes outside the dialog).
- **shadcn/ui**: Radix/Base UI disables pointer events on all elements outside the dialog container by setting `pointer-events: none` on the document body and setting `aria-hidden="true"` on the rest of the application body. This blocks any page interactions while the dialog is active.

### 4. Tab Orientation & Dynamic Focus
- **Our Custom Version**: Supports only horizontal keyboard navigation (`ArrowLeft` and `ArrowRight`).
- **shadcn/ui**: Supports vertical (`ArrowUp` / `ArrowDown`) or horizontal orientation out-of-the-box, detecting orientation context (`data-orientation`) dynamically.
