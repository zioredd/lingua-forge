'use client';

import React, { useState } from 'react';
import { forgotPassword } from '@/services/auth';

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    setLoading(true);
    try {
      const res = await forgotPassword(email);
      setSuccess(res.message || 'Reset link sent! Check your email.');
      // Redirect to reset-password with email as query param
      if (typeof window !== 'undefined') {
        window.location.href = `/reset-password?email=${encodeURIComponent(email)}`;
      }
    } catch (err: any) {
      setError(err.message || 'Failed to send reset link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form className="w-full max-w-md bg-white rounded-xl shadow-md p-8 flex flex-col gap-5" onSubmit={handleSubmit}>
        <h1 className="font-bold text-2xl mb-2 text-gray-900">Forgot Password</h1>
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        {success && <div className="text-green-600 text-sm mb-2">{success}</div>}
        <div>
          <label className="block font-medium mb-1">Email address</label>
          <input
            className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
        <div className="text-center text-gray-500 text-sm mt-2">
          <a href="/login" className="text-blue-600 hover:underline">Back to login</a>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
