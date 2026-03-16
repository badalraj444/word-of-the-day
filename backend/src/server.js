import app from './app.js';
import pool from './config/db.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
  // Database connection check stays here
  pool.query('SELECT NOW()')
    .then((res) => {
      console.log('Connected to PostgreSQL at:', res.rows[0].now);
    })
    .catch((err) => {
      console.error('Database connection error:', err.message);
    });
});