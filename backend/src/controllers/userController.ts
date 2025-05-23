import { Request, Response } from 'express';
import UserService from '../services/userService';

// GET /api/user/profile
export async function getProfile(req: Request, res: Response) {
  const userId = (req as any).user?.id;
  const user = await UserService.getUserProfile(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
};

// PATCH /api/user/profile
export async function updateProfile(req: Request, res: Response) {
  const userId = (req as any).user?.id;
  const updates = (({ name, avatarUrl, bio, targetLanguage, dailyXpGoal }) => ({ name, avatarUrl, bio, targetLanguage, dailyXpGoal }))(req.body);
  const user = await UserService.updateUserProfile(userId, updates);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  if (updates.targetLanguage !== undefined) user.targetLanguage = updates.targetLanguage;
  if (updates.dailyXpGoal !== undefined) user.dailyXpGoal = updates.dailyXpGoal;
  user.updatedAt = new Date();
  res.json(user);
};
