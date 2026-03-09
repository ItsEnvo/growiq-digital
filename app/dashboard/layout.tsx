'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: number;
  email: string;
  business_name: string;
  industry: string;
  plan: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/user');
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        router.push('/auth/login');
      }
    } catch (error) {
      router.push('/auth/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navItems = [
    { href: '/dashboard', label: 'Overview', icon: '📊' },
    { href: '/dashboard/agents', label: 'Agents', icon: '🤖' },
    { href: '/dashboard/workspace', label: 'Workspace', icon: '🗂️' },
    { href: '/dashboard/deploy', label: 'Deploy', icon: '🚀' },
    { href: '/dashboard/approvals', label: 'Approvals', icon: '✅' },
    { href: '/dashboard/billing', label: 'Billing', icon: '💳' },
    { href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="hud-card p-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Main content with sidebar */}
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="hud-card p-6 mb-6">
              <div className="text-center mb-4">
                <h2 className="font-semibold">{user?.business_name}</h2>
                <p className="text-sm text-gray-400">{user?.email}</p>
                <div className="hud-chip mt-2">
                  <div className="hud-dot" />
                  {user?.plan} plan
                </div>
              </div>
            </div>

            <nav className="space-y-2 mb-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                    pathname === item.href
                      ? 'bg-mint/10 text-mint border border-mint/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>

            <button
              onClick={handleLogout}
              className="hud-btn w-full text-red-400 hover:text-red-300"
            >
              Sign Out
            </button>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}