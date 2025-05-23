import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/services/auth';


const container: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  background: '#fff',
  padding: '32px',
};

const form: React.CSSProperties = {
  width: '100%',
  maxWidth: '480px',
  margin: '0 auto',
  background: '#fff',
  borderRadius: '12px',
  boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
  padding: '32px 24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

const label: React.CSSProperties = {
  fontWeight: 600,
  marginBottom: '6px',
  fontSize: '1rem',
  color: '#111827',
};

const input: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  fontSize: '1rem',
  background: '#f7f8fa',
  outline: 'none',
  marginBottom: '0',
};

const checkboxRow: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const button: React.CSSProperties = {
  width: '100%',
  padding: '14px',
  background: '#b59523',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  fontWeight: 700,
  fontSize: '1.1rem',
  cursor: 'pointer',
  marginTop: '10px',
};

const link: React.CSSProperties = {
  color: '#2563eb',
  textDecoration: 'none',
  fontWeight: 500,
  cursor: 'pointer',
};

const errorStyle: React.CSSProperties = {
  color: '#e53e3e',
  fontSize: '0.98rem',
  margin: '0 0 8px 0',
};

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email || !password) {
      setError('Please fill in all fields.');
      return false;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    if (!validate()) return;
    setLoading(true);
    try {
      await loginUser({ email, password });
      setSuccess('Login successful!');
      setError('');
      setTimeout(() => {
        router.push('/profile');
      }, 600);
    } catch (err: any) {
      setError(err.message || 'Login failed.');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form className="w-full max-w-md bg-white rounded-xl shadow-md p-8 flex flex-col gap-5" onSubmit={handleSubmit} autoComplete="off">
        <h1 className="font-bold text-2xl mb-2 text-gray-900">Sign in to your account</h1>
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        {success && <div className="text-green-600 text-sm mb-2">{success}</div>}
        <div>
          <label className="block font-medium mb-1">Your email</label>
          <input className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary" type="email" placeholder="name@company.com" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div>
          <label className="block font-medium mb-1">Password</label>
          <input className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <input id="remember" type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)} className="w-4 h-4" />
            <label htmlFor="remember" className="text-sm">Remember me</label>
          </div>
          <a href="/forgot-password" className="text-blue-600 hover:underline text-sm">Forgot password?</a>
        </div>
        <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed">
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
        <div className="text-center text-gray-500 text-sm mt-2">
          Don’t have an account yet? <a href="/register" className="text-blue-600 hover:underline">Sign up</a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
