"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function StickyCta() {
  const pathname = usePathname();

  // Don't show on contact/admin/docs pages.
  if (!pathname) return null;
  if (pathname.startsWith("/contact")) return null;
  if (pathname.startsWith("/admin")) return null;
  if (pathname.startsWith("/docs")) return null;

  const auditHref = "/contact?mode=audit";
  const callHref = "/contact?mode=call";

  return (
    <div className="hud-sticky-cta md:hidden">
      <div className="mx-auto flex max-w-6xl gap-2 px-6">
        <Link className="hud-btn hud-btn--primary flex-1 text-center" href={auditHref}>
          Free Audit
        </Link>
        <Link className="hud-btn flex-1 text-center" href={callHref}>
          Book a Call
        </Link>
      </div>
    </div>
  );
}
