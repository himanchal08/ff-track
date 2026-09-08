'use client';

import { Bell } from 'lucide-react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({ title = 'FitTrack', subtitle }: HeaderProps) {
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--header-height)',
        zIndex: 40,
        background: 'rgba(9, 9, 15, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '20px',
        paddingRight: '16px',
        paddingTop: 'env(safe-area-inset-top, 0px)',
      }}
    >
      {/* Title */}
      <div>
        <h1
          style={{
            fontSize: subtitle ? '18px' : '20px',
            fontWeight: 700,
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            style={{
              fontSize: '12px',
              color: 'var(--fg-muted)',
              margin: 0,
              lineHeight: 1,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Actions */}
      <button
        id="header-notifications-btn"
        aria-label="Notifications"
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onMouseOver={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-primary-dim)';
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-accent)';
        }}
        onMouseOut={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-elevated)';
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-subtle)';
        }}
      >
        <Bell size={18} color="var(--fg-secondary)" strokeWidth={1.5} />
      </button>
    </header>
  );
}
