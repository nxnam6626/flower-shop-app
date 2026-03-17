'use client'

import React from 'react';
import Header from '@/components/public/header/Header';
import Footer from '@/components/public/shared/Footer';
import FloatingContact from '@/components/public/shared/FloatingContact';
import { WishlistProvider } from '@/hooks/useWishlist';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WishlistProvider>
      <div className="flex flex-col min-h-screen bg-white text-gray-800 font-sans">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <footer>
          <Footer />
        </footer>
        <FloatingContact />
      </div>
    </WishlistProvider>
  );
}