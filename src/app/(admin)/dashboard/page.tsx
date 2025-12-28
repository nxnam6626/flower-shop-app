import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Tổng quan hôm nay</h2>
      
      {/* Thống kê nhanh */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-gray-500 text-sm mb-1">Đơn cần tư vấn</div>
          <div className="text-3xl font-bold text-blue-600">0</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-gray-500 text-sm mb-1">Ảnh đã đăng</div>
          <div className="text-3xl font-bold text-pink-600">0</div>
        </div>
      </div>

      {/* Menu tác vụ chính */}
      <h3 className="font-bold mb-4 text-gray-700">Tác vụ nhanh</h3>
      <div className="grid grid-cols-1 gap-3">
        <Link 
          href="/upload"
          className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm active:scale-95 transition"
        >
          <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl">
            +
          </div>
          <div>
            <div className="font-bold">Đăng ảnh mới</div>
            <div className="text-xs text-gray-500">Chụp và upload ngay</div>
          </div>
        </Link>
        
        <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm opacity-50">
          <div className="w-10 h-10 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center font-bold">
            OFF
          </div>
          <div>
            <div className="font-bold">Tạm ngưng nhận đơn</div>
            <div className="text-xs text-gray-500">Tính năng đang phát triển</div>
          </div>
        </div>
      </div>
    </div>
  );
}