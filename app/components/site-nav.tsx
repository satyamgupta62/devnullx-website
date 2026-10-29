"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/platform", label: "Platform" },
  { href: "/relay", label: "Relay network" },
  { href: "/company", label: "Company" },
  { href: "/careers", label: "Careers" },
  { href: "/investors", label: "Investors" },
];

export function SiteNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  function closeNavigation() {
    setIsOpen(false);
  }

  return (
    <header className="nav-shell">
      <nav aria-label="Primary" className="site-nav">
        <Link
          className="wordmark"
          href="/"
          aria-label="DevNullX home"
          onClick={closeNavigation}
        >
          <Image
            alt=""
            aria-hidden
            className="wordmark__logo"
            height={54}
            priority
            src="/images/devnullx-logo.png"
            unoptimized
            width={260}
          />
          <span className="sr-only">DevNullX</span>
        </Link>

        <button
          aria-controls="primary-navigation-links"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          className="mobile-nav-toggle"
          onClick={() => setIsOpen((open) => !open)}
          type="button"
        >
          {isOpen ? <X aria-hidden size={17} /> : <Menu aria-hidden size={17} />}
        </button>

        <div
          className="site-nav__links"
          data-open={isOpen}
          id="primary-navigation-links"
        >
          {links.map((link) => (
            <Link
              aria-current={pathname === link.href ? "page" : undefined}
              href={link.href}
              key={link.href}
              onClick={closeNavigation}
            >
              {link.label}
            </Link>
          ))}
          <Link
            className="site-nav__pilot-link"
            href="/investors#contact"
            onClick={closeNavigation}
          >
            Start a pilot
          </Link>
        </div>

        <Link
          className="nav-cta"
          href="/investors#contact"
          onClick={closeNavigation}
        >
          Start a pilot
        </Link>
      </nav>
    </header>
  );
}
