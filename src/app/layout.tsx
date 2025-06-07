import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "進入他們的心靈世界 | Through Their Mind",
  description: "透過互動體驗，理解精神疾病患者的思維世界與內在困境",
  keywords: "精神疾病, 心理健康, 同理心, 互動體驗, 心理科普",
  authors: [{ name: "Through Their Mind Team" }],
  openGraph: {
    title: "進入他們的心靈世界",
    description: "透過互動體驗，理解精神疾病患者的思維世界與內在困境",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
