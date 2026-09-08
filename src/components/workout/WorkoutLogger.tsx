'use client';

import { useState, useTransition } from 'react';
import { type WorkoutPlan, type WorkoutLog, logExercise, deleteExerciseLog } from '@/lib/actions/workout';
import { Dumbbell, Plus, Trash2, Check, Award } from 'lucide-react';

interface WorkoutLoggerProps {
  plans: WorkoutPlan[];
  todayLogs: WorkoutLog[];
  dateStr: string;
}

export function WorkoutLogger({ plans, todayLogs, dateStr }: WorkoutLoggerProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<string>(plans.length > 0 ? plans[0].id : '');
  const [selectedExercise, setSelectedExercise] = useState<string>('');
  
  const [sets, setSets] = useState<string[]>(['']); // array of string inputs for reps
  const [weight, setWeight] = useState<string>('');
  
  const [isPending, startTransition] = useTransition();
  const [prMessage, setPrMessage] = useState<string | null>(null);

  const currentPlan = plans.find(p => p.id === selectedPlanId);
  const exercises = currentPlan ? currentPlan.exercises : [];

  // Default exercise selection when plan changes
  if (exercises.length > 0 && !selectedExercise && !exercises.includes(selectedExercise)) {
    setSelectedExercise(exercises[0]);
  }

  const handleAddSet = () => setSets([...sets, '']);
  
  const handleSetChange = (index: number, val: string) => {
    const newSets = [...sets];
    newSets[index] = val;
    setSets(newSets);
  };

  const handleRemoveSet = (index: number) => {
    if (sets.length === 1) return;
    const newSets = sets.filter((_, i) => i !== index);
    setSets(newSets);
  };

  const handleLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlanId || !selectedExercise || sets.every(s => !s)) return;

    const repNumbers = sets.filter(s => s.trim() !== '').map(Number);
    const weightNum = weight.trim() !== '' ? Number(weight) : null;

    startTransition(async () => {
      const { isNewPr } = await logExercise(dateStr, selectedPlanId, selectedExercise, repNumbers, weightNum);
      
      if (isNewPr) {
        setPrMessage(`New PR for ${selectedExercise}! 🏆`);
        setTimeout(() => setPrMessage(null), 4000);
      }

      // Reset form
      setSets(['']);
      setWeight('');
      
      // Auto-advance to next exercise if possible
      const currentIndex = exercises.indexOf(selectedExercise);
      if (currentIndex !== -1 && currentIndex < exercises.length - 1) {
        setSelectedExercise(exercises[currentIndex + 1]);
      }
    });
  };

  const handleDeleteLog = (id: string) => {
    if (confirm('Delete this exercise log?')) {
      startTransition(async () => {
        await deleteExerciseLog(id);
      });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Plan Selector */}
      <div>
        <label style={{ display: 'block', fontSize: '10px', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
          Workout Plan
        </label>
        <select 
          className="input-field" 
          value={selectedPlanId} 
          onChange={(e) => {
            setSelectedPlanId(e.target.value);
            setSelectedExercise('');
          }}
          style={{ appearance: 'auto', background: '#111111', fontWeight: 600 }}
        >
          {plans.map(p => (
            <option key={p.id} value={p.id}>{p.day_label}</option>
          ))}
        </select>
      </div>

      {/* Logger Form */}
      {currentPlan && (
        <div className="glass-card accent-violet" style={{ padding: '20px' }}>
          <form onSubmit={handleLog} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', marginBottom: '6px' }}>Exercise</label>
              <select 
                className="input-field" 
                value={selectedExercise} 
                onChange={(e) => setSelectedExercise(e.target.value)}
                style={{ appearance: 'auto', background: '#171717' }}
              >
                {exercises.map(ex => (
                  <option key={ex} value={ex}>{ex}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', marginBottom: '6px' }}>
                  Weight (kg) <span style={{ color: '#52525b', fontSize: '10px' }}>Optional</span>
                </label>
                <input 
                  type="number" step="0.5" min="0"
                  className="input-field" placeholder="0.0"
                  value={weight} onChange={e => setWeight(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#a1a1aa', marginBottom: '6px' }}>
                <span>Sets & Reps</span>
                <button type="button" onClick={handleAddSet} style={{ background: 'transparent', border: 'none', color: '#a78bfa', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px', cursor: 'pointer' }}>
                  <Plus size={12} /> Add Set
                </button>
              </label>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {sets.map((val, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '24px', fontSize: '11px', color: '#52525b', textAlign: 'center' }}>{idx + 1}</div>
                    <input 
                      type="number" min="0" max="100" required
                      className="input-field" placeholder="Reps"
                      value={val} onChange={e => handleSetChange(idx, e.target.value)}
                      style={{ height: '36px', padding: '0 12px' }}
                    />
                    {sets.length > 1 && (
                      <button type="button" onClick={() => handleRemoveSet(idx)} style={{ padding: '8px', background: 'transparent', border: 'none', color: '#52525b', cursor: 'pointer' }}>
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" disabled={isPending} className="btn-premium" style={{ marginTop: '8px' }}>
              {isPending ? 'Saving...' : 'Save Exercise'}
            </button>

            {prMessage && (
              <div className="animate-fade-slide-up" style={{ padding: '10px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '13px', fontWeight: 600 }}>
                <Award size={16} /> {prMessage}
              </div>
            )}
          </form>
        </div>
      )}

      {/* Today's Logged Exercises */}
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#ededed', marginBottom: '12px' }}>Logged Today</h3>
        {todayLogs.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', background: '#0a0a0a', border: '1px solid #171717', borderRadius: '12px', color: '#52525b', fontSize: '13px' }}>
            No exercises logged yet.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {todayLogs.map(log => (
              <div key={log.id} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '12px 16px', background: '#0a0a0a', border: '1px solid #262626', borderRadius: '12px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Check size={14} color="#10b981" />
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#ededed' }}>{log.exercise}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#a1a1aa', marginTop: '4px', marginLeft: '20px' }}>
                    {log.sets.length} sets: {log.sets.join(' / ')} reps
                    {log.weight_used_kg && <span style={{ color: '#71717a' }}> • {log.weight_used_kg} kg</span>}
                  </div>
                </div>
                <button 
                  onClick={() => handleDeleteLog(log.id)}
                  disabled={isPending}
                  style={{ background: 'transparent', border: 'none', color: '#52525b', padding: '4px', cursor: 'pointer' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
