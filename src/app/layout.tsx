import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { personJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  metadataBase: new URL("https://sumery.cn"),
  title: {
    default: "Sumery 希曼 — Small Tools, Big Changes",
    template: "%s | Sumery 希曼",
  },
  description: "独立开发者打造的效率工具与数字产品。",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://sumery.cn",
    siteName: "Sumery 希曼",
    locale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh-CN"
      className="h-full antialiased"
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        {/* 自建 Umami：全站只初始化一次 */}
        <Script
          src="https://umami.apikv.com/s.js"
          data-website-id="b9c91a80-6330-4d0b-8b58-5d478ce805b7"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
