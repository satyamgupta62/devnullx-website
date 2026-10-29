import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "./components/site-footer";
import { SiteNav } from "./components/site-nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "DevNullX — Edge safety, fleet operations, relay logistics";
const description =
  "DevNullX Aghrahan connects in-cab safety intelligence, fleet operations, and relay logistics for Indian heavy trucks.";

// Static site origin. Set NEXT_PUBLIC_SITE_ORIGIN at build time to the final
// production domain (e.g. https://www.devnullx.com); defaults to the Vercel
// deployment URL so OG/SEO absolute links resolve without a runtime request.
const SITE_ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_ORIGIN ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export function generateMetadata(): Metadata {
  const origin = new URL(SITE_ORIGIN);
  const socialImage = new URL("/og.png", origin).toString();

  return {
    metadataBase: origin,
    title,
    description,
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title,
      description,
      url: origin,
      siteName: "DevNullX",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: "DevNullX edge-to-cloud-to-relay control plane across India",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
