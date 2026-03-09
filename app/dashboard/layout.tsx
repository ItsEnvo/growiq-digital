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
    { href: '/dashboard', label: 'Command Center', icon: '🎯' },
    { href: '/dashboard/agents', label: 'AI Agents', icon: '🤖' },
    { href: '/dashboard/workspace', label: 'Workspace', icon: '📁' },
    { href: '/dashboard/deploy', label: 'Deploy', icon: '🚀' },
    { href: '/dashboard/approvals', label: 'Approvals', icon: '✅' },
    { href: '/dashboard/billing', label: 'Billing', icon: '💳' },
    { href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
  ];

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="dashboard-card" style={{ padding: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 16, color: 'rgba(199,214,255,.6)' }}>Loading Command Center...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', padding: '120px 24px 40px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24 }}>
          {/* Sidebar */}
          <div style={{ position: 'sticky', top: 140, height: 'fit-content' }}>
            {/* User Info */}
            <div className="dashboard-header" style={{ marginBottom: 20, textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
                <div className="growiq-brand-icon" style={{ width: 24, height: 24 }}>
                  <span className="gradient-text" style={{ fontSize: 12 }}>G</span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 800 }}>Command Center</span>
              </div>
              
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{user?.business_name}</h2>
              <p style={{ fontSize: 12, color: 'rgba(199,214,255,.4)', marginBottom: 12 }}>{user?.email}</p>
              
              <div className="growiq-pill" style={{ fontSize: 9 }}>
                <span className="growiq-pill-dot" />
                {user?.plan?.toUpperCase()} PLAN
              </div>
            </div>

            {/* Navigation */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 20 }}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 16px',
                    borderRadius: 12,
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all .2s',
                    background: pathname === item.href ? 'rgba(0,232,123,.06)' : 'transparent',
                    color: pathname === item.href ? '#00e87b' : 'rgba(199,214,255,.6)',
                    border: pathname === item.href ? '1px solid rgba(0,232,123,.12)' : '1px solid transparent',
                  }}
                  onMouseEnter={e => {
                    if (pathname !== item.href) {
                      e.currentTarget.style.background = 'rgba(255,255,255,.02)'
                      e.currentTarget.style.color = '#fff'
                    }
                  }}
                  onMouseLeave={e => {
                    if (pathname !== item.href) {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = 'rgba(199,214,255,.6)'
                    }
                  }}
                >
                  <span style={{ fontSize: 16 }}>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Logout */}
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 12,
                fontSize: 13,
                fontWeight: 600,
                background: 'rgba(239,68,68,.1)',
                border: '1px solid rgba(239,68,68,.2)',
                color: '#f87171',
                transition: 'all .2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(239,68,68,.15)'
                e.currentTarget.style.borderColor = 'rgba(239,68,68,.3)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(239,68,68,.1)'
                e.currentTarget.style.borderColor = 'rgba(239,68,68,.2)'
              }}
            >
              🚪 Sign Out
            </button>
          </div>

          {/* Main content */}
          <div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}