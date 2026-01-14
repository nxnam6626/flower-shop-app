'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import ProductGallery from '@/components/public/products/ProductGallery'
import { Star, Heart, Share2, ShoppingCart, CheckCircle, Home, ChevronRight, Flower2, Package, Clock, Award } from 'lucide-react'
import { useState } from 'react'

// Import product data
import productsData from '@/data/products.json'

export default function ProductDetailPage() {
    const params = useParams()
    const slug = params.slug as string
    const category = params.category as string

    const [quantity, setQuantity] = useState(1)
    const [isWishlisted, setIsWishlisted] = useState(false)

    // Find product by slug
    const product = productsData.products.find(p => p.slug === slug)

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold text-slate-800 mb-4">
                    Không tìm thấy sản phẩm
                </h1>
                <Link
                    href="/san-pham"
                    className="text-pink-600 hover:text-pink-700 font-medium"
                >
                    Quay về danh sách sản phẩm
                </Link>
            </div>
        )
    }

    const hasDiscount = product.discount && product.originalPrice
    const categoryInfo = productsData.categories.find(c => c.slug === category)

    const handleAddToCart = () => {
        // TODO: Implement add to cart
        alert(`Đã thêm ${quantity} x ${product.name} vào giỏ hàng!`)
    }

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: product.name,
                    text: product.shortDescription,
                    url: window.location.href,
                })
            } catch (err) {
                console.log('Share cancelled')
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(window.location.href)
            alert('Đã copy link sản phẩm!')
        }
    }

    return (
        <div className="min-h-screen bg-white">

            {/* Breadcrumb */}
            <div className="bg-slate-50 border-b border-slate-200">
                <div className="container mx-auto px-4 py-4">
                    <nav aria-label="Breadcrumb">
                        <ol className="flex items-center gap-2 text-sm flex-wrap">
                            <li>
                                <Link
                                    href="/"
                                    className="flex items-center gap-1 text-slate-600 hover:text-pink-600 transition-colors"
                                >
                                    <Home size={16} />
                                    Trang chủ
                                </Link>
                            </li>
                            <ChevronRight size={16} className="text-slate-400" />
                            <li>
                                <Link
                                    href="/san-pham"
                                    className="text-slate-600 hover:text-pink-600 transition-colors"
                                >
                                    Sản phẩm
                                </Link>
                            </li>
                            <ChevronRight size={16} className="text-slate-400" />
                            <li>
                                <Link
                                    href={`/san-pham/${category}`}
                                    className="text-slate-600 hover:text-pink-600 transition-colors"
                                >
                                    {categoryInfo?.name}
                                </Link>
                            </li>
                            <ChevronRight size={16} className="text-slate-400" />
                            <li className="font-medium text-pink-600 truncate" aria-current="page">
                                {product.name}
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                    {/* LEFT: Gallery */}
                    <div>
                        <ProductGallery images={product.images} productName={product.name} />
                    </div>

                    {/* RIGHT: Product Info */}
                    <div className="space-y-6">

                        {/* Badges */}
                        <div className="flex items-center gap-2 flex-wrap">
                            {product.tags.includes('hot') && (
                                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    🔥 HOT
                                </span>
                            )}
                            {product.tags.includes('best-seller') && (
                                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    ⭐ BÁN CHẠY
                                </span>
                            )}
                            {product.inStock && (
                                <span className="bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    ✓ CÒN HÀNG
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <div>
                            <span className="text-sm text-pink-600 font-medium uppercase tracking-wide">
                                {product.specifications.type}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2 mb-3">
                                {product.name}
                            </h1>

                            {/* Rating */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={18}
                                                className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-lg font-bold text-slate-800">{product.rating}</span>
                                </div>
                                <span className="text-slate-400">•</span>
                                <span className="text-sm text-slate-600">
                                    <span className="font-medium">{product.reviewCount}</span> đánh giá
                                </span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-3 bg-pink-50 border border-pink-100 rounded-2xl p-6">
                            <span className="text-4xl font-bold text-pink-600">
                                {product.price.toLocaleString('vi-VN')}đ
                            </span>
                            {hasDiscount && product.originalPrice && (
                                <>
                                    <span className="text-xl text-slate-400 line-through">
                                        {product.originalPrice.toLocaleString('vi-VN')}đ
                                    </span>
                                    <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                                        -{product.discount}%
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Short Description */}
                        <p className="text-slate-600 leading-relaxed text-lg">
                            {product.shortDescription}
                        </p>

                        {/* Specifications */}
                        <div className="bg-slate-50 rounded-xl p-5 space-y-3">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                                <Package className="w-5 h-5 text-pink-500" />
                                Thông Tin Sản Phẩm
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {Object.entries(product.specifications).map(([key, value]) => (
                                    <div key={key} className="flex items-center justify-between bg-white rounded-lg px-3 py-2">
                                        <span className="text-sm text-slate-500 capitalize">{key}:</span>
                                        <span className="text-sm font-semibold text-slate-700">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div className="space-y-4">
                            {/* Quantity Selector */}
                            <div className="flex items-center gap-4">
                                <label className="font-medium text-slate-700">Số lượng:</label>
                                <div className="flex items-center border-2 border-slate-200 rounded-full overflow-hidden">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-4 py-2 hover:bg-slate-100 transition-colors font-bold text-slate-600"
                                    >
                                        −
                                    </button>
                                    <span className="px-6 py-2 font-bold text-slate-800 min-w-[60px] text-center">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                        className="px-4 py-2 hover:bg-slate-100 transition-colors font-bold text-slate-600"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-pink-600 text-white py-4 rounded-xl font-bold hover:bg-pink-700 transition-colors flex items-center justify-center gap-2 text-lg shadow-lg hover:shadow-xl"
                                >
                                    <ShoppingCart size={22} />
                                    Thêm Vào Giỏ
                                </button>
                                <button
                                    onClick={() => setIsWishlisted(!isWishlisted)}
                                    className={`w-14 h-14 border-2 rounded-xl transition-all flex items-center justify-center ${isWishlisted
                                            ? 'border-pink-600 bg-pink-50 text-pink-600'
                                            : 'border-slate-300 text-slate-600 hover:border-pink-300 hover:bg-pink-50'
                                        }`}
                                    aria-label="Add to wishlist"
                                >
                                    <Heart size={22} className={isWishlisted ? 'fill-current' : ''} />
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="w-14 h-14 border-2 border-slate-300 text-slate-600 rounded-xl hover:border-pink-300 hover:bg-pink-50 transition-all flex items-center justify-center"
                                    aria-label="Share"
                                >
                                    <Share2 size={22} />
                                </button>
                            </div>

                            {/* Stock Info */}
                            <div className="flex items-center gap-2 text-sm">
                                <CheckCircle size={18} className="text-green-600" />
                                <span className="font-medium text-green-600">
                                    Còn {product.stock} sản phẩm
                                </span>
                                <span className="text-slate-400">•</span>
                                <span className="text-slate-600">Giao hàng trong 2h</span>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
                            <div className="flex flex-col items-center text-center gap-2">
                                <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-teal-600" />
                                </div>
                                <span className="text-xs font-medium text-slate-700">100% Hoa Tươi</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-pink-600" />
                                </div>
                                <span className="text-xs font-medium text-slate-700">Giao Nhanh 2h</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                                    <Award className="w-6 h-6 text-purple-600" />
                                </div>
                                <span className="text-xs font-medium text-slate-700">Cam Kết Chất Lượng</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Description & Care Instructions */}
                <div className="mt-16 max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Description */}
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Flower2 className="w-6 h-6 text-pink-500" />
                                Mô Tả Chi Tiết
                            </h2>
                            <div className="prose prose-slate max-w-none">
                                <p className="text-slate-600 leading-relaxed">{product.description}</p>
                            </div>
                        </div>

                        {/* Care Instructions */}
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">Hướng Dẫn Chăm Sóc</h2>
                            <ul className="space-y-3">
                                {product.care.map((instruction, index) => (
                                    <li key={index} className="flex items-start gap-3 text-slate-600">
                                        <span className="flex-shrink-0 w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold text-sm mt-0.5">
                                            {index + 1}
                                        </span>
                                        <span className="leading-relaxed">{instruction}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}
