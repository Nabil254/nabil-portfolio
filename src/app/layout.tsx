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
  title: "Muhammad Nabil Kamil | Unity Programmer & AR/VR Developer",
  description:
    "Portfolio website for Muhammad Nabil Kamil showcasing Unity, AR/VR, and immersive tech projects.",
  metadataBase: new URL("https://nabilkamil.vercel.app"),
  openGraph: {
    title: "Muhammad Nabil Kamil | Unity Programmer & AR/VR Developer",
    description:
      "Interactive portfolio for a Unity Programmer & AR/VR Developer specializing in immersive experiences.",
    url: "https://nabilkamil.vercel.app",
    siteName: "Nabil Kamil Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
