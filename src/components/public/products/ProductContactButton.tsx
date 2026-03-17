'use client'

import { MessageCircle, Phone } from 'lucide-react'
import { Product } from '@/types/product'
import { useState } from 'react'
import ProductContactModal from './ProductContactModal'

interface ProductContactButtonProps {
    product: Product
    variant?: 'zalo' | 'phone' | 'both'
    size?: 'sm' | 'md' | 'lg'
    showLabel?: boolean
    className?: string
}

export default function ProductContactButton({
    product,
    variant = 'zalo',
    size = 'md',
    showLabel = true,
    className = ''
}: ProductContactButtonProps) {

    const [showModal, setShowModal] = useState(false)

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setShowModal(true)
    }

    // Size classes
    const sizeClasses = {
        sm: 'px-3 py-1.5 text-xs gap-1.5',
        md: 'px-4 py-2 text-sm gap-2',
        lg: 'px-6 py-3 text-base gap-2.5'
    }

    const iconSizes = {
        sm: 14,
        md: 16,
        lg: 20
    }

    // Icon only mode (when showLabel is false)
    if (!showLabel) {
        return (
            <>
                <button
                    onClick={handleClick}
                    className="w-9 h-9 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md transition-all hover:scale-110"
                    aria-label="Tư vấn sản phẩm"
                    title="Tư vấn qua Zalo"
                >
                    <MessageCircle size={16} />
                </button>
                <ProductContactModal
                    product={product}
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                />
            </>
        )
    }

    // Full button mode
    return (
        <>
            <button
                onClick={handleClick}
                className={`
          flex items-center justify-center font-medium rounded-full
          bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
          text-white
          transition-all hover:shadow-lg hover:scale-105
          ${sizeClasses[size]}
          ${className}
        `}
            >
                <MessageCircle size={iconSizes[size]} />
                <span>Tư Vấn Ngay</span>
            </button>

            <ProductContactModal
                product={product}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
        </>
    )
}
