'use client'

import { useState } from 'react'
import { createOrder } from '@/actions/orders'
import { X, Calendar, User, Phone, MapPin, DollarSign, Truck, FileText } from 'lucide-react'

// Define type based on Consultation from parent
type ConsultationData = {
  id: string
  customerName: string | null
  customerPhone: string | null
  deliveryDate: Date | null
  product?: {
    id: string
    title: string | null
    imageUrl: string
  } | null
  notes: string | null
}

export default function CreateOrderDialog({ 
  consultation, 
  onClose,
  open 
}: { 
  consultation: ConsultationData
  onClose: () => void
  open: boolean
}) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    customerName: consultation.customerName || '',
    customerPhone: consultation.customerPhone || '',
    deliveryDate: consultation.deliveryDate ? new Date(consultation.deliveryDate).toISOString().split('T')[0] : '',
    deliveryAddress: '',
    productPrice: 0,
    shippingFee: 0,
    notes: consultation.notes || '',
    productTitle: consultation.product?.title || 'Hoa tươi thiết kế',
    productImageUrl: consultation.product?.imageUrl || '/placeholder-flower.jpg' // Fallback image needed
  })

  // Fallback image logic handled in render/submission if needed, but simplistic here
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await createOrder({
        ...formData,
        productId: consultation.product?.id, // Optional
        consultationId: consultation.id,
        // Ensure price/shipping are numbers
        productPrice: Number(formData.productPrice),
        shippingFee: Number(formData.shippingFee)
      })

      if (result.success) {
        alert('Tạo đơn hàng thành công!')
        onClose()
      } else {
        alert('Lỗi: ' + result.error)
      }
    } catch (error) {
      alert('Lỗi hệ thống: ' + error)
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  const totalAmount = Number(formData.productPrice) + Number(formData.shippingFee)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Tạo đơn hàng mới</h3>
            <p className="text-sm text-gray-500">Từ yêu cầu tư vấn #{consultation.id.slice(-4)}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Customer Info Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 border-b pb-2">Thông tin khách hàng & Giao nhận</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tên khách hàng</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={e => setFormData({...formData, customerName: e.target.value})}
                  className="w-full pl-9 p-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="tel"
                  required
                  value={formData.customerPhone}
                  onChange={e => setFormData({...formData, customerPhone: e.target.value})}
                  className="w-full pl-9 p-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ngày giao hàng</label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="date"
                  required
                  value={formData.deliveryDate}
                  onChange={e => setFormData({...formData, deliveryDate: e.target.value})}
                  className="w-full pl-9 p-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ giao hàng</label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  rows={2}
                  required
                  placeholder="Nhập địa chỉ..."
                  value={formData.deliveryAddress}
                  onChange={e => setFormData({...formData, deliveryAddress: e.target.value})}
                  className="w-full pl-9 p-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Product & Payment Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 border-b pb-2">Thông tin đơn hàng</h4>

            {/* Product Preview Context */}
            {formData.productImageUrl && (
              <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg">
                <img src={formData.productImageUrl} alt="Product" className="w-12 h-12 object-cover rounded" />
                <div className="flex-1">
                  <input 
                    type="text"
                    value={formData.productTitle}
                    onChange={e => setFormData({...formData, productTitle: e.target.value})}
                    className="w-full bg-transparent border-none text-sm font-medium focus:ring-0 p-0"
                  />
                  <p className="text-xs text-gray-500">Sản phẩm chốt</p>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Giá trị đơn hàng (VNĐ)</label>
              <div className="relative">
                <DollarSign size={16} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="number"
                  min="0"
                  required
                  value={formData.productPrice}
                  onChange={e => setFormData({...formData, productPrice: Number(e.target.value)})}
                  className="w-full pl-9 p-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phí vận chuyển (VNĐ)</label>
              <div className="relative">
                <Truck size={16} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="number"
                  min="0"
                  value={formData.shippingFee}
                  onChange={e => setFormData({...formData, shippingFee: Number(e.target.value)})}
                  className="w-full pl-9 p-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                />
              </div>
            </div>

            <div className="bg-pink-50 p-3 rounded-lg flex justify-between items-center">
              <span className="font-semibold text-pink-900">Tổng cộng:</span>
              <span className="font-bold text-xl text-pink-600">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú đơn hàng</label>
              <div className="relative">
                <FileText size={16} className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={e => setFormData({...formData, notes: e.target.value})}
                  className="w-full pl-9 p-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="md:col-span-2 flex gap-3 pt-4 border-t mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 text-gray-700 font-medium hover:bg-gray-100 rounded-xl transition"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Đang xử lý...' : '✅ Tạo Đơn Hàng'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
