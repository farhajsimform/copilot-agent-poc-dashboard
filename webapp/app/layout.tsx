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
  title: "Create Next App",
  description: "Generated by create next app",
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
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-800 text-white p-4">
            <h2 className="text-lg font-bold">Sidebar</h2>
            <nav>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Link 1</a></li>
                <li><a href="#" className="hover:underline">Link 2</a></li>
                <li><a href="#" className="hover:underline">Link 3</a></li>
              </ul>
            </nav>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <header className="bg-gray-100 p-4 shadow-md">
              <h1 className="text-xl font-semibold">Header</h1>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-4">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
