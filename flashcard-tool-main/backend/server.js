const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: 'https://flashcards-copy-production.up.railway.app', // Update this with your frontend URL
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.json());

const conn = mysql.createConnection({
  host: 'mysql.railway.internal',
  user: 'root',
  password: 'tTiAkSGSmODawPtNakgfCRBlwGVGstyp',
  database: 'railway',
  port: 3306
});

conn.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as ID', conn.threadId);
});

app.get('/api/flashcards', (req, res) => {
  conn.query('SELECT * FROM flashcards', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.post('/api/flashcards', (req, res) => {
  const { front, back } = req.body;
  conn.query('INSERT INTO flashcards (front, back) VALUES (?, ?)', [front, back], (error, results) => {
    if (error) throw error;
    res.json({ id: results.insertId, front, back });
  });
});

app.put('/api/flashcards/:id', (req, res) => {
  const { id } = req.params;
  const { front, back } = req.body;
  conn.query('UPDATE flashcards SET front = ?, back = ? WHERE id = ?', [front, back, id], (error, results) => {
    if (error) throw error;
    res.json({ id, front, back });
  });
});

app.delete('/api/flashcards/:id', (req, res) => {
  const { id } = req.params;
  conn.query('DELETE FROM flashcards WHERE id = ?', [id], (error, results) => {
    if (error) throw error;
    res.json({ id });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
