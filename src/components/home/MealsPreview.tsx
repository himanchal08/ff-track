import Link from 'next/link';
import { Utensils } from 'lucide-react';
import { EmptyRow } from './WeightCard';

interface MealsPreviewProps {
  breakfastOption?: string | null;
  lunchRotation?: string | null;
  soakCount?: number;
}

export function MealsPreview({ breakfastOption, lunchRotation, soakCount }: MealsPreviewProps) {
  const hasSelection = breakfastOption || lunchRotation;

  return (
    <div className="glass-card animate-fade-slide-up animate-stagger-5" style={{ padding: '18px', marginBottom: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="icon-pill" style={{ width: 34, height: 34, background: 'var(--accent-amber-dim)', border: '1px solid rgba(251,191,36,0.2)' }}>
            <Utensils size={16} color="var(--accent-amber)" strokeWidth={1.5} />
          </div>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--fg-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Today&apos;s Meals
          </span>
        </div>
        <Link id="meals-preview-view-btn" href="/meals" style={{
          fontSize: '12px', color: 'var(--accent-primary)', textDecoration: 'none',
          fontWeight: 500, opacity: 0.8,
        }}>
          Full plan →
        </Link>
      </div>

      {!hasSelection ? (
        <EmptyRow
          label="Pick today's options" action="View meals" href="/meals"
          id="meals-preview-pick-btn"
          color="var(--accent-amber)" dimColor="var(--accent-amber-dim)" borderColor="rgba(251,191,36,0.2)"
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {breakfastOption && <MealRow label="Breakfast" value={breakfastOption} />}
          {lunchRotation   && <MealRow label="Lunch"     value={lunchRotation} />}
          {soakCount !== undefined && soakCount > 0 && (
            <div style={{
              marginTop: '6px', padding: '7px 10px', borderRadius: '7px',
              background: 'var(--accent-amber-dim)', border: '1px solid rgba(251,191,36,0.2)',
              fontSize: '12px', color: 'var(--accent-amber)', fontWeight: 500,
            }}>
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
    <div style={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
      <span style={{ fontSize: '11px', color: 'var(--fg-muted)', minWidth: '58px', fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: '13px', color: 'var(--fg-secondary)' }}>{value}</span>
    </div>
  );
}
