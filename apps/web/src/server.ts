// apps/web/src/server.ts
import express from 'express';
import cors from 'cors';
// point at the built JS from your shared package:
import { parseWorkoutCaption } from '../../../packages/shared/dist/src/parser.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/import', (req, res) => {
  const caption = (req.body && req.body.caption) || '';
  const parsed = parseWorkoutCaption(caption);
  return res.json(parsed);
});

const port = 3001;
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
