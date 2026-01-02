'use client'

import Image from 'next/image'
import { useState } from 'react'
import { deleteProduct } from '@/actions/products'
import { Trash2, Edit, Clock } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'

type Product = {
  id: string
  imageUrl: string
  title: string | null
  tags: string[]
  createdAt: Date
}

export default function ProductCard({ product }: { product: Product }) {
  const [loading, setLoading] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      await deleteProduct(product.id)
    } catch (error) {
      alert('Lỗi: ' + error)
    } finally {
      setLoading(false)
      setShowDeleteConfirm(false)
    }
  }

  return (
    <>
      <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition">
        {/* Image */}
        <div className="relative aspect-square bg-gray-100">
          <Image
            src={product.imageUrl}
            alt={product.title || 'Product'}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            quality={85}
            className="object-cover"
          />
          
          {/* Overlay with actions */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition">
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition active:scale-95"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.title || 'Chưa có tiêu đề'}
          </h3>
          
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {product.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
              {product.tags.length > 3 && (
                <span className="text-xs text-gray-500">+{product.tags.length - 3}</span>
              )}
            </div>
          )}

          <p className="text-xs text-gray-400 flex items-center gap-1">
            <Clock size={12} />
            {formatDistanceToNow(new Date(product.createdAt), { 
              addSuffix: true, 
              locale: vi 
            })}
          </p>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Xóa sản phẩm?</h3>
            <p className="text-gray-600 mb-6">
              Bạn có chắc muốn xóa "{product.title || 'sản phẩm này'}"? Hành động này không thể hoàn tác.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={loading}
              >
                Hủy
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
              >
                {loading ? 'Đang xóa...' : 'Xóa'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
