import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import treenitRouter from './routes/treenit.js';

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// CORS — only from our frontend
app.use(cors({ origin: FRONTEND_URL }));

// JSON body parser
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Main routes
app.use('/api/treenit', treenitRouter);

// 404 — unknown route
app.use((req, res) => {
  res.status(404).json({ error: 'Reittiä ei löytynyt' });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Palvelinvirhe' });
});

app.listen(PORT, () => {
  console.log(`Backend käynnissä: http://localhost:${PORT}`);
});