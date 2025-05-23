import { z } from "zod";

// Zod schema for registration
export const RegisterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Zod schema for login
export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
    role?: string;
  };
}

export type RegisterInput = z.infer<typeof RegisterSchema>;

export interface RegisterResponse {
  message: string;
  user?: {
    id: string;
    email: string;
    name?: string;
    role?: string;
  };
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BaCKEND_BASE_URL || "http://localhost:3000";
console.log(API_BASE_URL);

export async function forgotPassword(
  email: string
): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw {
      message: data.message || "Failed to send reset email",
      errors: data.errors,
    };
  }
  return data;
}

export async function resetPassword(
  email: string,
  token: string,
  password: string
): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, token, newPassword: password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw {
      message: data.message || "Failed to reset password",
      errors: data.errors,
    };
  }
  return data;
}

export async function loginUser(input: LoginInput): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json",  },
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) {
    throw { message: data.message || "Login failed", errors: data.errors };
  }
  localStorage.setItem("token", data.token); // or data.accessToken, etc.
  return data;
}

export async function registerUser(
  input: RegisterInput
): Promise<RegisterResponse> {
  const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) {
    throw {
      message: data.message || "Registration failed",
      errors: data.errors,
    };
  }
  return data;
}
