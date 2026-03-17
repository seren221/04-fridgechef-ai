import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AdsProvider } from "@/components/providers/AdsProvider";
import { defaultLocale } from "@/config/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Seren Muse",
  description: "Think, Create, Evolve.",
};

export default async function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  setRequestLocale(defaultLocale);
  const messages = await getMessages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Seren Muse",
    applicationCategory: "ProductivityApplication",
    offers: {
      "@type": "Offer",
      price: "9.99",
      priceCurrency: "USD",
    },
    description:
      "Transform your ideas into reality instantly with AI-powered tools.",
    operatingSystem: "Web",
    softwareVersion: "1.0.0",
  };

  return (
    <html lang={defaultLocale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <div id="top" />
        <NextIntlClientProvider messages={messages}>
          <AdsProvider>
            {/* === Header 导航区 === */}
            <Header />
            <main className="flex-1">{children}</main>
            {/* === Footer 底部区 === */}
            <Footer />
          </AdsProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
