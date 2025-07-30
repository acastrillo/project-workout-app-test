// packages/shared/src/parser.ts
export function parseWorkoutCaption(caption: string) {
  return {
    title: 'Parsed Workout',
    original: caption,
    exercises: [], // You can add parsing logic later
  };
}
