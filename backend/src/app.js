import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import pool from './config/db.js';
import wordRouter from './routes/word.route.js';

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use('/api', wordRouter);

app.get('/api/health', (req, res)=>{
    res.json({status: 'server is healthy'});
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    pool.query('SELECT NOW()')
    .then((res) => {
      console.log('Connected to PostgreSQL at:', res.rows[0].now);
    })
    .catch((err) => {
      console.error('Database connection error:', err.message);
    });
});