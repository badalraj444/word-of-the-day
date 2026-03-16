import express from 'express';
import cors from 'cors';
import 'dotenv/config';
// Note: We keep the pool import if routes need it, but the "check" moves to server.js
import wordRouter from './routes/word.route.js';

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use('/api', wordRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'server is healthy' });
});

// IMPORTANT: Export the app for server.js and Jest
export default app;