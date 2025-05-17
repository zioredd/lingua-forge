import express, { RequestHandler } from 'express';
import { authenticateJWT } from '../middleware/authMiddleware';
import { requireAdmin } from '../middleware/adminMiddleware';

const router = express.Router();

// Example protected route: get user profile
router.get('/profile', authenticateJWT as RequestHandler, (req, res) => {
  // req.user is set by the middleware
  res.json({ user: req.user });
});

// Example admin-only route
router.get('/admin-area', authenticateJWT as RequestHandler, requireAdmin as RequestHandler, (req, res) => {
  res.json({ message: 'Welcome, admin!', user: req.user });
});

export default router;
