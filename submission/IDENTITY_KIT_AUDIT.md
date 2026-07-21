# Week 03 Deliverable: Developer Portfolio Identity Kit ("Identity Kit")

**Deliverable**: Typography System, Tight Color Palette (Hex Codes), Logo / Monogram SVG, & Two-Line Style Note for Claude Project  
**Author**: Akshith Reddy (`reddyakshith2502@gmail.com`)  
**Repository**: `1st-assingnment`  

---

## 1. Typography Selection (2 Fonts Max)

| Role | Font Family | Weights Used | Purpose & Justification |
| :--- | :--- | :--- | :--- |
| **Headings & Titles** | `Inter` (Google Fonts) | `700` (Bold), `600` (SemiBold) | Clean, geometric, high-legibility sans-serif for strong, confident headers. |
| **Body & Code Blocks** | `JetBrains Mono` | `400` (Regular), `500` (Medium) | Technical monospaced font designed for code diffs, Vitest test outputs, and readable body copy. |

---

## 2. Color Palette (Strict 4 Colors with Hex Codes)

```text
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   Background     │  │   Primary Text   │  │   Muted Text     │  │  Primary Accent  │
│     #0f172a      │  │     #f8fafc      │  │     #94a3b8      │  │     #6366f1      │
│  (Deep Slate)    │  │   (Near-White)   │  │  (Silver Grey)   │  │ (Indigo Accent)  │
└──────────────────┘  └──────────────────┘  └──────────────────┘  └──────────────────┘
```

| Token Name | Hex Code | Role in Interface | Mood & Contrast |
| :--- | :--- | :--- | :--- |
| `--color-bg` | `#0f172a` | Deep Slate Dark Mode Background | Provides a calm, low-distraction dark backdrop so code proof stands out. |
| `--color-text` | `#f8fafc` | Primary Headings & Body Copy | Crisp near-white for high legibility and contrast against dark slate. |
| `--color-muted` | `#94a3b8` | Subtitles, Borders & Metadata | Muted silver-grey for secondary details, preventing visual clutter. |
| `--color-accent` | `#6366f1` | Active CTAs, Focus Rings & Badges | Calm indigo accent that highlights key actions without competing with the work. |

---

## 3. Logo & Monogram Design

- **Developer Monogram**: `[ AR ]` — A clean, minimal developer badge set in **Inter Bold** with a calm indigo status dot (`#6366f1`).
- **Vector Favicon**: Saved at `public/favicon.svg` with high-contrast slate background and indigo border accent.

```xml
<!-- SVG Monogram Logo (public/favicon.svg) -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect width="100" height="100" rx="20" fill="#0f172a"/>
  <rect x="2" y="2" width="96" height="96" rx="18" fill="none" stroke="#6366f1" stroke-width="3" stroke-opacity="0.4"/>
  <text x="50" y="62" font-family="Inter, sans-serif" font-weight="800" font-size="36" fill="#f8fafc" text-anchor="middle">AR</text>
  <circle cx="75" cy="30" r="5" fill="#6366f1"/>
</svg>
```

---

## 4. Two-Line Style Note (Standing Instruction for Claude Project)

> **Line 1 (Tokens)**: *"Typography: Inter (Headings, 700/600) + JetBrains Mono (Body & Code, 400). Palette: Background #0f172a, Text #f8fafc, Muted #94a3b8, Accent #6366f1."*  
> **Line 2 (Mood)**: *"Mood: Dark-mode engineering terminal—sleek, high-contrast, technical, zero clutter, where code proof and test results are the loudest elements on the page."*

- **Added to Claude Project**: Loaded into `8-Week Portfolio Build & AI Tutor` standing custom instructions.

---

## 5. Pass / Revise Criteria Checklist

- [x] **1 or 2 Fonts Only**: Strict 2-font system (`Inter` for headings + `JetBrains Mono` for body & code).
- [x] **Tight Palette (4 Colors)**: Exactly 4 colors with explicit hex codes (`#0f172a`, `#f8fafc`, `#94a3b8`, `#6366f1`).
- [x] **Simple Logo / Favicon**: Minimalist `[ AR ]` SVG monogram saved to `public/favicon.svg`.
- [x] **Coherent Mood**: Two-line style note describes an intentional dark-mode engineering theme that frames the work rather than competing with it.
