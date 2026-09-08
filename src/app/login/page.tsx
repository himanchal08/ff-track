'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Scale, Dumbbell, Wind } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push('/');
    router.refresh();
  }

  return (
    <div style={{
      minHeight: '100dvh',
      background: '#000000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 20px',
    }}>
      <div style={{ width: '100%', maxWidth: '340px' }}>

        {/* ── Brand ── */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          {/* Logo icon */}
          <div style={{
            width: 44, height: 44,
            borderRadius: '12px',
            background: '#111111',
            border: '1px solid #262626',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ededed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>

          <h1 style={{
            fontSize: '20px', fontWeight: 700, margin: '0 0 5px',
            color: '#ededed', letterSpacing: '-0.01em',
          }}>
            FitTrack
          </h1>
          <p style={{ fontSize: '13px', color: '#52525b', margin: 0 }}>
            Personal fitness dashboard
          </p>
        </div>

        {/* ── Features row ── */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '28px' }}>
          {[
            { Icon: Scale,    label: 'Weight',  color: '#818cf8', bg: 'rgba(99,102,241,0.12)',   border: 'rgba(99,102,241,0.2)' },
            { Icon: Dumbbell, label: 'Workout', color: '#a78bfa', bg: 'rgba(139,92,246,0.12)',   border: 'rgba(139,92,246,0.2)' },
            { Icon: Wind,     label: 'Run',     color: '#38bdf8', bg: 'rgba(14,165,233,0.12)',   border: 'rgba(14,165,233,0.2)' },
          ].map(({ Icon, label, color, bg, border }) => (
            <div key={label} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px',
              padding: '10px 14px',
              background: bg, border: `1px solid ${border}`,
              borderRadius: '10px', minWidth: '72px',
            }}>
              <Icon size={16} color={color} strokeWidth={1.5} />
              <span style={{ fontSize: '10px', color: '#71717a', fontWeight: 500 }}>{label}</span>
            </div>
          ))}
        </div>

        {/* ── Card ── */}
        <div style={{
          background: '#0a0a0a',
          border: '1px solid #262626',
          borderRadius: '12px',
          padding: '24px 20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#ededed', margin: '0 0 20px' }}>
            Sign in
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Email */}
            <div>
              <label htmlFor="login-email" style={{
                display: 'block', fontSize: '10px', fontWeight: 600,
                color: '#71717a', marginBottom: '6px',
                textTransform: 'uppercase', letterSpacing: '0.08em',
              }}>Email</label>
              <input
                id="login-email" type="email" autoComplete="email" required
                className="input-field"
                value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="login-password" style={{
                display: 'block', fontSize: '10px', fontWeight: 600,
                color: '#71717a', marginBottom: '6px',
                textTransform: 'uppercase', letterSpacing: '0.08em',
              }}>Password</label>
              <input
                id="login-password" type="password" autoComplete="current-password" required
                className="input-field"
                value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            {/* Error */}
            {error && (
              <div role="alert" style={{
                padding: '9px 12px', borderRadius: '8px',
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                fontSize: '13px', color: '#f87171',
              }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              id="login-submit-btn" type="submit" disabled={loading}
              className="btn-premium"
              style={{
                width: '100%', marginTop: '4px',
                background: loading ? '#1a1a1a' : '#ededed',
                color: loading ? '#52525b' : '#0a0a0a',
              }}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', fontSize: '11px', color: '#3f3f46', marginTop: '20px' }}>
          Private by design · Single account
        </p>
      </div>
    </div>
  );
}
