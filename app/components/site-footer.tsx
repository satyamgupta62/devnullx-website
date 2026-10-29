import Image from "next/image";
import Link from "next/link";

const productLinks = [
  { href: "/platform", label: "Platform" },
  { href: "/relay", label: "Relay network" },
  { href: "/#safety", label: "Safety intelligence" },
];

const companyLinks = [
  { href: "/company", label: "Mission & story" },
  { href: "/careers", label: "Careers" },
  { href: "/investors", label: "Investors" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div className="site-footer__brand">
          <Link className="wordmark" href="/" aria-label="DevNullX home">
            <Image
              alt=""
              aria-hidden
              className="wordmark__logo"
              height={54}
              src="/images/devnullx-logo.png"
              unoptimized
              width={260}
            />
            <span className="sr-only">DevNullX</span>
          </Link>
          <p>
            Edge safety intelligence, fleet operations, and relay logistics for
            India&apos;s heavy-vehicle network.
          </p>
          <span className="site-footer__line">
            Relay reduces fatigue; IDSS monitors the fatigue that remains.
          </span>
        </div>

        <nav aria-label="Product" className="site-footer__col">
          <span>Product</span>
          {productLinks.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <nav aria-label="Company" className="site-footer__col">
          <span>Company</span>
          {companyLinks.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="site-footer__col">
          <span>Contact</span>
          <a href="mailto:contact@devnullx.com">contact@devnullx.com</a>
          <a
            href="https://github.com/devnullx-technology"
            rel="noreferrer"
            target="_blank"
          >
            github.com/devnullx-technology
          </a>
          <span className="site-footer__quiet">Remote · India</span>
        </div>
      </div>

      <div className="site-footer__base">
        <p>Driver safety · Fleet operations · Relay logistics</p>
        <span>
          © {new Date().getFullYear()} DevNullX Technology · Built for the
          Indian road
        </span>
      </div>
    </footer>
  );
}
