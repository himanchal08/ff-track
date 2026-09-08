import { Shell } from '@/components/layout/Shell';
import Link from 'next/link';
import { Camera, BarChart2, Utensils } from 'lucide-react';

const MORE_ITEMS = [
  { href: '/progress', label: 'Progress Dashboard', description: 'Week / Month / Quarter / Year', icon: BarChart2, color: '#a855f7', bg: 'rgba(168,85,247,0.12)' },
  { href: '/body', label: 'Body Progress', description: 'Measurements & photos', icon: Camera, color: 'var(--accent-secondary)', bg: 'var(--accent-secondary-dim)' },
  { href: '/meals', label: 'Meals & Soak', description: "Today's meal plan & soak reminder", icon: Utensils, color: '#fb923c', bg: 'rgba(251,146,60,0.12)' },
] as const;

export default function MorePage() {
  return (
    <Shell title="More">
      <div style={{ paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {MORE_ITEMS.map(({ href, label, description, icon: Icon, color, bg }) => (
          <Link
            key={href}
            href={href}
            id={`more-item-${href.replace('/', '')}`}
            style={{ textDecoration: 'none' }}
          >
            <div
              className="glass-card"
              style={{
                padding: '18px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                transition: 'all 0.2s ease',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '12px',
                  background: bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon size={20} color={color} strokeWidth={1.5} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: 'var(--fg-primary)' }}>
                  {label}
                </p>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--fg-muted)', marginTop: '2px' }}>
                  {description}
                </p>
              </div>
              <span style={{ marginLeft: 'auto', color: 'var(--fg-muted)', fontSize: '18px' }}>›</span>
            </div>
          </Link>
        ))}
      </div>
    </Shell>
  );
}
