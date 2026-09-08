'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Scale,
  Dumbbell,
  Wind,
  MoreHorizontal,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/weight', label: 'Weight', icon: Scale },
  { href: '/workout', label: 'Workout', icon: Dumbbell },
  { href: '/run', label: 'Run', icon: Wind },
  { href: '/more', label: 'More', icon: MoreHorizontal },
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
        height: 'var(--nav-height)',
        zIndex: 50,
        background: 'rgba(9, 9, 15, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'stretch',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const isActive =
          href === '/' ? pathname === '/' : pathname.startsWith(href);

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
              gap: '4px',
              textDecoration: 'none',
              minHeight: '48px',
              transition: 'all 0.2s ease',
              position: 'relative',
            }}
          >
            {/* Active indicator dot */}
            {isActive && (
              <span
                style={{
                  position: 'absolute',
                  top: 8,
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: 'var(--accent-primary)',
                  boxShadow: '0 0 8px var(--accent-primary)',
                }}
              />
            )}

            <Icon
              size={22}
              strokeWidth={isActive ? 2 : 1.5}
              style={{
                color: isActive ? 'var(--accent-primary)' : 'var(--fg-muted)',
                transition: 'color 0.2s ease',
                filter: isActive
                  ? 'drop-shadow(0 0 6px rgba(0,245,160,0.5))'
                  : 'none',
              }}
            />
            <span
              style={{
                fontSize: '10px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--accent-primary)' : 'var(--fg-muted)',
                transition: 'color 0.2s ease',
                letterSpacing: '0.02em',
              }}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
