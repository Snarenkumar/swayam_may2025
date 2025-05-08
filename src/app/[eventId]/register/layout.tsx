import type { Metadata } from "next";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Event Registration Page",
  description: "This is the Registration page of the Swayam-2025 fest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`w-screen antialiased relative overflow-x-hidden`}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
