const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

// PostgreSQL config
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'userdb',
  password: 'Postgresql', // 🔁 Replace with your PostgreSQL password
  port: 5432,
});

// GET all users
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// CREATE a new user
app.post('/users', async (req, res) => {
  const { name, email, age } = req.body;
  try {
    await pool.query('INSERT INTO users (name, email, age) VALUES ($1, $2, $3)', [name, email, age]);
    res.send('User created successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// UPDATE user
app.put('/users/:id', async (req, res) => {
  const { name, email, age } = req.body;
  try {
    await pool.query(
      'UPDATE users SET name=$1, email=$2, age=$3 WHERE id=$4',
      [name, email, age, req.params.id]
    );
    res.send('User updated successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// DELETE user
app.delete('/users/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM users WHERE id=$1', [req.params.id]);
    res.send('User deleted successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
