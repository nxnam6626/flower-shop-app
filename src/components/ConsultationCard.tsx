'use client'

import { useState } from 'react'
import { markAsDone, markAsNew } from '@/actions/consultations'
import { Phone, MessageCircle, Clock, CheckCircle, RotateCcw, Package, Calendar, Tag, ShoppingBag } from 'lucide-react'
import { formatDistanceToNow, differenceInDays, format } from 'date-fns'
import { vi } from 'date-fns/locale'
import Image from 'next/image'
import CreateOrderDialog from './CreateOrderDialog'

type Consultation = {
  id: string
  customerName: string | null
  customerPhone: string | null
  budget: string
  occasion: string
  style: string | null
  notes: string | null
  status: string
  createdAt: Date
  productId: string | null
  deliveryDate: Date | null
  source: string | null
  product?: {
    id: string
    title: string | null
    imageUrl: string
  } | null
}

export default function ConsultationCard({ consultation }: { consultation: Consultation }) {
  const [loading, setLoading] = useState(false)
  const [showOrderDialog, setShowOrderDialog] = useState(false)

  const handleCall = () => {
    if (consultation.customerPhone) {
      window.location.href = `tel:${consultation.customerPhone}`
    }
  }

  const handleZalo = () => {
    if (consultation.customerPhone) {
      const zaloPhone = consultation.customerPhone.startsWith('0') 
        ? '84' + consultation.customerPhone.substring(1) 
        : consultation.customerPhone
      window.open(`https://zalo.me/${zaloPhone}`, '_blank')
    }
  }

  const handleMarkAsDone = async () => {
    setLoading(true)
    try {
      await markAsDone(consultation.id)
    } catch (error) {
      alert('Lỗi: ' + error)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsNew = async () => {
    setLoading(true)
    try {
      await markAsNew(consultation.id)
    } catch (error) {
      alert('Lỗi: ' + error)
    } finally {
      setLoading(false)
    }
  }

  const isDone = consultation.status === 'DONE'
  
  // Calculate urgency
  const getUrgency = () => {
    if (!consultation.deliveryDate) return null
    const days = differenceInDays(new Date(consultation.deliveryDate), new Date())
    if (days < 0) return 'overdue'
    if (days <= 3) return 'urgent'
    if (days <= 7) return 'soon'
    return 'normal'
  }

  const urgency = getUrgency()
  
  // Border color based on urgency
  const getBorderColor = () => {
    if (isDone) return 'border-gray-200'
    if (urgency === 'overdue') return 'border-red-400'
    if (urgency === 'urgent') return 'border-red-300'
    if (urgency === 'soon') return 'border-yellow-300'
    return 'border-gray-100'
  }

  // Source badge
  const getSourceBadge = () => {
    if (!consultation.source) return null
    const badges = {
      'PRODUCT_PAGE': { label: 'Từ trang sản phẩm', color: 'bg-purple-100 text-purple-700' },
      'CONTACT_FORM': { label: 'Form liên hệ', color: 'bg-blue-100 text-blue-700' },
      'ZALO_DIRECT': { label: 'Zalo trực tiếp', color: 'bg-green-100 text-green-700' }
    }
    return badges[consultation.source as keyof typeof badges]
  }

  const sourceBadge = getSourceBadge()

  return (
    <>
      <div className={`bg-white rounded-xl p-4 shadow-sm border-2 transition ${
        isDone ? 'opacity-60' : ''
      } ${getBorderColor()}`}>
        {/* Urgency banner */}
        {urgency === 'urgent' && !isDone && (
          <div className="bg-red-50 border-l-4 border-red-500 p-2 mb-3 rounded">
            <p className="text-xs font-bold text-red-700">🔴 URGENT - Giao trong {differenceInDays(new Date(consultation.deliveryDate!), new Date())} ngày!</p>
          </div>
        )}
        
        {urgency === 'overdue' && !isDone && (
          <div className="bg-red-100 border-l-4 border-red-600 p-2 mb-3 rounded">
            <p className="text-xs font-bold text-red-800">⚠️ QUÁ HẠN - Đã qua ngày giao!</p>
          </div>
        )}

        {/* Product preview if available */}
        {consultation.product && (
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-3 rounded-lg mb-3 flex items-center gap-3">
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src={consultation.product.imageUrl}
                alt={consultation.product.title || 'Product'}
                fill
                className="object-cover rounded"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Package size={14} className="text-purple-600 flex-shrink-0" />
                <span className="text-xs font-medium text-purple-900">Quan tâm mẫu:</span>
              </div>
              <p className="font-semibold text-gray-900 text-sm truncate">
                {consultation.product.title || 'Mẫu hoa'}
              </p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="font-bold text-gray-900">
                {consultation.customerName || 'Khách hàng'}
              </h3>
              {isDone && (
                <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                  Đã xong
                </span>
              )}
              {sourceBadge && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 ${sourceBadge.color}`}>
                  <Tag size={12} />
                  {sourceBadge.label}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">{consultation.customerPhone}</p>
          </div>
          
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Clock size={12} />
            {formatDistanceToNow(new Date(consultation.createdAt), { 
              addSuffix: true, 
              locale: vi 
            })}
          </span>
        </div>

        {/* Delivery date */}
        {consultation.deliveryDate && (
          <div className={`mb-3 p-2 rounded flex items-center gap-2 ${
            urgency === 'urgent' ? 'bg-red-50' :
            urgency === 'soon' ? 'bg-yellow-50' :
            'bg-gray-50'
          }`}>
            <Calendar size={16} className={
              urgency === 'urgent' ? 'text-red-600' :
              urgency === 'soon' ? 'text-yellow-600' :
              'text-gray-600'
            } />
            <div className="flex-1">
              <p className="text-xs text-gray-600">Ngày giao hàng:</p>
              <p className={`text-sm font-semibold ${
                urgency === 'urgent' ? 'text-red-700' :
                urgency === 'soon' ? 'text-yellow-700' :
                'text-gray-900'
              }`}>
                {format(new Date(consultation.deliveryDate), 'dd/MM/yyyy', { locale: vi })}
                <span className="text-xs ml-2">
                  ({differenceInDays(new Date(consultation.deliveryDate), new Date())} ngày nữa)
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Details */}
        <div className="space-y-2 mb-3">
          <div className="flex flex-wrap gap-2">
            <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">
              {consultation.occasion}
            </span>
            <span className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full">
              {consultation.budget}
            </span>
          </div>

          {consultation.style && (
            <p className="text-sm text-gray-700">
              <span className="font-medium">Phong cách:</span> {consultation.style}
            </p>
          )}

          {consultation.notes && (
            <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
              💭 {consultation.notes}
            </p>
          )}
        </div>

        {/* Actions */ }
        <div className="flex gap-2 flex-wrap">
          {consultation.customerPhone && (
            <>
              <button
                onClick={handleCall}
                className="flex-1 min-w-[80px] flex items-center justify-center gap-2 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition active:scale-95"
              >
                <Phone size={16} />
                Gọi
              </button>
              <button
                onClick={handleZalo}
                className="flex-1 min-w-[80px] flex items-center justify-center gap-2 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition active:scale-95"
              >
                <MessageCircle size={16} />
                Zalo
              </button>
            </>
          )}
          
          {/* Create Order Button - CRM Phase 3 */}
          {!isDone && (
            <button
              onClick={() => setShowOrderDialog(true)}
              className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:from-pink-600 hover:to-rose-600 transition active:scale-95 shadow-md"
            >
              <ShoppingBag size={16} />
              Tạo đơn
            </button>
          )}

          {isDone ? (
            <button
              onClick={handleMarkAsNew}
              disabled={loading}
              className="flex items-center gap-2 bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition disabled:opacity-50"
            >
              <RotateCcw size={16} />
            </button>
          ) : (
            <button
              onClick={handleMarkAsDone}
              disabled={loading}
              className="flex items-center gap-2 bg-purple-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-purple-600 transition disabled:opacity-50 active:scale-95"
            >
              <CheckCircle size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Order Creation Dialog */}
      <CreateOrderDialog 
        consultation={consultation}
        open={showOrderDialog}
        onClose={() => setShowOrderDialog(false)}
      />
    </>
  )
}
