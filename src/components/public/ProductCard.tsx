'use client'

import Image from 'next/image'
import { useState } from 'react'
import { MessageCircle, Clock } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'
import LeadCapturePopup from './LeadCapturePopup'

type Product = {
  id: string
  imageUrl: string
  title: string | null
  tags: string[]
  createdAt: Date
}

export default function ProductCard({ product }: { product: Product }) {
  const [showPopup, setShowPopup] = useState(false)

  return (
    <>
      <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-square bg-gray-100">
          <Image
            src={product.imageUrl}
            alt={product.title || 'Hoa tươi'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            quality={85}
            className="object-cover group-hover:scale-110 transition duration-300"
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition">
            <div className="absolute bottom-4 left-4 right-4">
              <button
                onClick={() => setShowPopup(true)}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition shadow-lg active:scale-95"
              >
                <MessageCircle size={20} />
                Tư vấn mẫu này
              </button>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
            {product.title || 'Mẫu hoa tươi đẹp'}
          </h3>
          
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {product.tags.slice(0, 2).map(tag => (
                <span key={tag} className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
              {product.tags.length > 2 && (
                <span className="text-xs text-gray-500">+{product.tags.length - 2}</span>
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

      {/* Lead Capture Popup */}
      <LeadCapturePopup 
        product={product}
        open={showPopup}
        onClose={() => setShowPopup(false)}
      />
    </>
  )
}
