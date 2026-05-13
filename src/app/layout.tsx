import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { LanguageProvider } from "@/components/language-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://candeiascoaching.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Candeias Coaching",
  description: "Join our online fitness program with personalized coaching.",
  icons: {
    icon: "/mockup/logo2_square.png",
    shortcut: "/mockup/logo2_square.png",
    apple: "/mockup/logo2_square.png",
  },
  openGraph: {
    title: "Candeias Coaching",
    description: "Join our online fitness program with personalized coaching.",
    url: SITE_URL,
    siteName: "Candeias Coaching",
    images: [
      {
        url: "/mockup/logo2_square.png",
        width: 472,
        height: 472,
        alt: "Candeias Coaching",
      },
    ],
    type: "website",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Candeias Coaching",
  url: SITE_URL,
  logo: `${SITE_URL}/mockup/logo2_square.png`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
