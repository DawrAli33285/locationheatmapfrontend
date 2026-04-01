import React, { useState } from 'react';
import { Mail, Lock, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from './baseurl';

export default function Login({ onSwitchToRegister, onSwitchToReset, users = [] }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/login`, { email, password });
      setSuccess('Login successful!');
      setEmail('');
      setPassword('');
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (e) {
      setError(e?.response?.data?.error || 'An error occurred while trying to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">

        <div className="flex flex-col items-center mb-8">
          <img
            src="./logo.jpg"
            alt="Company Logo"
            className="w-16 h-16 rounded-2xl object-cover shadow-sm mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Welcome back</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to continue</p>
        </div>

        {error && (
          <div className="mb-5 px-4 py-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-600 text-sm leading-snug">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-5 px-4 py-3 bg-green-50 border border-green-100 rounded-xl flex items-start gap-3">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            <p className="text-green-600 text-sm leading-snug">{success}</p>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
                className="w-full pl-9 pr-10 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <Link to="/resetpassword">
              <button
                onClick={onSwitchToReset}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Forgot password?
              </button>
            </Link>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                </svg>
                Signing in...
              </span>
            ) : 'Sign in'}
          </button>
        </div>

        <p className="mt-5 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/register">
            <button
              onClick={onSwitchToRegister}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Sign up
            </button>
          </Link>
        </p>

      </div>
    </div>
  );
}