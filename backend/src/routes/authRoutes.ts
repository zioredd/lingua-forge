import { Router } from 'express';
import { register, login, forgotPassword, resetPassword } from '../controllers/authController';
import { RequestHandler } from 'express';
import { authenticateJWT } from '../utils/authenticateJWT';
import prisma from '../utils/prisma';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Protected route to get current user's profile
const getMeHandler: RequestHandler = async (req, res) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) { res.status(401).json({ message: 'Unauthorized' }); return; }
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) { res.status(404).json({ message: 'User not found' }); return; }
    res.json({ id: user.id, email: user.email, name: user.name, avatarUrl: user.avatarUrl });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

router.get('/me', authenticateJWT as RequestHandler, getMeHandler);

export default router;