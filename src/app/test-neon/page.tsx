// src/app/test-neon/page.tsx
'use client'

import { createTestProduct } from "@/actions/test-db"
import { useState } from "react"

export default function TestNeonPage() {
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleTest = async () => {
    setLoading(true)
    setStatus("Đang gửi dữ liệu đến Neon...")
    
    const result = await createTestProduct()
    
    if (result.success) {
      setStatus(`✅ THÀNH CÔNG! Đã tạo sản phẩm ID: ${result.data?.id}`)
    } else {
      setStatus(`❌ THẤT BẠI: ${result.error}`)
    }
    setLoading(false)
  }

  return (
    <div className="p-10 flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold">Kiểm tra kết nối NEON DB</h1>
      
      <button 
        onClick={handleTest}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold disabled:bg-gray-400"
      >
        {loading ? "Đang xử lý..." : "Bấm để Lưu thử 1 Sản phẩm"}
      </button>

      {status && (
        <div className={`p-4 rounded border ${status.includes('✅') ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
          {status}
        </div>
      )}
    </div>
  )
}