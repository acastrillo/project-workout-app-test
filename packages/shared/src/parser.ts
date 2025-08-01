export interface Exercise {
  name: string;
  sets?: number;
  reps?: number;
  minReps?: number;
  maxReps?: number;
  restSec?: number;
  durationSec?: number;
}

export interface ParsedWorkout {
  title?: string;
  exercises: Exercise[];
  original: string;
}

export function parseWorkoutCaption(rawCaption: string): ParsedWorkout {
  // 0) Normalize any literal "\n" into real newlines
  const caption = rawCaption.replace(/\\n/g, "\n");

  // 1) Break into segments on commas or newlines
  const segments = caption
    .split(/[\r\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  // 2) First line is the title
  const title = segments.shift()!;

  const exercises: Exercise[] = [];

  // 3) Parse each segment
  segments.forEach((seg) => {
    let m: RegExpMatchArray | null;

    // a) Rep‐range: “3–5 reps of squat”
    m = seg.match(/^(\d+)\s*[-–—]\s*(\d+)\s*(?:reps?\s*(?:of)?)?\s*(.+)$/i);
    if (m) {
      const [, min, max, name] = m;
      exercises.push({
        name: name.trim(),
        minReps: Number(min),
        maxReps: Number(max),
      });
      return;
    }

    // b) Sets × reps: “2×15 lunges” or “3x10 squats”
    m = seg.match(/(\d+)\s*(?:sets?\s*of|[x×])\s*(\d+)\s*(.+)/i);
    if (m) {
      const [, sets, reps, name] = m;
      exercises.push({
        name: name.trim(),
        sets: Number(sets),
        reps: Number(reps),
      });
      return;
    }

    // c) Rest — always its own row, **before** duration‐branch
    m = seg.match(/^\s*(\d+)\s*s(?:ec)?s?\s*rest\s*$/i);
    if (m) {
      exercises.push({
        name: "rest",
        restSec: Number(m[1]),
      });
      return;
    }

    // d) Duration: “45s plank” or “30sec wall‐sit”
    m = seg.match(/^\s*(\d+)\s*s(?:ec)?s?\s+(.+)$/i);
    if (m) {
      const [, sec, name] = m;
      exercises.push({
        name: name.trim(),
        durationSec: Number(sec),
      });
      return;
    }

    // e) Fallback: just a name
    exercises.push({ name: seg });
  });

  return { title, original: caption, exercises };
}
