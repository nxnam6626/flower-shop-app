'use client'

import { useState } from 'react'
import { markAsDone, markAsNew } from '@/actions/consultations'
import { Phone, MessageCircle, Clock, CheckCircle, RotateCcw } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'

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
}

export default function ConsultationCard({ consultation }: { consultation: Consultation }) {
  const [loading, setLoading] = useState(false)

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

  return (
    <div className={`bg-white rounded-xl p-4 shadow-sm border transition ${
      isDone ? 'border-gray-200 opacity-60' : 'border-gray-100'
    }`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-gray-900">
              {consultation.customerName || 'Khách hàng'}
            </h3>
            {isDone && (
              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                Đã xong
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

      {/* Actions */}
      <div className="flex gap-2">
        {consultation.customerPhone && (
          <>
            <button
              onClick={handleCall}
              className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition active:scale-95"
            >
              <Phone size={16} />
              Gọi
            </button>
            <button
              onClick={handleZalo}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition active:scale-95"
            >
              <MessageCircle size={16} />
              Zalo
            </button>
          </>
        )}
        
        {isDone ? (
          <button
            onClick={handleMarkAsNew}
            disabled={loading}
            className="flex items-center gap-2 bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition disabled:opacity-50"
          >
            <RotateCcw size={16} />
            Chưa xong
          </button>
        ) : (
          <button
            onClick={handleMarkAsDone}
            disabled={loading}
            className="flex items-center gap-2 bg-purple-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-purple-600 transition disabled:opacity-50 active:scale-95"
          >
            <CheckCircle size={16} />
            Xong
          </button>
        )}
      </div>
    </div>
  )
}
