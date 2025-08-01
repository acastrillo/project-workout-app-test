// /apps/web/src/App.tsx
import { useState } from 'react';
import type { ParsedWorkout } from '@shared/parser';
import { WorkoutCard } from './components/Workoutcard';

function App() {
  const [caption, setCaption] = useState('');
  const [parsed, setParsed] = useState<ParsedWorkout | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleParse = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caption }),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const workout: ParsedWorkout = await res.json();
      setParsed(workout);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Workout Parser</h1>

      <textarea
        placeholder="Paste workout caption here..."
        rows={6}
        style={{ width: '100%', marginBottom: '1rem' }}
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      <button onClick={handleParse} disabled={loading}>
        {loading ? 'Parsing…' : 'Parse'}
      </button>

      {error && (
        <p style={{ color: 'red', marginTop: '1rem' }}>Error: {error}</p>
      )}

      {parsed && <WorkoutCard workout={parsed} />}
    </div>
  );
}

export default App;
