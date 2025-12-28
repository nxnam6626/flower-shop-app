// src/app/(admin)/upload/page.tsx
'use client'

import { uploadProduct } from "@/actions/gallery"
import { useState } from "react"

export default function UploadPage() {
  const [isUploading, setIsUploading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsUploading(true)
    try {
      await uploadProduct(formData)
      alert("Đã đăng ảnh thành công!")
      // Reset form (đơn giản là reload trang hoặc dùng ref để clear input)
      window.location.reload() 
    } catch (error) {
      alert("Lỗi rồi: " + error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Đăng ảnh nhanh</h1>
      
      <form action={handleSubmit} className="space-y-4">
        {/* Chọn ảnh */}
        <div className="border-2 border-dashed border-gray-300 p-8 text-center rounded-lg">
          <input 
            name="file" 
            type="file" 
            accept="image/*" 
            required 
            className="w-full"
          />
        </div>

        {/* Nhập Tags nhanh */}
        <div>
          <label className="block text-sm font-medium mb-1">Tags (phân cách bằng dấu phẩy)</label>
          <input 
            name="tags" 
            type="text" 
            placeholder="VD: Sinh nhật, Tone đỏ, 500k"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Nút Submit */}
        <button 
          type="submit" 
          disabled={isUploading}
          className="w-full bg-black text-white py-3 rounded-lg font-bold disabled:bg-gray-400"
        >
          {isUploading ? "Đang tải lên..." : "ĐĂNG NGAY"}
        </button>
      </form>
    </div>
  )
}