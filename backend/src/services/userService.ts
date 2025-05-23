import { User } from '../models/User';
import { findById, update } from '../repositories/userRepository';

class UserService {

static async getUserProfile(userId: string): Promise<User | null> {
  const user = await findById(userId);
  if (!user) throw new Error('User not found');
  return user;
}

static async updateUserProfile(userId: string,
  updates: Partial<Pick<User, 'name' | 'avatarUrl' | 'bio' | 'targetLanguage' | 'dailyXpGoal'>>
): Promise<User | null> {
  const user = await update(userId, updates);
  if (!user) throw new Error('User not found');
  return user;
}
}

export default UserService;
