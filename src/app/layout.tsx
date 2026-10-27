import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

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
    images: ["/images/og/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
