import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Cursor from "@/components/Cursor/Cursor";
import ScrollProgress from "@/components/ScrollProgress/ScrollProgress";
import "./globals.scss";

const BASE_URL = "https://vahemn.dev";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Vahe Mnatsakanyan — Frontend Developer",
    template: "%s | Vahe Mnatsakanyan",
  },
  description:
    "Frontend Developer with 3+ years of experience crafting fast, scalable, and immersive web applications using React, Next.js, TypeScript, Three.js, and Spline.",
  keywords: [
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Three.js",
    "Spline",
    "Redux Toolkit",
    "SCSS",
    "Web Developer Yerevan",
    "Armenia Developer",
    "Vahe Mnatsakanyan",
  ],
  authors: [{ name: "Vahe Mnatsakanyan", url: BASE_URL }],
  creator: "Vahe Mnatsakanyan",
  icons: {
    icon: "/og-image.png",
    apple: "/og-image.png",
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    title: "Vahe Mnatsakanyan — Frontend Developer",
    description:
      "Frontend Developer crafting immersive web & 3D experiences with React, Next.js & Three.js.",
    siteName: "vahemn.dev",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vahe Mnatsakanyan — Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vahe Mnatsakanyan — Frontend Developer",
    description:
      "Frontend Developer crafting immersive web & 3D experiences with React, Next.js & Three.js.",
    images: ["/og-image.png"],
    creator: "@vahem27",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Vahe Mnatsakanyan",
              url: BASE_URL,
              jobTitle: "Frontend Developer",
              description:
                "Frontend Developer with 3+ years of experience building scalable web apps with React, Next.js, TypeScript & Three.js.",
              email: "vmnatsakanyan27@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Yerevan",
                addressCountry: "AM",
              },
              sameAs: [
                "https://github.com/VaheM27",
                "https://www.linkedin.com/in/vahe-mnatsakanyan-665157202/",
              ],
              knowsAbout: [
                "React.js",
                "Next.js",
                "TypeScript",
                "Three.js",
                "Spline",
                "Redux Toolkit",
                "SCSS",
              ],
            }),
          }}
        />
      </head>
      <body>
        <ScrollProgress />
        <Cursor />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
