import type { Metadata } from "next";
import React from "react";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import AppLayout from "@/components/AppLayout";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev Stream | Ops Center",
  description: "Dev Stream Operational Control Center",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} antialiased`}
      >
        <ThemeProvider>
          <React.Suspense fallback={<div className="min-h-screen bg-black" />}>
            <AppLayout>{children}</AppLayout>
          </React.Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
