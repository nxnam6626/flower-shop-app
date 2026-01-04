import { getOrders } from '@/actions/orders'
import OrderCard from '@/components/OrderCard'
import OrderStatusFilter from '@/components/OrderStatusFilter'
import { ShoppingBag, Package, Truck, CheckCircle } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const params = await searchParams
  const status = params.status || 'ALL'
  const orders = await getOrders(status === 'ALL' ? undefined : status)

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'PENDING').length,
    delivering: orders.filter(o => o.status === 'DELIVERING').length,
    completed: orders.filter(o => o.status === 'COMPLETED').length,
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
              <ShoppingBag size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Quản lý đơn hàng</h1>
              <p className="text-gray-600 text-sm">Theo dõi và xử lý đơn hàng</p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <OrderStatusFilter currentStatus={status} />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Package size={20} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                <p className="text-xs text-gray-600">Chờ xác nhận</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Truck size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.delivering}</p>
                <p className="text-xs text-gray-600">Đang giao</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
                <p className="text-xs text-gray-600">Hoàn thành</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-4 shadow-sm border border-pink-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                <ShoppingBag size={20} className="text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-pink-600">
                  {new Intl.NumberFormat('vi-VN', { notation: 'compact' }).format(
                    orders.reduce((sum, o) => sum + o.totalAmount, 0)
                  )}
                </p>
                <p className="text-xs text-pink-700 font-medium">Tổng doanh thu</p>
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
            <ShoppingBag size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Chưa có đơn hàng nào
            </h3>
            <p className="text-gray-600">
              {status === 'ALL' 
                ? 'Chưa có đơn hàng nào trong hệ thống' 
                : `Chưa có đơn hàng nào ở trạng thái "${status}"`}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
