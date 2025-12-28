import React from 'react';

// Vì đây là Layout con (Nested Layout), 
// TUYỆT ĐỐI KHÔNG được chứa thẻ <html> hay <body> nữa.
// Nó chỉ chứa các thẻ div bao bọc nội dung thôi.

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* 1. Header Admin đơn giản (Sticky để luôn dính trên cùng) */}
      <header className="sticky top-0 z-50 bg-white shadow-sm px-4 py-3 flex justify-between items-center">
        <h1 className="font-bold text-lg text-gray-800">Quản Lý Shop</h1>
        <div className="text-sm text-green-600 font-medium">
           ● Online
        </div>
      </header>

      {/* 2. Phần nội dung chính (Dashboard, Upload...) sẽ hiện ở đây */}
      <main className="p-4">
        {children}
      </main>

      {/* 3. Bottom Navigation (Menu đáy giả lập App Mobile) */}
      {/* Tạm thời mình để một cái khung placeholder ở đây nhé */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-50">
        <button className="flex flex-col items-center text-blue-600">
          <span className="text-xs font-bold">Đơn hàng</span>
        </button>
        
        {/* Nút Upload to đùng ở giữa */}
        <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center -mt-8 shadow-lg border-4 border-gray-100">
          <span className="text-2xl font-bold">+</span>
        </div>

        <button className="flex flex-col items-center text-gray-400">
          <span className="text-xs font-bold">Thư viện</span>
        </button>
      </nav>
    </div>
  );
}