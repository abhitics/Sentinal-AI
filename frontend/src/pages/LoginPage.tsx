import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Mail, Lock, ArrowRight, Loader } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@sentinel.ai');
  const [password, setPassword] = useState('password');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    setIsLoading(true);
    try {
      await login({ email, password });
      toast.success('Successfully logged in!');
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card p-8 rounded-2xl w-full border border-primary-600/30 relative">
      {/* Light glow inside card */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary-600/10 rounded-full blur-xl pointer-events-none" />
      
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold font-display text-text">Welcome Back</h2>
        <p className="text-sm text-text-muted mt-1.5">Sign in to manage your perimeter intelligence</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="operator@sentinel.ai"
              className="input-field pl-11"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input-field pl-11"
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-text-muted">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded bg-card border-border text-primary-600 focus:ring-primary-600/50" />
            <span>Remember Device</span>
          </label>
          <a href="#" className="hover:text-primary-400 transition-colors">Forgot Password?</a>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full flex items-center justify-center gap-2 py-3 mt-4"
        >
          {isLoading ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Initialize Session
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-text-muted">
        Don't have an operator profile?{' '}
        <Link to="/register" className="text-primary-400 hover:text-primary-300 font-semibold transition-colors">
          Request Access
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
