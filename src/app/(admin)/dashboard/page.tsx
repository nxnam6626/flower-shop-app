import Link from "next/link";
import { Plus } from "lucide-react";
import { 
  getDashboardStats, 
  getLatestConsultations, 
  getRecentProducts,
  getShopStatus 
} from "@/actions/dashboard";
import LatestConsultations from "@/components/dashboard/LatestConsultations";
import ShopStatusToggle from "@/components/dashboard/ShopStatusToggle";
import RecentPostsPreview from "@/components/dashboard/RecentPostsPreview";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardPage() {
  // Fetch all data in parallel
  const [stats, consultations, products, shopStatus] = await Promise.all([
    getDashboardStats(),
    getLatestConsultations(),
    getRecentProducts(6),
    getShopStatus()
  ])

  return (
    <div className="pb-20 lg:pb-0">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-gray-500">Quản lý cửa hàng của bạn</p>
        </div>
        <LogoutButton />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-gray-500 text-sm mb-1">Đơn cần tư vấn</div>
          <div className="text-3xl font-bold text-blue-600">{stats.newConsultations}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-gray-500 text-sm mb-1">Ảnh đã đăng</div>
          <div className="text-3xl font-bold text-pink-600">{stats.totalProducts}</div>
        </div>
      </div>

      {/* Shop Status Toggle */}
      <div className="mb-6">
        <ShopStatusToggle initialStatus={shopStatus.isAccepting} />
      </div>

      {/* Quick Actions */}
      <h2 className="font-bold mb-3 text-gray-700">Tác vụ nhanh</h2>
      <Link 
        href="/upload"
        className="flex items-center gap-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 rounded-xl shadow-lg active:scale-95 transition mb-6"
      >
        <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
          <Plus size={24} />
        </div>
        <div>
          <div className="font-bold text-lg">Đăng ảnh mới</div>
          <div className="text-sm opacity-90">Chụp và upload ngay</div>
        </div>
      </Link>

      {/* Latest Consultations */}
      <h2 className="font-bold mb-3 text-gray-700">Yêu cầu tư vấn mới</h2>
      <div className="mb-6">
        <LatestConsultations consultations={consultations} />
      </div>

      {/* Recent Posts Preview */}
      <h2 className="font-bold mb-3 text-gray-700">Sản phẩm gần đây</h2>
      <RecentPostsPreview products={products} />
    </div>
  )
}