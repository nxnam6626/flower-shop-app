'use client'

import { useState } from 'react'
import { createConsultationFromProduct } from '@/actions/consultations'
import { X, Calendar, User, Phone, Gift } from 'lucide-react'

type Product = {
  id: string
  imageUrl: string
  title: string | null
}

export default function LeadCapturePopup({ 
  product, 
  open, 
  onClose 
}: { 
  product: Product
  open: boolean
  onClose: () => void
}) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    deliveryDate: '',
    occasion: 'Sinh nhật'
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // 1. Save to Consultation DB
      await createConsultationFromProduct({
        ...formData,
        productId: product.id,
        productTitle: product.title || 'Sản phẩm',
        budget: '500k - 1tr', // Default
        source: 'PRODUCT_PAGE'
      })

      // 2. Generate Zalo message
      const message = encodeURIComponent(
        `Chào shop! Mình muốn tư vấn mẫu hoa "${product.title || 'này'}"\n\n` +
        `Link ảnh: ${window.location.origin}/gallery-public?highlight=${product.id}\n` +
        `Ngày giao: ${formData.deliveryDate}\n` +
        `Dịp: ${formData.occasion}`
      )

      // 3. Open Zalo (convert phone to 84xxx format)
      const phone = formData.customerPhone.trim()
      const zaloPhone = phone.startsWith('0') ? '84' + phone.substring(1) : phone
      window.open(`https://zalo.me/${zaloPhone}?message=${message}`, '_blank')

      // 4. Close popup
      onClose()
      
      // Reset form
      setFormData({
        customerName: '',
        customerPhone: '',
        deliveryDate: '',
        occasion: 'Sinh nhật'
      })
    } catch (error) {
      alert('Có lỗi xảy ra: ' + error)
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">Để shop phục vụ tốt nhất</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Product Preview */}
          <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-3">
            <img 
              src={product.imageUrl} 
              alt={product.title || 'Product'} 
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <p className="font-medium text-gray-900 text-sm">Mẫu đã chọn:</p>
              <p className="text-gray-600 text-sm">{product.title || 'Mẫu hoa'}</p>
            </div>
          </div>

          {/* Customer Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User size={16} className="inline mr-1" />
              Tên của bạn *
            </label>
            <input
              type="text"
              required
              placeholder="VD: Nguyễn Văn A"
              value={formData.customerName}
              onChange={(e) => setFormData({...formData, customerName: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone size={16} className="inline mr-1" />
              Số điện thoại *
            </label>
            <input
              type="tel"
              required
              placeholder="0912345678"
              pattern="[0-9]{10}"
              value={formData.customerPhone}
              onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Delivery Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar size={16} className="inline mr-1" />
              Ngày giao hoa *
            </label>
            <input
              type="date"
              required
              value={formData.deliveryDate}
              onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})}
              min={new Date().toISOString().split('T')[0]}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Occasion */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Gift size={16} className="inline mr-1" />
              Dịp tặng hoa *
            </label>
            <select
              required
              value={formData.occasion}
              onChange={(e) => setFormData({...formData, occasion: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option>Sinh nhật</option>
              <option>Kỷ niệm</option>
              <option>Cưới hỏi</option>
              <option>Tốt nghiệp</option>
              <option>Valentine</option>
              <option>8/3</option>
              <option>20/10</option>
              <option>Khác</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 rounded-lg font-bold hover:from-pink-600 hover:to-rose-600 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span> Đang xử lý...
              </span>
            ) : (
              '💬 Tiếp tục với Zalo'
            )}
          </button>

          <p className="text-xs text-gray-500 text-center">
            Thông tin của bạn sẽ được bảo mật và chỉ dùng để tư vấn
          </p>
        </form>
      </div>
    </div>
  )
}
