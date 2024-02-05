import express from 'express';
import cors from 'cors';

type BloodEntry = {
  glucose: number;
  hemoglobin: number;
  timestamp: string;
};

const entries: BloodEntry[] = [];

const app = express();

app.use((cors as (options: cors.CorsOptions) => express.RequestHandler)({}));

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.get('/blooddata', (_req, res) => {
  res.json(entries);
});

app.post ('/blooddata', (_req, res) => {
  res.send('Got a POST request');
  entries.push({
    glucose: 0,
    hemoglobin: 0,
    timestamp: new Date().toISOString(),
  });
}
);

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
