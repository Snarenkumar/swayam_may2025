import type { Metadata } from "next";
import "./globals.css";
import { Open_Sans } from "next/font/google";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "SWAYAM 2025",
  description: "This is the home page of the Swayam-2025 fest",
};

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`w-screen antialiased relative overflow-x-hidden bg-contain bg-center bg-[url('/assets/AndroidBackground.png')] md:bg-[url('/assets/Background.png')] bg-fixed text-[#5F4A37] ${openSans.className} scroll-smooth`}
      >
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
