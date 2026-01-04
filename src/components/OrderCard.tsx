'use client'

import { useState } from 'react'
import { updateOrderStatus, updatePaymentStatus } from '@/actions/orders'
import { Phone, MapPin, Calendar, DollarSign, Package, CheckCircle, Truck, Clock, CreditCard } from 'lucide-react'
import { formatDistanceToNow, differenceInDays, format } from 'date-fns'
import { vi } from 'date-fns/locale'
import Image from 'next/image'

type Order = {
  id: string
  orderNumber: string
  customerName: string
  customerPhone: string
  deliveryDate: Date
  deliveryAddress: string | null
  productTitle: string
  productImageUrl: string
  productPrice: number
  shippingFee: number
  totalAmount: number
  status: string
  paymentStatus: string
  notes: string | null
  createdAt: Date
  product?: {
    id: string
    title: string | null
    imageUrl: string
  } | null
  consultation?: {
    id: string
    occasion: string
  } | null
}

export default function OrderCard({ order }: { order: Order }) {
  const [loading, setLoading] = useState(false)

  const handleStatusChange = async (newStatus: string) => {
    setLoading(true)
    try {
      await updateOrderStatus(order.id, newStatus)
    } catch (error) {
      alert('Lỗi: ' + error)
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentChange = async (newStatus: string) => {
    setLoading(true)
    try {
      await updatePaymentStatus(order.id, newStatus)
    } catch (error) {
      alert('  ' + error)
    } finally {
      setLoading(false)
    }
  }

  const handleCall = () => {
    window.location.href = `tel:${order.customerPhone}`
  }

  // Calculate delivery urgency
  const getDeliveryUrgency = () => {
    const days = differenceInDays(new Date(order.deliveryDate), new Date())
    if (days < 0) return 'overdue'
    if (days <= 2) return 'urgent'
    if (days <= 5) return 'soon'
    return 'normal'
  }

  const urgency = getDeliveryUrgency()

  // Status badges
  const getStatusBadge = () => {
    const badges = {
      'PENDING': { label: 'Chờ xác nhận', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
      'CONFIRMED': { label: 'Đã xác nhận', color: 'bg-blue-100 text-blue-700', icon: CheckCircle },
      'DELIVERING': { label: 'Đang giao', color: 'bg-purple-100 text-purple-700', icon: Truck },
      'COMPLETED': { label: 'Hoàn thành', color: 'bg-green-100 text-green-700', icon: CheckCircle },
      'CANCELLED': { label: 'Đã hủy', color: 'bg-red-100 text-red-700', icon: Clock }
    }
    return badges[order.status as keyof typeof badges] || badges['PENDING']
  }

  const statusBadge = getStatusBadge()
  const StatusIcon = statusBadge.icon

  const getBorderColor = () => {
    if (order.status === 'CANCELLED') return 'border-red-200 bg-red-50/30'
    if (order.status === 'COMPLETED') return 'border-green-200 bg-green-50/30'
    if (urgency === 'overdue') return 'border-red-400'
    if (urgency === 'urgent') return 'border-orange-300'
    if (urgency === 'soon') return 'border-yellow-300'
    return 'border-gray-200'
  }

  const isCompleted = order.status === 'COMPLETED'
  const isCancelled = order.status === 'CANCELLED'

  return (
    <div className={`bg-white rounded-xl p-4 shadow-sm border-2 transition ${getBorderColor()}`}>
      {/* Order Number Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="font-bold text-gray-900 text-lg">#{order.orderNumber}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 ${statusBadge.color}`}>
              <StatusIcon size={12} />
              {statusBadge.label}
            </span>
            {order.paymentStatus === 'PAID' && (
              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-100 text-emerald-700 flex items-center gap-1">
                <CreditCard size={12} />
                Đã thanh toán
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400">
            Tạo {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true, locale: vi })}
          </p>
        </div>
      </div>

      {/* Urgency Banner */}
      {urgency === 'urgent' && !isCompleted && !isCancelled && (
        <div className="bg-orange-50 border-l-4 border-orange-500 p-2 mb-3 rounded">
          <p className="text-xs font-bold text-orange-700">
            ⚡ GẤP - Giao trong {differenceInDays(new Date(order.deliveryDate), new Date())} ngày!
          </p>
        </div>
      )}

      {urgency === 'overdue' && !isCompleted && !isCancelled && (
        <div className="bg-red-50 border-l-4 border-red-600 p-2 mb-3 rounded">
          <p className="text-xs font-bold text-red-800">❌ QUÁ HẠN - Đã qua ngày giao!</p>
        </div>
      )}

      {/* Product Info */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-3 rounded-lg mb-3 flex items-center gap-3">
        <div className="relative w-16 h-16 flex-shrink-0">
          <Image
            src={order.productImageUrl}
            alt={order.productTitle}
            fill
            className="object-cover rounded"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Package size={14} className="text-purple-600 flex-shrink-0" />
            <span className="text-xs font-medium text-purple-900">Sản phẩm:</span>
          </div>
          <p className="font-semibold text-gray-900 text-sm truncate">{order.productTitle}</p>
          {order.consultation && (
            <p className="text-xs text-gray-500">Dịp: {order.consultation.occasion}</p>
          )}
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Tổng tiền</p>
          <p className="font-bold text-pink-600">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount)}
          </p>
        </div>
      </div>

      {/* Customer & Delivery Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Phone size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500">Khách hàng</p>
              <p className="font-semibold text-sm text-gray-900">{order.customerName}</p>
              <p className="text-sm text-gray-600">{order.customerPhone}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Calendar size={16} className={`mt-0.5 flex-shrink-0 ${
              urgency === 'urgent' ? 'text-orange-600' :
              urgency === 'overdue' ? 'text-red-600' :
              'text-gray-400'
            }`} />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500">Ngày giao hàng</p>
              <p className={`font-semibold text-sm ${
                urgency === 'urgent' ? 'text-orange-700' :
                urgency === 'overdue' ? 'text-red-700' :
                'text-gray-900'
              }`}>
                {format(new Date(order.deliveryDate), 'dd/MM/yyyy', { locale: vi })}
              </p>
              <p className="text-xs text-gray-500">
                ({differenceInDays(new Date(order.deliveryDate), new Date())} ngày nữa)
              </p>
            </div>
          </div>
        </div>
      </div>

      {order.deliveryAddress && (
        <div className="flex items-start gap-2 mb-3 bg-gray-50 p-2 rounded">
          <MapPin size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500">Địa chỉ giao hàng</p>
            <p className="text-sm text-gray-700">{order.deliveryAddress}</p>
          </div>
        </div>
      )}

      {order.notes && (
        <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded mb-3">
          💬 {order.notes}
        </div>
      )}

      {/* Action Buttons */}
      {!isCompleted && !isCancelled && (
        <div className="flex gap-2 flex-wrap pt-3 border-t">
          <button
            onClick={handleCall}
            className="flex items-center gap-2 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition active:scale-95"
          >
            <Phone size={16} />
            Gọi
          </button>

          {order.status === 'PENDING' && (
            <button
              onClick={() => handleStatusChange('CONFIRMED')}
              disabled={loading}
              className="flex items-center gap-2 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition active:scale-95 disabled:opacity-50"
            >
              <CheckCircle size={16} />
              Xác nhận
            </button>
          )}

          {order.status === 'CONFIRMED' && (
            <button
              onClick={() => handleStatusChange('DELIVERING')}
              disabled={loading}
              className="flex items-center gap-2 bg-purple-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-purple-600 transition active:scale-95 disabled:opacity-50"
            >
              <Truck size={16} />
              Đang giao
            </button>
          )}

          {order.status === 'DELIVERING' && (
            <button
              onClick={() => handleStatusChange('COMPLETED')}
              disabled={loading}
              className="flex items-center gap-2 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition active:scale-95 disabled:opacity-50"
            >
              <CheckCircle size={16} />
              Hoàn thành
            </button>
          )}

          {order.paymentStatus === 'UNPAID' && (
            <button
              onClick={() => handlePaymentChange('PAID')}
              disabled={loading}
              className="flex items-center gap-2 bg-emerald-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-emerald-600 transition active:scale-95 disabled:opacity-50"
            >
              <CreditCard size={16} />
              Đã thu tiền
            </button>
          )}

          {order.status !== 'CANCELLED' && (
            <button
              onClick={() => handleStatusChange('CANCELLED')}
              disabled={loading}
              className="ml-auto flex items-center gap-2 bg-red-100 text-red-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition active:scale-95 disabled:opacity-50"
            >
              Hủy đơn
            </button>
          )}
        </div>
      )}
    </div>
  )
}
