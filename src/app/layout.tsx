import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { LenisProvider, SiteFooter, SiteHeader } from "@/components/marketing";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "SportsLife Leadership | Build Sports Communities for Kingdom Impact",
    template: "%s | SportsLife Leadership"
  },
  description: site.description,
  openGraph: {
    title: "SportsLife Leadership",
    description: site.description,
    url: site.url,
    siteName: site.name,
    images: [{ url: "/og", width: 1200, height: 630 }],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "SportsLife Leadership",
    description: site.description,
    images: ["/og"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    description: site.description,
    sameAs: ["https://linkedin.com/company/sportslifeleadership"]
  };

  return (
    <html lang="en">
      <body>
        <LenisProvider />
        <SiteHeader />
        {children}
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </body>
    </html>
  );
}
