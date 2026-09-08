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
    <div className="glass-card accent-amber animate-fade-slide-up animate-stagger-5" style={{ padding: '16px', marginBottom: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="icon-pill" style={{ width: 30, height: 30, background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.2)' }}>
            <Utensils size={14} color="#f59e0b" strokeWidth={1.5} />
          </div>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Today&apos;s Meals</span>
        </div>
        <Link id="meals-preview-view-btn" href="/meals" style={{ fontSize: '12px', color: '#52525b', textDecoration: 'none', fontWeight: 500 }}>
          Full plan →
        </Link>
      </div>
      {!hasSelection ? (
        <EmptyRow label="Pick today's options" action="View meals" href="/meals" id="meals-preview-pick-btn" color="#f59e0b" bg="rgba(245,158,11,0.12)" border="rgba(245,158,11,0.25)" />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {breakfastOption && <MealRow label="Breakfast" value={breakfastOption} />}
          {lunchRotation   && <MealRow label="Lunch"     value={lunchRotation} />}
          {soakCount !== undefined && soakCount > 0 && (
            <div style={{ marginTop: '6px', padding: '6px 10px', borderRadius: '6px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', fontSize: '12px', color: '#fbbf24', fontWeight: 500 }}>
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
      <span style={{ fontSize: '10px', color: '#52525b', minWidth: '56px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
      <span style={{ fontSize: '13px', color: '#a1a1aa' }}>{value}</span>
    </div>
  );
}
