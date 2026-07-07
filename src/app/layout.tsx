import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ShopProvider } from '@/context/ShopContext';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SmartShop',
  description: 'Mobile-first e-commerce experience',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased`}>
        <ShopProvider>
          <Navbar />
          <div className="min-h-[calc(100vh-4rem)]">
            {children}
          </div>
        </ShopProvider>
      </body>
    </html>
  );
}