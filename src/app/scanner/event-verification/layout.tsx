import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "SWAYAM event verification page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`w-screen antialiased min-h-screen relative overflow-x-hidden bg-contain bg-center bg-[url('/assets/AndroidBackground.png')] md:bg-[url('/assets/Background.png')] bg-fixed text-[#5F4A37] scroll-smooth`}
      >
        {children}
      </body>
    </html>
  );
}
