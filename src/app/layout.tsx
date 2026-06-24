import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wellness Group | Born to Excel - Global Conglomerate",
  description: "Wellness Group is a global conglomerate specializing in Minerals Export (Lithium, Cobalt, Gold), Renewable Energy, Engineering & Construction, Chemicals, and International Trade.",
  keywords: [
    "Wellness Group",
    "Minerals Export",
    "Lithium Export",
    "Cobalt Export",
    "Renewable Energy",
    "Engineering & Construction",
    "Chemicals & Pharmaceuticals",
    "International Trade",
    "Born to Excel"
  ],
  authors: [{ name: "Wellness Group Corporate Communications" }],
  openGraph: {
    title: "Wellness Group | Born to Excel - Global Conglomerate",
    description: "Specializing in Minerals Export, Engineering, Renewable Energy, and Chemicals. Leading global operations with ethical and sustainable practices.",
    type: "website",
    locale: "en_US",
    siteName: "Wellness Group",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0F2430",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-[#F5F5F5] text-[#111827] antialiased selection:bg-corp-primary/30 selection:text-corp-primary">
        {children}
      </body>
    </html>
  );
}
