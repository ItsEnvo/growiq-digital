'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="auth-container">
      {/* Background glow effects */}
      <div className="auth-glow" />
      
      <div className="auth-form">
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
            <div className="growiq-brand-icon">
              <span className="gradient-text">G</span>
            </div>
            <span style={{ fontSize: 20, fontWeight: 800 }}>
              Grow<span className="gradient-text">IQ</span> <span style={{ fontSize: 12, opacity: 0.7, letterSpacing: '0.2em' }}>DIGITAL</span>
            </span>
          </div>

          <div className="growiq-pill" style={{ marginBottom: 16 }}>
            <span className="growiq-pill-dot" />
            Welcome Back
          </div>
          <h1 className="serif" style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
            Sign In to Your <span className="gradient-text">Command Center</span>
          </h1>
          <p className="text-secondary" style={{ fontSize: 14 }}>
            Access your AI business growth dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label htmlFor="email" style={{ 
              display: 'block', 
              fontSize: 13, 
              fontWeight: 600, 
              marginBottom: 6,
              color: 'rgba(199,214,255,.7)'
            }}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="growiq-input"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" style={{ 
              display: 'block', 
              fontSize: 13, 
              fontWeight: 600, 
              marginBottom: 6,
              color: 'rgba(199,214,255,.7)'
            }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="growiq-input"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div style={{
              padding: 12,
              borderRadius: 10,
              background: 'rgba(239,68,68,.1)',
              border: '1px solid rgba(239,68,68,.2)',
              color: '#f87171',
              fontSize: 13
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="growiq-btn"
            style={{ 
              width: '100%', 
              justifyContent: 'center',
              marginTop: 8,
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Signing In...' : 'Access Dashboard'}
          </button>
        </form>

        <div style={{ 
          textAlign: 'center', 
          marginTop: 24, 
          paddingTop: 20, 
          borderTop: '1px solid rgba(255,255,255,.06)' 
        }}>
          <p style={{ fontSize: 13, color: 'rgba(199,214,255,.4)' }}>
            Don't have an account?{' '}
            <Link 
              href="/auth/signup" 
              style={{ color: '#00e87b', fontWeight: 600 }}
              onMouseEnter={e => e.currentTarget.style.color = '#00b4d8'}
              onMouseLeave={e => e.currentTarget.style.color = '#00e87b'}
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}