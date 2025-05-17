export interface User {
  id: string;
  email: string;
  password?: string;
  name?: string;
  avatarUrl?: string;
  provider?: "google" | "local";
  googleId?: string;
  role?: string | "user";
  createdAt: Date;
  updatedAt: Date;
}
