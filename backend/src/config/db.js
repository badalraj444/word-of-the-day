import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// pool.query('SELECT NOW()')
//   .then((res) => {
//     console.log('Connected to PostgreSQL at:', res.rows[0].now);
//   })
//   .catch((err) => {
//     console.error('Database connection error:', err.message);
//   });

export default pool;