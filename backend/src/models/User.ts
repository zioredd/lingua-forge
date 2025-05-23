export interface User {
  id: string;
  email: string;
  password?: string | null;
  name: string | null;
  avatarUrl?: string | null;
  bio?: string | null;
  provider?: string | null;
  googleId?: string | null;
  role?: string | "user" | null;
  targetLanguage?: string | null;
  dailyXpGoal?: number | null;
  xp?: number | null;
  streak?: number | null;
  badges?: string[] | null;
  createdAt: Date;
  updatedAt: Date;
}

