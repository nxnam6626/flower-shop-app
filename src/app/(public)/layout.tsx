import React from 'react';
import Header from '@/components/public/header/Header';
import HotlineButton from '@/components/public/shared/HotlineButton';
import Footer from '@/components/public/shared/Footer';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800 font-sans">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>


    </div>
  );
}