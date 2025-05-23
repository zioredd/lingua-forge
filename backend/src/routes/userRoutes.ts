import express, { RequestHandler } from 'express';
import { authenticateJWT } from '../middleware/authMiddleware';
import { getProfile, updateProfile } from '../controllers/userController';

const router = express.Router();

// Get user profile
router.get('/profile', authenticateJWT as RequestHandler, getProfile as RequestHandler);

// Update user profile
router.patch('/profile', authenticateJWT as RequestHandler, updateProfile as RequestHandler);

export default router;
