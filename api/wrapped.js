import { getWrapped } from '../backend/src/services/wrappedService.js';
import { validateUsername, errorHandler } from '../backend/src/middleware/index.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  if (typeof username !== 'string' || username.length === 0) {
    return res.status(400).json({ error: 'Invalid username format' });
  }

  try {
    const year = req.query.year ? parseInt(req.query.year) : new Date().getFullYear();
    const wrapped = await getWrapped(username, year);
    res.status(200).json(wrapped);
  } catch (error) {
    console.error('Error generating wrapped:', error);
    res.status(error.status || 500).json({
      error: error.message || 'Failed to generate wrapped data'
    });
  }
}
