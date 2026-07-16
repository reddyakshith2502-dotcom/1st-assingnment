# CLAUDE.md - Development & Environment Guidelines

This file serves as the system rules and reference manual for all development tasks, environment setup, and coding conventions in this capstone repository.

---

## 🛠️ Stack & Technologies

- **Runtime**: Node.js (LTS version >= 18.0)
- **PackageManager**: `npm`
- **Build Tool**: Vite (Next-generation frontend tooling)
- **Framework**: React.js with TypeScript (`strict: true`)
- **Styling**: Vanilla CSS (Custom properties, CSS Grid/Flexbox, mobile-first responsive design, modern UI details like glassmorphism and subtle animations)
- **Linting & Formatting**: ESLint + Prettier

---

## 💻 Common Development Commands

Use the following commands during development:

| Purpose | Command | Description |
| :--- | :--- | :--- |
| **Install Dependencies** | `npm install` | Installs project dependencies |
| **Start Dev Server** | `npm run dev` | Launches the local development server (Vite) |
| **Build for Production** | `npm run build` | Compiles and builds production-ready bundles |
| **Preview Build** | `npm run preview` | Runs the locally built production files |
| **Lint Code** | `npm run lint` | Inspects code for syntax errors and style deviations |
| **Format Code** | `npm run format` | Automatically formats files using Prettier |
| **Run Unit Tests** | `npm run test` | Executes unit tests with Vitest |

---

## 📁 Repository Structure

All source code resides inside the `/src` folder, organized logically as follows:

```text
├── public/                # Static assets (images, icons, robots.txt)
├── src/
│   ├── assets/            # Project-wide styles, icons, and fonts
│   ├── components/        # Reusable, atomic UI components (Button, Input, Card)
│   ├── hooks/             # Custom React hooks (useAuth, useFetch)
│   ├── layouts/           # Page layouts (Navbar, Footer, DashboardLayout)
│   ├── pages/             # Page views mapped to routing (Home, Login, Dashboard)
│   ├── services/          # API services, SDKs, and state managers
│   ├── utils/             # Helper utilities and formatting functions
│   ├── App.tsx            # Main Application entry point
│   ├── main.tsx           # React DOM bootstrapping
│   └── vite-env.d.ts      # TypeScript declarations
├── CLAUDE.md              # AI guidelines and project stack details (this file)
├── LICENSE                # MIT License
├── README.md              # Project documentation
├── package.json           # Node project configuration
└── tsconfig.json          # TypeScript configurations
```

---

## 🎨 Code Style & Design Tokens

### TypeScript & React Guidelines
- **Component Definition**: Use functional components with explicit return type `React.FC` or standard typed functions.
- **Strict Typing**: Avoid using `any`. Always define explicit interfaces or types for props, state, and API models.
- **Component File Structure**: Group component, styles, and test files in a folder if complex:
  - `MyComponent/index.tsx`
  - `MyComponent/MyComponent.css`
  - `MyComponent/MyComponent.test.tsx`

### 📝 Form Design & Accessibility Rules
- **Submission Loading States**: All form fields (inputs, buttons, textareas, checkboxes) MUST be disabled while submission loading is true to prevent duplicate submissions and user input race conditions.
- **Dynamic Validation UX**: Validate all fields on form submission. However, once a field error is active, individual field validation MUST run on-change (`onChange`) and clear the error immediately when the field value becomes valid, rather than waiting for another submit attempt.
- **A11y Compliance for Forms & Alerts**:
  - Input fields with active validation errors MUST set `aria-invalid="true"` and define `aria-describedby` pointing to the error element's `id`.
  - All form controls must have a corresponding `<label>` tag linked via `htmlFor`.
  - Actionable icon buttons (like toast close buttons) MUST have an `aria-label`.
  - Success toasts or live notification alerts MUST contain `role="status"` and `aria-live="polite"` to ensure proper screen reader announcements.

### Styling & CSS Architecture
- **Vanilla CSS**: Define a unified design system in `src/assets/styles/variables.css` using custom properties:
  ```css
  :root {
    --primary: #6366f1;
    --primary-hover: #4f46e5;
    --background: #0f172a;
    --text: #f8fafc;
    --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  ```
- **Aesthetic standard**: Prioritize dark modes, glowing accents, rich gradients, and soft borders. Use `backdrop-filter: blur(...)` for glassmorphic elements. Include micro-animations (`transform: scale(1.02)`) on interaction.

---

## 📈 Git Commit Convention

This project strictly adheres to the **Conventional Commits 1.0.0** specification. Every commit message must match the following format:

```text
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Commit Types:
- `feat`: A new feature for the user
- `fix`: A bug fix for the user
- `docs`: Documentation changes only
- `style`: Formatting, semi-colons, variable naming (no functional changes)
- `refactor`: Production code change that neither fixes a bug nor adds a feature
- `perf`: Code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies (e.g. npm, webpack)
- `ci`: Changes to CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files (e.g. adding .gitignore)

### Example Commits:
- `feat(auth): implement Google OAuth integration`
- `fix(navbar): resolve mobile viewport layout shift`
- `docs(readme): update deployment instructions`
- `chore: add prettier and configure formatting rules`
