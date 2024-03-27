import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Head from "next/head";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Get Quran Verse: Interactive Quiz Game for Quranic Knowledge",
  description:
    "Play Get Quran Verse, an easy-to-play game where you listen to Quranic verses, and guess them correctly. Play solo or host a game with friends! 😊",
  keywords:
    "Get Quran Verse, Quran, Islamic Game, Quran Quiz, Learn Quran, Interactive Quran Game, verse in quran, verse of quran, allah, quran verses, quran quotes, first verse of quran",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Analytics />
      <SpeedInsights />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
