import Link from 'next/link';
import { Utensils } from 'lucide-react';

interface MealsPreviewProps {
  breakfastOption?: string | null;
  lunchRotation?: string | null;
  soakCount?: number; // number of items to soak tonight
}

export function MealsPreview({ breakfastOption, lunchRotation, soakCount }: MealsPreviewProps) {
  const hasSelection = breakfastOption || lunchRotation;

  return (
    <div
      className="glass-card animate-fade-slide-up animate-stagger-5"
      style={{ padding: '20px', marginBottom: '12px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '10px',
              background: 'rgba(251, 146, 60, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Utensils size={18} color="#fb923c" strokeWidth={1.5} />
          </div>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Today&apos;s Meals
          </span>
        </div>
        <Link
          id="meals-preview-view-btn"
          href="/meals"
          style={{ fontSize: '12px', color: 'var(--fg-muted)', textDecoration: 'none' }}
        >
          Full plan →
        </Link>
      </div>

      {!hasSelection ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '14px', color: 'var(--fg-muted)' }}>Pick today&apos;s options</span>
          <Link
            id="meals-preview-pick-btn"
            href="/meals"
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#fb923c',
              textDecoration: 'none',
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'rgba(251, 146, 60, 0.12)',
              border: '1px solid rgba(251, 146, 60, 0.3)',
              whiteSpace: 'nowrap',
            }}
          >
            View meals
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {breakfastOption && (
            <MealRow label="Breakfast" value={breakfastOption} />
          )}
          {lunchRotation && (
            <MealRow label="Lunch" value={lunchRotation} />
          )}
          {soakCount !== undefined && soakCount > 0 && (
            <div
              style={{
                marginTop: '4px',
                padding: '6px 10px',
                borderRadius: '6px',
                background: 'rgba(245, 166, 35, 0.1)',
                border: '1px solid rgba(245, 166, 35, 0.2)',
                fontSize: '12px',
                color: 'var(--accent-warning)',
                fontWeight: 500,
              }}
            >
              💧 {soakCount} item{soakCount > 1 ? 's' : ''} to soak tonight
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MealRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <span style={{ fontSize: '12px', color: 'var(--fg-muted)', minWidth: '60px' }}>{label}</span>
      <span style={{ fontSize: '13px', color: 'var(--fg-secondary)' }}>{value}</span>
    </div>
  );
}
