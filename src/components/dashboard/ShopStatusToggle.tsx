'use client'

import { useState } from 'react'
import { updateShopStatus } from '@/actions/dashboard'
import { Store } from 'lucide-react'

export default function ShopStatusToggle({ 
  initialStatus 
}: { 
  initialStatus: boolean 
}) {
  const [isAccepting, setIsAccepting] = useState(initialStatus)
  const [loading, setLoading] = useState(false)

  const handleToggle = async () => {
    setLoading(true)
    const newStatus = !isAccepting
    
    try {
      await updateShopStatus(newStatus)
      setIsAccepting(newStatus)
    } catch (error) {
      alert('Lỗi: ' + error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isAccepting ? 'bg-green-100' : 'bg-gray-100'
          }`}>
            <Store size={24} className={isAccepting ? 'text-green-600' : 'text-gray-400'} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Trạng thái shop</h3>
            <p className="text-sm text-gray-600">
              {isAccepting ? '✅ Đang nhận đơn' : '⏸️ Tạm ngưng'}
            </p>
          </div>
        </div>

        <button
          onClick={handleToggle}
          disabled={loading}
          className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
            isAccepting ? 'bg-green-500' : 'bg-gray-300'
          } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span
            className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
              isAccepting ? 'translate-x-7' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </div>
  )
}
