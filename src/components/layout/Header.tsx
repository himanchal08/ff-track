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
      background: '#000000',
      borderBottom: '1px solid #1a1a1a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      paddingTop: 'env(safe-area-inset-top, 0px)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Logo icon — Study OS style */}
        <div style={{
          width: 28, height: 28,
          borderRadius: '8px',
          background: '#111111',
          border: '1px solid #262626',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ededed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>
        <div>
          <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#ededed', lineHeight: 1.2 }}>
            {title}
          </p>
          {subtitle && (
            <p style={{ margin: 0, fontSize: '10px', color: '#52525b', lineHeight: 1, marginTop: '1px' }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <button
        id="header-notifications-btn"
        aria-label="Notifications"
        style={{
          width: 32, height: 32,
          borderRadius: '8px',
          background: '#111111',
          border: '1px solid #262626',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          transition: 'border-color 0.15s',
          flexShrink: 0,
        }}
      >
        <Bell size={14} color="#71717a" strokeWidth={1.5} />
      </button>
    </header>
  );
}
