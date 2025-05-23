// Shared TypeScript types for LinguaForge

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  xp: number;
  streak: number;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  avatarUrl?: string | null;
  bio?: string | null;
  provider?: string | null;
  googleId?: string | null;
  role?: string | null;
  targetLanguage?: string | null;
  dailyXpGoal?: number | null;
  xp?: number | null;
  streak?: number | null;
  badges?: string[] | null;
  createdAt: string;
  updatedAt: string;
}

export interface Lesson {
  id: string;
  language: string;
  level: string;
  content: any;
  createdAt: string;
}

export interface Progress {
  id: string;
  userId: string;
  lessonId: string;
  score: number;
  completedAt: string;
}

export interface Friend {
  id: string;
  userId: string;
  friendId: string;
}
