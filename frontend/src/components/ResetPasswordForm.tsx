import React, { useState } from 'react';
import { resetPassword } from '@/services/auth';

import { useSearchParams } from 'next/navigation';

const ResetPasswordForm: React.FC<{ token?: string }> = ({ token }) => {
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get('email') || '';
  const [email, setEmail] = useState(emailFromQuery);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetToken, setResetToken] = useState(token || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!email || !resetToken || !password || !confirmPassword) {
      setError('Email, token, and new password are required.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      // Update the API call to include email, token, and password
      const res = await resetPassword(email, resetToken, password);
      setSuccess(res.message || 'Password reset successful!');
    } catch (err: any) {
      setError(err.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form className="w-full max-w-md bg-white rounded-xl shadow-md p-8 flex flex-col gap-5" onSubmit={handleSubmit}>
        <h1 className="font-bold text-2xl mb-2 text-gray-200">Reset Password</h1>
        {error && <div className="text-red-700 text-base font-semibold mb-2 text-center">{error}</div>}
        {success && <div className="text-green-700 text-base font-semibold mb-2 text-center">{success}</div>}
        {(!email || !resetToken) && (
          <div className="text-yellow-700 text-sm mb-2 text-center bg-yellow-100 rounded p-2">
            Please ensure you have followed the reset link from your email. If the form is missing your email or token, go back and use the reset link provided in your email.
          </div>
        )}
        {(!email) ? (
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
        ) : null}
        {(!resetToken) && (
          <div>
            <label className="block font-medium mb-1">Reset Token</label>
            <input
              className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
              type="text"
              placeholder="Paste reset token from email"
              value={resetToken}
              onChange={e => setResetToken(e.target.value)}
              autoComplete="off"
            />
          </div>
        )}
        <div>
          <label className="block font-medium mb-1">New Password</label>
          <input
            className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Confirm Password</label>
          <input
            className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
        <div className="text-center text-gray-500 text-sm mt-2">
          <a href="/login" className="text-blue-600 hover:underline">Back to login</a>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
