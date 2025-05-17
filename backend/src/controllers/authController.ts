import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

import prisma from '../utils/prisma';

import { RequestHandler } from 'express';

export const register: RequestHandler = async (req, res): Promise<void> => {
  const { email, password, name } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: 'Email and password required' });
    return;
  }
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    res.status(409).json({ message: 'User already exists' });
    return;
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashed, name, role: 'user' },
  });
  res.status(201).json({ message: 'User registered', user: { id: user.id, email: user.email, name: user.name, role: user.role } });
};

// In-memory store for password reset tokens (for demo; use DB/Redis in prod)
export const passwordResetTokens: { [email: string]: string } = {};

export const resetPassword: RequestHandler = async (req, res): Promise<void> => {
  const { email, token, newPassword } = req.body;
  if (!email || !token || !newPassword) {
    res.status(400).json({ message: 'Email, token, and new password are required.' });
    return;
  }
  const storedToken = passwordResetTokens[email];
  if (!storedToken || storedToken !== token) {
    res.status(400).json({ message: 'Invalid or expired reset token.' });
    return;
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    return;
  }
  const hashed = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({ where: { email }, data: { password: hashed } });
  delete passwordResetTokens[email];
  res.json({ message: 'Password has been reset successfully.' });
};

import { sendEmail } from '../utils/sendEmail';

export const forgotPassword: RequestHandler = async (req, res): Promise<void> => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: 'Email is required.' });
    return;
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    return;
  }
  // Generate a simple random token (for demo; use crypto in prod)
  const token = Math.random().toString(36).substr(2);
  passwordResetTokens[email] = token;

  try {
    // Create a clickable reset link (update to your deployed frontend URL as needed)
    const resetUrl = `http://localhost:3001/reset-password?token=${token}&email=${email}`;

    // HTML email template with clickable link
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Password Reset</title>
          <style>
            .container {
              max-width: 480px;
              margin: 0 auto;
              padding: 24px;
              border: 1px solid #eaeaea;
              border-radius: 8px;
              font-family: 'Segoe UI', Arial, sans-serif;
              background: #fafbfc;
            }
            .brand {
              font-size: 1.6em;
              font-weight: bold;
              color: #3b82f6;
              margin-bottom: 16px;
            }
            .reset-link {
              display: inline-block;
              background: #3b82f6;
              color: #fff;
              padding: 12px 24px;
              border-radius: 6px;
              text-decoration: none;
              font-weight: bold;
              margin: 16px 0;
              font-size: 1.1em;
            }
            .token {
              display: inline-block;
              background: #f0f4f8;
              border: 1px dashed #3b82f6;
              color: #1e293b;
              font-weight: bold;
              padding: 8px 16px;
              font-size: 1.2em;
              border-radius: 6px;
              margin: 12px 0;
            }
            .footer {
              margin-top: 32px;
              font-size: 0.9em;
              color: #64748b;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="brand">LinguaForge</div>
            <p>Hello,</p>
            <p>
              We received a request to reset your password.<br />
              <strong>Click the button below to reset it:</strong>
            </p>
            <a href="${resetUrl}" class="reset-link">Reset Password</a>
            <p>
              If you did not request a password reset, please ignore this email.<br/>
              This link and code will expire after a short period for your security.
            </p>
            <div class="footer">
              &copy; 2025 LinguaForge. All rights reserved.
            </div>
          </div>
        </body>
      </html>
    `;
    await sendEmail({
      to: email,
      subject: 'LinguaForge Password Reset',
      text:
        `We received a request to reset your LinguaForge password.\n\n` +
        `To reset your password, click the link below ` +
        `If you did not request a password reset, you can safely ignore this email.\n\n` +
        `This link and code will expire after a short period for your security.`,
      html
    });
    res.json({ message: 'Password reset token sent to your email.' });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).json({ message: 'Failed to send password reset email.' });
  }
};

export const login: RequestHandler = async (req, res): Promise<void> => {
  const { email, password } = req.body;
  console.log('Login', req.body)

  // Validation: check for missing fields
  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required.' });
    return;
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
};
