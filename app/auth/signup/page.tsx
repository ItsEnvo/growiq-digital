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
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'legal', label: 'Legal Services' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'automotive', label: 'Automotive' },
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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      padding: '24px',
      background: '#050810',
      backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(0,232,123,.03) 0%, transparent 55%), radial-gradient(circle at 80% 20%, rgba(0,180,216,.02) 0%, transparent 50%)'
    }}>
      {/* Background glow effects */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: 600,
        height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,232,123,.06) 0%, transparent 55%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '5%',
        left: '5%',
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,180,216,.04) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        width: '100%',
        maxWidth: 420,
        background: 'linear-gradient(180deg, rgba(10,16,38,.8), rgba(5,8,16,.6))',
        border: '1px solid rgba(0,232,123,.1)',
        borderRadius: '24px',
        padding: '48px 40px',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 0 80px rgba(0,232,123,.04), 0 30px 80px rgba(0,0,0,.4)',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: 'linear-gradient(135deg, rgba(0,232,123,.15), rgba(0,180,216,.15))',
              border: '1px solid rgba(0,232,123,.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              fontWeight: 900,
              color: '#00e87b'
            }}>
              G
            </div>
            <div>
              <span style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>Grow</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: '#00e87b' }}>IQ</span>
              <span style={{ fontSize: 12, opacity: 0.7, letterSpacing: '0.2em', marginLeft: 4 }}>DIGITAL</span>
            </div>
          </div>

          <div className="growiq-pill" style={{ marginBottom: 16 }}>
            <span className="growiq-pill-dot" />
            Get Started Today
          </div>
          <h1 className="serif" style={{
            fontSize: 28,
            fontWeight: 800,
            marginBottom: 8
          }}>
            Build Your <span className="gradient-text">AI Workforce</span>
          </h1>
          <p style={{
            fontSize: 14,
            color: 'rgba(199,214,255,.4)',
            marginBottom: 4
          }}>
            Create your AI-powered system that turns traffic into clients
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 8,
                color: 'rgba(199,214,255,.7)'
              }}>
                Business Name *
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Enter your business name"
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(0,0,0,.22)',
                  border: '1px solid rgba(255,255,255,.08)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all .2s'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 8,
                color: 'rgba(199,214,255,.7)'
              }}>
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(0,0,0,.22)',
                  border: '1px solid rgba(255,255,255,.08)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all .2s'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 8,
                color: 'rgba(199,214,255,.7)'
              }}>
                Industry *
              </label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(0,0,0,.22)',
                  border: '1px solid rgba(255,255,255,.08)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '15px',
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(199,214,255,.5)'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 16px center',
                  backgroundSize: '16px',
                  outline: 'none'
                }}
              >
                <option value="" style={{ background: '#050810' }}>Select your industry</option>
                {industries.map(industry => (
                  <option key={industry.value} value={industry.value} style={{ background: '#050810' }}>
                    {industry.label}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 8,
                  color: 'rgba(199,214,255,.7)'
                }}>
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min 8 characters"
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: 'rgba(0,0,0,.22)',
                    border: '1px solid rgba(255,255,255,.08)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'all .2s'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 8,
                  color: 'rgba(199,214,255,.7)'
                }}>
                  Confirm *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: 'rgba(0,0,0,.22)',
                    border: '1px solid rgba(255,255,255,.08)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'all .2s'
                  }}
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
                fontSize: 13,
                textAlign: 'center'
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '15px 28px',
                borderRadius: '12px',
                fontSize: 14,
                fontWeight: 800,
                color: '#fff',
                background: 'linear-gradient(135deg, rgba(0,232,123,.15), rgba(0,180,216,.15))',
                border: '1px solid rgba(0,232,123,.4)',
                boxShadow: '0 0 30px rgba(0,232,123,.15), 0 0 60px rgba(0,180,216,.08)',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all .3s',
                opacity: loading ? 0.7 : 1
              }}
              onMouseEnter={e => {
                if (!loading) {
                  e.currentTarget.style.boxShadow = '0 0 40px rgba(0,232,123,.3)';
                  e.currentTarget.style.borderColor = 'rgba(0,232,123,.6)';
                }
              }}
              onMouseLeave={e => {
                if (!loading) {
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(0,232,123,.15), 0 0 60px rgba(0,180,216,.08)';
                  e.currentTarget.style.borderColor = 'rgba(0,232,123,.4)';
                }
              }}
            >
              {loading ? 'Creating Account...' : 'Create Account & Deploy AI'}
            </button>
          </div>
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
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Footer note */}
        <div style={{
          textAlign: 'center',
          marginTop: 20,
          fontSize: 11,
          color: 'rgba(199,214,255,.3)',
          letterSpacing: '.2em'
        }}>
          LOCAL-FIRST • GITHUB SOURCE-OF-TRUTH • APPROVAL-GATED SHIPPING
        </div>
      </div>
    </div>
  );
}