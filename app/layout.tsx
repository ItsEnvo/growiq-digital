import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import StickyCta from "./components/StickyCta";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Add Playfair Display via link in head

export const metadata: Metadata = {
  title: "GrowIQ Digital",
  description: "Precision marketing systems: funnels, ads, and AI automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} antialiased`}> 
        <div className="min-h-screen">
          {/* Navigation */}
          <nav className="growiq-nav">
            <div className="growiq-nav-content">
              <Link href="/" className="growiq-brand">
                <div className="growiq-brand-icon">
                  <span className="gradient-text">G</span>
                </div>
                <span className="growiq-brand-text">Grow<span className="gradient-text">IQ</span> <span className="growiq-brand-sub">DIGITAL</span></span>
              </Link>

              <div className="growiq-nav-links">
                <Link href="/services" className="growiq-nav-link">Services</Link>
                <Link href="/pricing" className="growiq-nav-link">Pricing</Link>
                <Link href="/proof" className="growiq-nav-link">Proof</Link>
                <Link href="/docs" className="growiq-nav-link">Docs</Link>
                <Link href="/book" className="growiq-nav-link">Book a Call</Link>
                <Link href="/contact?mode=audit" className="growiq-cta-btn">Free Audit</Link>
              </div>
            </div>
          </nav>

          <div className="pb-24 md:pb-0">{children}</div>

          <StickyCta />

          {/* Footer */}
          <footer className="growiq-footer">
            <div className="growiq-footer-content">
              <div className="growiq-footer-text">Local-first • GitHub source-of-truth • Approval-gated shipping</div>
              <div className="growiq-footer-text">© {new Date().getFullYear()} GrowIQ Digital</div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
