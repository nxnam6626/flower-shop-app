'use client'

import Image from 'next/image'
import { Clock } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'

type Product = {
  id: string
  imageUrl: string
  title: string | null
  tags: string[]
  createdAt: Date
}

export default function RecentPostsPreview({ 
  products 
}: { 
  products: Product[] 
}) {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 text-center text-gray-500">
        <p>Chưa có sản phẩm nào</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {products.map((product) => (
        <div 
          key={product.id}
          className="group relative aspect-square rounded-lg overflow-hidden bg-gray-100"
        >
          <Image
            src={product.imageUrl}
            alt={product.title || 'Product'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={85}
            className="object-cover group-hover:scale-110 transition duration-300"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition">
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <p className="text-white text-sm font-medium truncate">
                {product.title || 'Chưa có tiêu đề'}
              </p>
              <p className="text-white/80 text-xs flex items-center gap-1 mt-1">
                <Clock size={12} />
                {formatDistanceToNow(new Date(product.createdAt), { 
                  addSuffix: true, 
                  locale: vi 
                })}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
