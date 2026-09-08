'use client';

import { Bell } from 'lucide-react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({ title = 'FitTrack', subtitle }: HeaderProps) {
  return (
    <header style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      height: 'var(--header-height)',
      zIndex: 40,
      background: 'rgba(11, 15, 26, 0.88)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(148,163,184,0.07)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 18px',
      paddingTop: 'env(safe-area-inset-top, 0px)',
    }}>
      <div>
        <p style={{
          margin: 0,
          fontSize: subtitle ? '17px' : '18px',
          fontWeight: 700,
          background: 'var(--gradient-brand)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1.25,
        }}>
          {title}
        </p>
        {subtitle && (
          <p style={{
            margin: 0,
            fontSize: '11px',
            color: 'var(--fg-muted)',
            lineHeight: 1,
            marginTop: '1px',
            letterSpacing: '0.02em',
          }}>
            {subtitle}
          </p>
        )}
      </div>

      <button
        id="header-notifications-btn"
        aria-label="Notifications"
        style={{
          width: 36,
          height: 36,
          borderRadius: '10px',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          flexShrink: 0,
        }}
      >
        <Bell size={16} color="var(--fg-secondary)" strokeWidth={1.5} />
      </button>
    </header>
  );
}
