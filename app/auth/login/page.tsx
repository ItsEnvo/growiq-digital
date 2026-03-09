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
    <div className="mx-auto max-w-6xl px-6 pt-8">
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="w-full max-w-md">
          <div className="hud-card p-8">
            <div className="mb-8 text-center">
              <div className="hud-kicker mb-4">Welcome Back</div>
              <h1 className="hud-title mb-4">Sign In</h1>
              <p className="hud-sub">
                Access your AI business growth dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Don't have an account?{' '}
                <Link href="/auth/signup" className="text-mint hover:text-mint/80">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}