/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

// amplify/backend/function/importWorkout/src/index.js

// Pull in your shared parser from the monorepo
const { parseWorkoutCaption } = require('../../../../packages/shared/dist/parser');

exports.handler = async (event) => {
  let caption = '';
  try {
    // event.body is a JSON string
    const body = JSON.parse(event.body || '{}');
    caption = body.caption || '';
  } catch (e) {
    // malformed JSON
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON' }),
    };
  }

  // invoke your parser
  const result = parseWorkoutCaption(caption);

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(result),
  };
};
