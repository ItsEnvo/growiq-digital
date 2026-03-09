'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    password: '',
    confirmPassword: '',
    industry: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const industries = [
    { value: 'medspa', label: 'Med Spa' },
    { value: 'dental', label: 'Dental' },
    { value: 'realestate', label: 'Real Estate' },
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'other', label: 'Other' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          businessName: formData.businessName,
          industry: formData.industry,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      // Redirect to onboarding
      router.push('/onboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
            Get Started
          </div>
          <h1 className="serif" style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
            Build Your <span className="gradient-text">Growth Machine</span>
          </h1>
          <p className="text-secondary" style={{ fontSize: 14 }}>
            Start with AI-powered systems that turn traffic into clients
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label htmlFor="businessName" style={{ 
              display: 'block', 
              fontSize: 13, 
              fontWeight: 600, 
              marginBottom: 6,
              color: 'rgba(199,214,255,.7)'
            }}>
              Business Name
            </label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              className="growiq-input"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Enter your business name"
              required
            />
          </div>

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
            <label htmlFor="industry" style={{ 
              display: 'block', 
              fontSize: 13, 
              fontWeight: 600, 
              marginBottom: 6,
              color: 'rgba(199,214,255,.7)'
            }}>
              Industry
            </label>
            <select
              id="industry"
              name="industry"
              className="growiq-input"
              value={formData.industry}
              onChange={handleChange}
              required
              style={{ cursor: 'pointer' }}
            >
              <option value="">Select your industry</option>
              {industries.map((industry) => (
                <option key={industry.value} value={industry.value} style={{ background: '#050810' }}>
                  {industry.label}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
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
                placeholder="Min 8 characters"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" style={{ 
                display: 'block', 
                fontSize: 13, 
                fontWeight: 600, 
                marginBottom: 6,
                color: 'rgba(199,214,255,.7)'
              }}>
                Confirm
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="growiq-input"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                required
              />
            </div>
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
            {loading ? 'Creating Account...' : 'Create Account & Start Building'}
          </button>
        </form>

        <div style={{ 
          textAlign: 'center', 
          marginTop: 24, 
          paddingTop: 20, 
          borderTop: '1px solid rgba(255,255,255,.06)' 
        }}>
          <p style={{ fontSize: 13, color: 'rgba(199,214,255,.4)' }}>
            Already have an account?{' '}
            <Link 
              href="/auth/login" 
              style={{ color: '#00e87b', fontWeight: 600 }}
              onMouseEnter={e => e.currentTarget.style.color = '#00b4d8'}
              onMouseLeave={e => e.currentTarget.style.color = '#00e87b'}
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}