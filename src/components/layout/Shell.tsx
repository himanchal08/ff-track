import { Header } from './Header';
import { MobileNav } from './MobileNav';

interface ShellProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

/**
 * Shell wraps all authenticated pages.
 * - Fixed Header at top
 * - Scrollable content area (padded for header + nav)
 * - Fixed MobileNav at bottom
 */
export function Shell({ children, title, subtitle }: ShellProps) {
  return (
    <>
      <Header title={title} subtitle={subtitle} />
      <main className="page-content">
        <div
          style={{
            maxWidth: '640px',
            margin: '0 auto',
            padding: '0 16px',
          }}
        >
          {children}
        </div>
      </main>
      <MobileNav />
    </>
  );
}
