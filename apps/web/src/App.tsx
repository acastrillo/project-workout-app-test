import { useState } from 'react';
import { parseWorkoutCaption } from '@shared/parser';

function App() {
  const [caption, setCaption] = useState('');
  const [parsed, setParsed] = useState<any | null>(null);

  const handleParse = () => {
    const result = parseWorkoutCaption(caption);
    setParsed(result);
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
      <button onClick={handleParse}>Parse</button>

      {parsed && (
        <pre style={{ marginTop: '2rem', background: '#eee', padding: '1rem' }}>
          {JSON.stringify(parsed, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;
