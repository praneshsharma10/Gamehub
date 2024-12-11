import express from 'express';
import User from '../models/user.js';

const router = express.Router();

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Not authenticated' });
};

router.get('/history', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.playerHistory);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching player history' });
  }
});

router.post('/history', isAuthenticated, async (req, res) => {
  try {
    const { game, score } = req.body;
    const user = await User.findById(req.user.id);
    user.playerHistory.push({ game, score });
    await user.save();
    res.json(user.playerHistory);
  } catch (error) {
    res.status(500).json({ error: 'Error adding game result' });
  }
});

export default router;

