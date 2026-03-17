'use client'

import { useState } from 'react'
import { useWishlist } from '@/hooks/useWishlist'
import { generateWishlistMessage, openZaloChat, openMessengerChat } from '@/lib/contact'
import Image from 'next/image'
import Link from 'next/link'
import { X, MessageCircle, Trash2, ShoppingBag } from 'lucide-react'

export default function WishlistPage() {
    const { wishlist, removeFromWishlist, clearWishlist, wishlistCount } = useWishlist()
    const [showContactModal, setShowContactModal] = useState(false)

    const handleConsultation = (platform: 'zalo' | 'messenger') => {
        const message = generateWishlistMessage(wishlist)

        if (platform === 'zalo') {
            openZaloChat(message)
        } else {
            openMessengerChat(message)
        }

        // Auto-copy message to clipboard
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(message).catch(() => { })
        }
    }

    // Empty state
    if (wishlistCount === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
                <div className="container mx-auto px-4 py-16">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-slate-800 mb-3">
                            Danh Sách Yêu Thích
                        </h1>
                        <p className="text-slate-600">
                            Chưa có sản phẩm nào trong danh sách yêu thích
                        </p>
                    </div>

                    {/* Empty State */}
                    <div className="max-w-md mx-auto text-center">
                        <div className="bg-white rounded-2xl shadow-lg p-12 border border-slate-200">
                            <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShoppingBag className="w-12 h-12 text-pink-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-3">
                                Danh sách trống
                            </h2>
                            <p className="text-slate-600 mb-6">
                                Hãy thêm những sản phẩm yêu thích vào danh sách để được tư vấn nhé!
                            </p>
                            <Link
                                href="/san-pham"
                                className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-full font-semibold hover:from-pink-600 hover:to-rose-700 transition-all shadow-lg hover:shadow-xl"
                            >
                                Khám Phá Sản Phẩm
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Calculate total
    const totalValue = wishlist.reduce((sum, product) => sum + product.price, 0)

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
            <div className="container mx-auto px-4 py-8">

                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
                                Danh Sách Yêu Thích ❤️
                            </h1>
                            <p className="text-slate-600">
                                {wishlistCount} sản phẩm · ~{totalValue.toLocaleString('vi-VN')}đ
                            </p>
                        </div>
                        {wishlistCount > 0 && (
                            <button
                                onClick={clearWishlist}
                                className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                            >
                                <Trash2 size={16} />
                                <span className="hidden sm:inline">Xóa tất cả</span>
                            </button>
                        )}
                    </div>

                    {/* Consultation CTA */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-bold mb-1">
                                    Cần tư vấn thêm?
                                </h2>
                                <p className="text-blue-100 text-sm">
                                    Gửi danh sách yêu thích cho shop để được tư vấn chi tiết nhất
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleConsultation('zalo')}
                                    className="px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                                >
                                    <MessageCircle size={20} />
                                    Chat Zalo
                                </button>
                                <button
                                    onClick={() => handleConsultation('messenger')}
                                    className="px-6 py-3 bg-white text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path d="M12 2C6.5 2 2 6.14 2 11.25c0 2.88 1.44 5.45 3.69 7.14V22l3.45-1.89c.92.25 1.89.39 2.86.39 5.5 0 10-4.14 10-9.25S17.5 2 12 2zm1.03 12.41l-2.49-2.65-4.87 2.65 5.36-5.69 2.55 2.65 4.81-2.65-5.36 5.69z" />
                                    </svg>
                                    Messenger
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {wishlist.map((product) => (
                        <div
                            key={product.id}
                            className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                        >
                            {/* Image */}
                            <Link href={`/san-pham/${product.category}/${product.slug}`}>
                                <div className="relative aspect-square overflow-hidden bg-slate-100">
                                    <Image
                                        src={product.thumbnail}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    />

                                    {/* Remove button */}
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault()
                                            removeFromWishlist(product.id)
                                        }}
                                        className="absolute top-3 right-3 w-9 h-9 bg-white/90 hover:bg-red-500 text-slate-600 hover:text-white rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100"
                                        aria-label="Xóa khỏi yêu thích"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            </Link>

                            {/* Content */}
                            <Link href={`/san-pham/${product.category}/${product.slug}`}>
                                <div className="p-4">
                                    <span className="text-xs text-pink-600 font-medium uppercase tracking-wide">
                                        {product.specifications.type}
                                    </span>
                                    <h3 className="font-semibold text-slate-800 mt-1 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-xl font-bold text-pink-600">
                                        {product.price.toLocaleString('vi-VN')}đ
                                    </p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}
