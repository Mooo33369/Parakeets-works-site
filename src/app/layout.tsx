import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";

import { SITE_URL, business } from "@/content/site";

import "./globals.css";

const notoSansJp = Noto_Sans_JP({
  variable: "--font-sans",
  subsets: ["latin"],
});

const title = `${business.name}｜業務システムの開発・提供`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description: business.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "/",
    siteName: business.name,
    title,
    description: business.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: business.description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#10264a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className={`${notoSansJp.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
