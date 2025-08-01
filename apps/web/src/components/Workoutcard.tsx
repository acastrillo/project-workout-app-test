// apps/web/src/components/WorkoutCard.tsx
import React from 'react';
import type { ParsedWorkout } from '@shared/parser';

export function WorkoutCard({ workout }: { workout: ParsedWorkout }) {
  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>{workout.title}</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['Exercise', 'Sets', 'Reps', 'Rest (s)', 'Duration (s)'].map((h) => (
              <th
                key={h}
                style={{ textAlign: 'left', borderBottom: '1px solid #444', padding: '0.5rem' }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {workout.exercises.map((ex, i) => (
            <tr key={i}>
              <td style={{ padding: '0.5rem 0' }}>{ex.name}</td>
              <td style={{ padding: '0.5rem 0' }}>
                {ex.sets ?? '—'}
              </td>
              <td style={{ padding: '0.5rem 0' }}>
                {ex.minReps != null && ex.maxReps != null
                  ? `${ex.minReps}–${ex.maxReps}`
                  : ex.reps ?? '—'}
              </td>
              <td style={{ padding: '0.5rem 0' }}>
                {ex.restSec ?? '—'}
              </td>
              <td style={{ padding: '0.5rem 0' }}>
                {ex.durationSec ?? '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
