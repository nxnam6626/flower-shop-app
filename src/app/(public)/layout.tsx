import React from 'react';
import Link from 'next/link';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      
      {/* 1. HEADER (Thanh điều hướng) - Sticky để luôn bám trên cùng */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo / Tên Shop */}
          <Link href="/" className="text-xl font-bold tracking-tighter text-gray-900">
            Flower<span className="text-pink-600">Shop</span>.
          </Link>

          {/* Menu đơn giản */}
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
            <Link href="/" className="hover:text-pink-600 transition">Trang chủ</Link>
            <Link href="/gallery" className="hover:text-pink-600 transition">Thư viện ảnh</Link>
            <Link href="/consult" className="hover:text-pink-600 transition">Tư vấn</Link>
          </nav>

          {/* Nút hành động nhanh trên Header */}
          <Link 
            href="/consult"
            className="bg-black text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-gray-800 transition"
          >
            Đặt thiết kế
          </Link>
        </div>
      </header>

      {/* 2. MAIN CONTENT (Nội dung chính của từng trang sẽ hiện ở đây) */}
      <main className="flex-grow">
        {children}
      </main>

      {/* 3. FLOATING ACTION BUTTON (Nút Zalo/Chat nổi) */}
      {/* Đây là tính năng quan trọng nhất cho Shop 1 người */}
      <a 
        href="https://zalo.me/SDT_CUA_BAN" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-transform hover:scale-105 active:scale-95"
      >
        {/* Giả lập icon Chat */}
        <span className="font-bold text-sm">Chat Zalo</span>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      </a>

      {/* 4. FOOTER (Chân trang) */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-bold text-lg mb-2">Flower Shop</h3>
          <p className="text-gray-500 text-sm mb-4">
            Thiết kế hoa tươi nghệ thuật & Quà tặng cảm xúc.
          </p>
          <div className="text-xs text-gray-400">
            © 2024 Flower Shop. All rights reserved.
          </div>
        </div>
      </footer>
      
    </div>
  );
}