import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getWrapped } from './services/wrappedService.js';
import { errorHandler, validateUsername } from './middleware/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}));
app.use(express.json());

// Routes
/**
 * GET /wrapped/:username?year=YYYY
 * 
 * Generates GitHub Wrapped data for a user
 * 
 * @param {string} username - GitHub username
 * @param {number} year - Year to generate wrapped for (optional, defaults to current year)
 * 
 * @returns {object} Wrapped data with all slides information
 */
app.get('/wrapped/:username', validateUsername, async (req, res, next) => {
  try {
    const { username } = req.params;
    const year = req.query.year ? parseInt(req.query.year) : new Date().getFullYear();
    
    const wrapped = await getWrapped(username, year);
    res.json(wrapped);
  } catch (error) {
    next(error);
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`GitHub Wrapped API running on http://localhost:${PORT}`);
});
