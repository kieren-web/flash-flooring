import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Flash Flooring Wollongong | Polished Concrete & Epoxy Flooring",
  description:
    "Wollongong's trusted polished concrete and epoxy flooring specialists. Residential and commercial. 20+ years experience, free quotes. Serving Wollongong to Sydney.",
  metadataBase: new URL("https://flashflooring.com.au"),
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://flashflooring.com.au",
    siteName: "Flash Flooring",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className={inter.variable}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
