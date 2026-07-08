<div align="center">

# ✨ Capstone Web Application

### *A Premium Frontend Showcase for Modern Web Development*

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat&logo=react&logoColor=61DAFB)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=flat&logo=vite&logoColor=white)](https://vite.dev)
[![Conventional Commits](https://img.shields.io/badge/Commits-Conventional-FE5196?style=flat&logo=git&logoColor=white)](https://conventionalcommits.org)

<p align="center">
  A state-of-the-art frontend application designed to exhibit advanced software engineering principles, rich aesthetics, strict static typing, and automated quality assurance.
</p>

---

[Tech Stack](#-tech-stack) • [Key Features](#-key-features) • [Getting Started](#-getting-started) • [Project Architecture](#-project-architecture) • [Conventions](#-development-conventions)

</div>

---

## 🚀 Project Vision

This capstone project is engineered with an emphasis on **visual excellence** and **robust architecture**. It goes beyond simple UI components to create a highly responsive, animated, and structured user experience. 

> [!NOTE]
> This repository is fully pre-configured for automated code formatting, linting checks, and seamless developer onboarding.

---

## 🛠️ Tech Stack

Our stack is carefully curated to deliver the best performance, type safety, and development velocity:

* **Core Framework**: React 18 with TypeScript for complete type safety and component-driven architecture.
* **Build System**: Vite for rapid Hot Module Replacement (HMR) and optimized production bundles.
* **Styling & Theme**: Vanilla CSS utilizing custom design tokens (CSS variables) to support high-fidelity styling (e.g. glassmorphism, responsive grid layouts, and active interactive state animations).
* **Code Quality**: ESLint for static analysis and Prettier for automatic formatting.
* **Guidelines**: [CLAUDE.md](file:///c:/Users/REDDY/Desktop/AKSHITH REDDY/internship/1st assingnment/CLAUDE.md) for strict coding style rules and Git commit guidelines.

---

## ✨ Key Features

* 📱 **Mobile-First Responsive Layout**: Adapts gracefully across ultra-wide monitors, tablets, and mobile screens.
* 🎨 **Rich Modern Aesthetics**: Features custom-tailored dark modes, smooth gradients, subtle micro-interactions, and glassmorphic card overlays.
* 🔒 **Type-Safe Componentry**: 100% typed props and state interfaces, eliminating common runtime errors.
* 📦 **Modular Architecture**: Strict separation between presentation logic, services, utilities, and styling components.

---

## 📁 Project Architecture

The workspace is organized to promote modularity and clean separation of concerns:

```text
├── public/                 # Static assets (icons, brand marks)
├── src/
│   ├── assets/             # Global styles, fonts, and base variables
│   ├── components/         # Reusable presentation components
│   ├── layouts/            # Page shell layouts (Header, Footer, Sidebar)
│   ├── pages/              # Routed pages and entry view states
│   ├── services/           # API request layer and external integrations
│   ├── utils/              # Pure utility functions and helpers
│   ├── App.tsx             # Root component with routing
│   └── main.tsx            # Application entrypoint
├── CLAUDE.md               # AI guidelines & project conventions
├── LICENSE                 # MIT License details
└── README.md               # Project documentation (this file)
```

---

## 💻 Getting Started

Follow these steps to set up a local development environment:

### Prerequisites
- **Node.js**: Version `18.x` or higher (LTS recommended).
- **npm**: Version `10.x` or higher.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/capstone-repo.git
   cd capstone-repo
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
To launch the Vite development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### Production Build
To compile and package the application for production deployment:
```bash
npm run build
```
The output files will be generated in the `/dist` directory.

---

## 📈 Development Conventions

We enforce professional standards across all changes:
* **Commit Style**: All commits must follow the **Conventional Commits 1.0.0** specification (e.g. `feat(auth): add login form validation`). Detailed rules are in [CLAUDE.md](file:///c:/Users/REDDY/Desktop/AKSHITH REDDY/internship/1st assingnment/CLAUDE.md).
* **Formatting**: Ensure your code is formatted before committing by running `npm run format`.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](file:///c:/Users/REDDY/Desktop/AKSHITH REDDY/internship/1st assingnment/LICENSE) file for details.
