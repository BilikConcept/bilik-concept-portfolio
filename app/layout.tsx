import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bilik Concept — Creative Studio",
    template: "%s — Bilik Concept",
  },
  description:
    "Creative direction, content production and social media for visual brands.",
  keywords: [
    "Bilik Concept",
    "creative studio",
    "creative direction",
    "content production",
    "social media",
    "visual storytelling",
    "brand direction",
  ],
  authors: [{ name: "Bilik Concept" }],
  creator: "Bilik Concept",
  metadataBase: new URL("https://bilikconcept.com"),
  openGraph: {
    title: "Bilik Concept — Creative Studio",
    description:
      "Creative direction, content production and social media for visual brands.",
    url: "https://bilikconcept.com",
    siteName: "Bilik Concept",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bilik Concept — Creative Studio",
    description:
      "Creative direction, content production and social media for visual brands.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${dmSerif.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
