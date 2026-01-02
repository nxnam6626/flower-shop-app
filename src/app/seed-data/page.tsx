'use client'

import { useState } from 'react'
import { seedTestData, clearTestData } from '@/actions/seed-data'
import { Database, Trash2, CheckCircle, XCircle } from 'lucide-react'

export default function SeedDataPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleSeed = async () => {
    setLoading(true)
    setResult(null)
    
    try {
      const res = await seedTestData()
      setResult(res)
    } catch (error) {
      setResult({ success: false, error: String(error) })
    } finally {
      setLoading(false)
    }
  }

  const handleClear = async () => {
    if (!confirm('Xóa tất cả test data? Không thể hoàn tác!')) return
    
    setLoading(true)
    setResult(null)
    
    try {
      const res = await clearTestData()
      setResult(res)
    } catch (error) {
      setResult({ success: false, error: String(error) })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Database size={32} className="text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Seed Test Data</h1>
          <p className="text-gray-600 mt-2">Tạo dữ liệu mẫu để test dashboard</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleSeed}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Database size={20} />
            {loading ? 'Đang tạo...' : 'Tạo Test Data'}
          </button>

          <button
            onClick={handleClear}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 size={20} />
            {loading ? 'Đang xóa...' : 'Xóa Tất Cả Data'}
          </button>
        </div>

        {result && (
          <div className={`mt-6 p-4 rounded-lg ${
            result.success 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-start gap-3">
              {result.success ? (
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
              ) : (
                <XCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
              )}
              
              <div className="flex-1">
                <h3 className={`font-bold ${result.success ? 'text-green-900' : 'text-red-900'}`}>
                  {result.success ? '✅ Thành công!' : '❌ Lỗi!'}
                </h3>
                
                {result.success && result.data && (
                  <div className="text-sm text-green-700 mt-2">
                    <p>• Đã tạo {result.data.consultationsCreated} consultations</p>
                    <p>• Đã tạo {result.data.productsCreated} products</p>
                  </div>
                )}
                
                {!result.success && (
                  <p className="text-sm text-red-700 mt-1">{result.error}</p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">📋 Test Data bao gồm:</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• 4 yêu cầu tư vấn (consultations)</li>
            <li>• 6 sản phẩm hoa (products với Unsplash images)</li>
            <li>• Shop config (trạng thái nhận đơn)</li>
          </ul>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <a 
              href="/dashboard" 
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              → Xem Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
