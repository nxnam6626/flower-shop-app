// src/app/(admin)/upload/page.tsx
'use client'

import { uploadProduct } from "@/actions/gallery"
import { useState } from "react"
import ImageUpload from "@/components/ImageUpload"
import TagSelector from "@/components/TagSelector"
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function UploadPage() {
  const [isUploading, setIsUploading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsUploading(true)
    setStatus(null)
    
    try {
      await uploadProduct(formData)
      setStatus({ type: 'success', message: 'Đã đăng ảnh thành công!' })
      
      // Reset sau 2s
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      setStatus({ type: 'error', message: `Lỗi: ${error}` })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      <div className="max-w-2xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link 
            href="/dashboard"
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">📸 Đăng mẫu hoa mới</h1>
            <p className="text-gray-600 text-sm">Chụp hoặc chọn ảnh từ thư viện</p>
          </div>
        </div>
        
        <form action={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Hình ảnh *</label>
            <ImageUpload name="file" required />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tiêu đề</label>
            <input
              name="title"
              type="text"
              placeholder="VD: Bó hoa hồng đỏ tone vintage"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <p className="text-xs text-gray-500 mt-1">Không bắt buộc - để trống nếu không cần</p>
          </div>

          {/* Tags */}
          <div>
            <TagSelector name="tags" />
          </div>

          {/* Status Messages */}
          {status && (
            <div className={`flex items-center gap-3 p-4 rounded-lg ${
              status.type === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {status.type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
              <span className="font-medium">{status.message}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isUploading}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:from-pink-600 hover:to-rose-600 transition shadow-lg"
          >
            {isUploading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span> Đang tải lên...
              </span>
            ) : (
              '✨ ĐĂNG NGAY'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}