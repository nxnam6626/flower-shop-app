import React from 'react';
import Header from '@/components/public/header/Header';
import MainNavigation from '@/components/public/header/MainNavigation';
import HotlineButton from '@/components/public/shared/HotlineButton';
import Footer from '@/components/public/shared/Footer';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800 font-sans">
      <header className="flex flex-col">
        <Header />
        <MainNavigation />
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <HotlineButton />

      <Footer />

    </div>
  );
}