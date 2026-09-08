'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Scale, Dumbbell, Wind, MoreHorizontal } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/',        label: 'Home',    icon: Home },
  { href: '/weight',  label: 'Weight',  icon: Scale },
  { href: '/workout', label: 'Workout', icon: Dumbbell },
  { href: '/run',     label: 'Run',     icon: Wind },
  { href: '/more',    label: 'More',    icon: MoreHorizontal },
] as const;

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'rgba(11, 15, 26, 0.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(148,163,184,0.07)',
        display: 'flex',
        alignItems: 'stretch',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        height: 'var(--nav-height)',
      }}
    >
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            id={`nav-${label.toLowerCase()}`}
            aria-label={label}
            aria-current={isActive ? 'page' : undefined}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
              textDecoration: 'none',
              minHeight: '48px',
              position: 'relative',
              transition: 'opacity 0.15s ease',
            }}
          >
            {/* Active pill indicator */}
            {isActive && (
              <span style={{
                position: 'absolute',
                top: 8,
                width: 20,
                height: 3,
                borderRadius: '2px',
                background: 'var(--gradient-brand)',
                boxShadow: '0 0 8px rgba(129,140,248,0.6)',
              }} />
            )}

            <Icon
              size={20}
              strokeWidth={isActive ? 2 : 1.5}
              style={{
                color: isActive ? 'var(--accent-primary)' : 'var(--fg-muted)',
                transition: 'color 0.2s ease',
                marginTop: isActive ? '4px' : '0',
                filter: isActive ? 'drop-shadow(0 0 5px rgba(129,140,248,0.5))' : 'none',
              }}
            />
            <span style={{
              fontSize: '10px',
              fontWeight: isActive ? 600 : 400,
              color: isActive ? 'var(--accent-primary)' : 'var(--fg-muted)',
              letterSpacing: '0.03em',
              transition: 'color 0.2s ease',
            }}>
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
