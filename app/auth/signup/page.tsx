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
    <div className="mx-auto max-w-6xl px-6 pt-8">
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="w-full max-w-md">
          <div className="hud-card p-8">
            <div className="mb-8 text-center">
              <div className="hud-kicker mb-4">Get Started</div>
              <h1 className="hud-title mb-4">Create Your Account</h1>
              <p className="hud-sub">
                Start building your AI-powered business growth system
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  className="hud-input"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="hud-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="industry" className="block text-sm font-medium mb-2">
                  Industry
                </label>
                <select
                  id="industry"
                  name="industry"
                  className="hud-input"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select your industry</option>
                  {industries.map((industry) => (
                    <option key={industry.value} value={industry.value}>
                      {industry.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="hud-input"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="hud-input"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && (
                <div className="rounded-md bg-red-500/10 border border-red-500/20 p-3">
                  <div className="text-red-400 text-sm">{error}</div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="hud-btn hud-btn--primary w-full disabled:opacity-50"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-mint hover:text-mint/80">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}