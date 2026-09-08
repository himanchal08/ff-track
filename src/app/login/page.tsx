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
      background: 'var(--bg-base)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 20px',
      /* Ambient glow from the top */
      backgroundImage: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(129,140,248,0.1) 0%, transparent 60%)',
    }}>

      {/* Decorative blurred orbs */}
      <div style={{
        position: 'fixed', top: '10%', left: '5%',
        width: '280px', height: '280px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(129,140,248,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed', bottom: '15%', right: '5%',
        width: '220px', height: '220px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ width: '100%', maxWidth: '360px', position: 'relative' }}>

        {/* ── Brand ── */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          {/* Icon row */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '18px' }}>
            {[
              { Icon: Scale,    color: 'var(--accent-primary)', bg: 'var(--accent-primary-dim)',  border: 'var(--accent-primary-border)' },
              { Icon: Dumbbell, color: 'var(--accent-violet)',  bg: 'var(--accent-violet-dim)',   border: 'rgba(167,139,250,0.25)' },
              { Icon: Wind,     color: 'var(--accent-sky)',     bg: 'var(--accent-sky-dim)',      border: 'rgba(56,189,248,0.25)' },
            ].map(({ Icon, color, bg, border }, i) => (
              <div key={i} style={{
                width: 48, height: 48, borderRadius: '13px',
                background: bg, border: `1px solid ${border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 4px 16px ${bg}`,
              }}>
                <Icon size={22} color={color} strokeWidth={1.5} />
              </div>
            ))}
          </div>

          <h1 style={{
            fontSize: '26px', fontWeight: 800, margin: '0 0 6px',
            background: 'var(--gradient-brand)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            letterSpacing: '-0.02em',
          }}>
            FitTrack
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--fg-muted)', margin: 0 }}>
            Your personal fitness dashboard
          </p>
        </div>

        {/* ── Card ── */}
        <div className="glass-card-elevated" style={{ padding: '28px 22px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--fg-primary)', margin: '0 0 22px' }}>
            Sign in
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

            {/* Email */}
            <div>
              <label htmlFor="login-email" style={{
                display: 'block', fontSize: '12px', fontWeight: 600,
                color: 'var(--fg-secondary)', marginBottom: '7px',
                textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>
                Email
              </label>
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
                display: 'block', fontSize: '12px', fontWeight: 600,
                color: 'var(--fg-secondary)', marginBottom: '7px',
                textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>
                Password
              </label>
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
                padding: '10px 13px', borderRadius: '8px',
                background: 'var(--accent-rose-dim)', border: '1px solid rgba(251,113,133,0.25)',
                fontSize: '13px', color: 'var(--accent-rose)',
              }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              id="login-submit-btn" type="submit" disabled={loading}
              className="btn-primary"
              style={{
                width: '100%', padding: '0 20px',
                background: loading ? 'var(--bg-elevated)' : undefined,
                color: loading ? 'var(--fg-muted)' : 'white',
                marginTop: '6px',
              }}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        <p style={{
          textAlign: 'center', fontSize: '11px', color: 'var(--fg-muted)',
          marginTop: '20px',
        }}>
          Personal fitness tracker — private by design
        </p>
      </div>
    </div>
  );
}
