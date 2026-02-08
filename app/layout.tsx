import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}> 
        <div className="min-h-screen">
          <div className="mx-auto max-w-6xl px-6 pt-8">
            <div className="hud-topbar">
              <div className="flex items-center justify-between gap-4">
                <Link href="/" className="hud-brand">
                  <span className="hud-brand__word">GrowIQ</span>
                  <span className="hud-brand__mark" aria-hidden />
                  <span className="hud-brand__sub">DIGITAL</span>
                </Link>

                <nav className="hud-nav">
                  <Link className="hud-nav__link" href="/services">
                    Services
                  </Link>
                  <Link className="hud-nav__link" href="/pricing">
                    Pricing
                  </Link>
                  <Link className="hud-nav__link" href="/proof">
                    Proof
                  </Link>
                  <Link className="hud-nav__link" href="/contact?mode=audit">
                    Free Audit
                  </Link>
                  <Link className="hud-nav__link" href="/contact?mode=call">
                    Book a Call
                  </Link>
                </nav>
              </div>
            </div>
          </div>

          {children}

          <div className="mx-auto max-w-6xl px-6 pb-10">
            <div className="mt-10 hud-footer">
              <div className="hud-sub">Local-first • GitHub source-of-truth • Approval-gated shipping</div>
              <div className="hud-sub">© {new Date().getFullYear()} GrowIQ Digital</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
