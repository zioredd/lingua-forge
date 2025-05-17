import React, { useState } from 'react';
import { registerUser } from '@/services/auth';


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
  maxWidth: '520px',
  margin: '0 auto',
  background: '#fff',
  borderRadius: '12px',
  boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
  padding: '32px 24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

const row: React.CSSProperties = {
  display: 'flex',
  gap: '16px',
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

const RegisterForm: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return false;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    if (!acceptTerms) {
      setError('You must accept the Terms and Conditions.');
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
      // The backend expects a single name field
      const name = `${firstName} ${lastName}`.trim();
      await registerUser({ name, email, password });
      setSuccess('Registration successful! You can now log in.');
      setError('');
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form className="w-full max-w-md bg-white rounded-xl shadow-md p-8 flex flex-col gap-5" onSubmit={handleSubmit} autoComplete="off">
        <h1 className="font-bold text-2xl mb-2 text-gray-900">Create an account</h1>
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        {success && <div className="text-green-600 text-sm mb-2">{success}</div>}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block font-medium mb-1">First Name</label>
            <input className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary" type="text" placeholder="John" value={firstName} onChange={e=>setFirstName(e.target.value)} />
          </div>
          <div className="w-1/2">
            <label className="block font-medium mb-1">Last Name</label>
            <input className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary" type="text" placeholder="Doe" value={lastName} onChange={e=>setLastName(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="block font-medium mb-1">Your email</label>
          <input className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary" type="email" placeholder="name@company.com" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div>
          <label className="block font-medium mb-1">Password</label>
          <input className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <div>
          <label className="block font-medium mb-1">Confirm password</label>
          <input className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary" type="password" placeholder="Confirm password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          <input id="terms" type="checkbox" checked={acceptTerms} onChange={e=>setAcceptTerms(e.target.checked)} className="w-4 h-4" />
          <label htmlFor="terms" className="text-sm">I accept the <a href="#" className="text-primary underline">Terms and Conditions</a></label>
        </div>
        <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed">
          {loading ? 'Creating account...' : 'Create an account'}
        </button>
        <div className="text-center text-gray-500 text-sm mt-2">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login here</a>
        </div>
      </form>
    </div>
  );
};


// (removed unreachable, duplicate, and old code after Tailwind refactor)

export default RegisterForm;
