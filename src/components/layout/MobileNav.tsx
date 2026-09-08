'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Scale, Dumbbell, Wind, MoreHorizontal } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/',      label: 'Home',  icon: Home },
  { href: '/meals', label: 'Meals', icon: MoreHorizontal },
] as const;

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      style={{
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        zIndex: 50,
        height: 'var(--nav-height)',
        background: '#000000',
        borderTop: '1px solid #1a1a1a',
        display: 'flex',
        alignItems: 'stretch',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
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
              transition: 'opacity 0.15s',
            }}
          >
            {/* Active top line — Study OS style */}
            {isActive && (
              <span style={{
                position: 'absolute',
                top: 0,
                width: 24,
                height: 1,
                background: '#ededed',
                borderRadius: '0 0 2px 2px',
              }} />
            )}

            <Icon
              size={19}
              strokeWidth={isActive ? 2 : 1.5}
              style={{ color: isActive ? '#ededed' : '#52525b', transition: 'color 0.15s' }}
            />
            <span style={{
              fontSize: '10px',
              fontWeight: isActive ? 600 : 400,
              color: isActive ? '#ededed' : '#52525b',
              letterSpacing: '0.02em',
              transition: 'color 0.15s',
            }}>
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
