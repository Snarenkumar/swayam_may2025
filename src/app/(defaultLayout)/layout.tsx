import type { Metadata } from "next";
import "../globals.css";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/sonner";
import { NextAuthProvider } from "@/components/NextAuthProvider";

export const metadata: Metadata = {
  title: "SWAYAM 2025",
  description: "This is the home page of the Swayam-2025 fest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`w-screen antialiased relative overflow-x-hidden bg-contain bg-center bg-[url('/assets/AndroidBackground.png')] md:bg-[url('/assets/Background.png')] bg-fixed text-[#5F4A37] scroll-smooth`}
      >
        <NextAuthProvider>
          <NavBar />
          {children}
          <Footer />
          <Toaster richColors />
        </NextAuthProvider>
      </body>
    </html>
  );
}
