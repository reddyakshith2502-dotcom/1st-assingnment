import type { Metadata } from 'next';
import './globals.css';
import Navbar from './Navbar';

export const metadata: Metadata = {
  title: 'Capstone Portal - Foundations',
  description: 'A premium frontend showcase settings app scaffolded with Next.js and Tailwind CSS.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col font-sans bg-bg text-text antialiased">
        {/* Decorative glowing background glow for dark mode */}
        <div className="glowing-bg" />

        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col relative z-10">
          <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-bg/50 py-6 text-center text-xs text-text/60 relative z-10">
          <div className="mx-auto max-w-7xl px-6">
            <p>&copy; {new Date().getFullYear()} Capstone Portal. Built with Next.js, TypeScript, & Tailwind CSS.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
