import express from 'express';
import { client } from './db.js';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World! 333333');
});

app.get('/tables', async (req, res) => {
  try {
    const query = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `;
    const result = await client.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.get('/cpu-load', (req, res) => {
  const start = Date.now();
  let i = 0;
  while (Date.now() - start < 10000) { // 10 seconds high CPU load
    i++;
  }
  res.send(`CPU load generated for 10 seconds, iterations: ${i}`);
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
