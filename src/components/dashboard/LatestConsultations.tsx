'use client'

import { Phone, MessageCircle, Clock } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'

type Consultation = {
  id: string
  customerName: string | null
  customerPhone: string | null
  occasion: string
  budget: string
  createdAt: Date
}

export default function LatestConsultations({ 
  consultations 
}: { 
  consultations: Consultation[] 
}) {
  if (consultations.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 text-center text-gray-500">
        <p>Chưa có yêu cầu tư vấn nào</p>
      </div>
    )
  }

  const handleCall = (phone: string | null) => {
    if (phone) window.location.href = `tel:${phone}`
  }

  const handleZalo = (phone: string | null) => {
    if (phone) {
      // Remove leading 0 and add 84
      const zaloPhone = phone.startsWith('0') ? '84' + phone.substring(1) : phone
      window.open(`https://zalo.me/${zaloPhone}`, '_blank')
    }
  }

  return (
    <div className="space-y-3">
      {consultations.map((item) => (
        <div 
          key={item.id}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-bold text-gray-900">
                {item.customerName || 'Khách hàng'}
              </h4>
              <p className="text-sm text-gray-600">{item.customerPhone}</p>
            </div>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Clock size={12} />
              {formatDistanceToNow(new Date(item.createdAt), { 
                addSuffix: true, 
                locale: vi 
              })}
            </span>
          </div>

          <div className="flex gap-2 text-xs mb-3">
            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">
              {item.occasion}
            </span>
            <span className="bg-green-50 text-green-700 px-2 py-1 rounded">
              {item.budget}
            </span>
          </div>

          {item.customerPhone && (
            <div className="flex gap-2">
              <button
                onClick={() => handleCall(item.customerPhone)}
                className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition active:scale-95"
              >
                <Phone size={16} />
                Gọi ngay
              </button>
              <button
                onClick={() => handleZalo(item.customerPhone)}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition active:scale-95"
              >
                <MessageCircle size={16} />
                Zalo
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
