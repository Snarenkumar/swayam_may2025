import Link from "next/link";
import Image from "next/image";
import { NextAuthProvider } from "@/components/NextAuthProvider";
import "@/app/globals.css";

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`w-screen antialiased min-h-screen relative overflow-x-hidden bg-contain bg-center bg-[url('/assets/AndroidBackground.png')] md:bg-[url('/assets/Background.png')] bg-fixed text-[#5F4A37] scroll-smooth`}
      >
        <NextAuthProvider>
          <div className="min-h-screen flex flex-col">
            {/* Admin Header */}
            {/* <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">Swayam Admin</h1>
          </div>
        </div>
      </header> */}

            {/* Admin Navigation */}
            {/* <nav className="bg-gray-700 text-white py-2">
        <div className="container mx-auto">
          <ul className="flex space-x-6">
            <li>
              <Link 
                href="/admin"
                className={`${isActivePath('/admin') && !isActivePath('/admin/chats') ? 'text-yellow-300' : 'text-gray-300 hover:text-white'}`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                href="/admin/chats"
                className={`${isActivePath('/admin/chats') ? 'text-yellow-300' : 'text-gray-300 hover:text-white'}`}
              >
                Chat Logs
              </Link>
            </li>
          </ul>
        </div>
      </nav> */}

            {/* Admin Content */}
            <main className="flex-grow bg-gray-100">{children}</main>

            {/* Removed the footer as requested */}
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
