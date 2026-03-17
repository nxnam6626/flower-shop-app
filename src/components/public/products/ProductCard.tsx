'use client'

import { Product, ViewMode } from '@/types/product'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Star } from 'lucide-react'
import { useState } from 'react'
import ProductContactButton from './ProductContactButton'
import { useWishlist } from '@/hooks/useWishlist'

interface ProductCardProps {
    product: Product
    viewMode?: ViewMode
    priority?: boolean
}

export default function ProductCard({
    product,
    viewMode = 'grid',
    priority = false
}: ProductCardProps) {
    const [imageLoaded, setImageLoaded] = useState(false)
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()

    const isWishlisted = isInWishlist(product.id)
    const discountPercentage = product.discount || 0
    const hasDiscount = discountPercentage > 0

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault()
        if (isWishlisted) {
            removeFromWishlist(product.id)
        } else {
            addToWishlist(product)
        }
    }

    // Grid view (default)
    if (viewMode === 'grid') {
        return (
            <Link
                href={`/san-pham/${product.category}/${product.slug}`}
                className="group block bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                    <Image
                        src={product.thumbnail}
                        alt={product.name}
                        fill
                        className={`object-cover group-hover:scale-110 transition-transform duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                        onLoad={() => setImageLoaded(true)}
                        priority={priority}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Loading placeholder */}
                    {!imageLoaded && (
                        <div className="absolute inset-0 bg-slate-200 animate-pulse" />
                    )}

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.tags.includes('hot') && (
                            <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg animate-pulse">
                                🔥 HOT
                            </span>
                        )}
                        {product.tags.includes('best-seller') && (
                            <span className="bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                                ⭐ BÁN CHẠY
                            </span>
                        )}
                        {hasDiscount && (
                            <span className="bg-pink-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                                -{discountPercentage}%
                            </span>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                            onClick={handleWishlist}
                            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all ${isWishlisted
                                ? 'bg-pink-600 text-white scale-110'
                                : 'bg-white text-slate-600 hover:bg-pink-50 hover:text-pink-600'
                                }`}
                            aria-label="Thêm vào danh sách yêu thích"
                        >
                            <Heart size={18} className={isWishlisted ? 'fill-current' : ''} />
                        </button>
                        <div onClick={(e) => e.preventDefault()}>
                            <ProductContactButton
                                product={product}
                                variant="zalo"
                                showLabel={false}
                            />
                        </div>
                    </div>

                    {/* Stock status */}
                    {!product.inStock && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="bg-white text-slate-800 px-4 py-2 rounded-full font-bold text-sm">
                                Hết hàng
                            </span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-4">
                    {/* Category */}
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-pink-600 font-medium uppercase tracking-wide">
                            {product.specifications.type}
                        </span>
                        {product.rating >= 4.5 && (
                            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-full">
                                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                                <span className="text-xs font-bold text-yellow-700">{product.rating}</span>
                            </div>
                        )}
                    </div>

                    {/* Name */}
                    <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
                        {product.name}
                    </h3>

                    {/* Short description */}
                    <p className="text-xs text-slate-500 mb-3 line-clamp-2">
                        {product.shortDescription}
                    </p>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-xl font-bold text-pink-600">
                            {product.price.toLocaleString('vi-VN')}đ
                        </span>
                        {hasDiscount && product.originalPrice && (
                            <span className="text-sm text-slate-400 line-through">
                                {product.originalPrice.toLocaleString('vi-VN')}đ
                            </span>
                        )}
                    </div>

                    {/* Rating & Reviews */}
                    <div className="flex items-center gap-3 text-xs text-slate-500 border-t border-slate-100 pt-3">
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={12}
                                    className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}
                                />
                            ))}
                        </div>
                        <span>({product.reviewCount})</span>
                    </div>
                </div>
            </Link>
        )
    }

    // List view
    return (
        <Link
            href={`/san-pham/${product.category}/${product.slug}`}
            className="group flex flex-col sm:flex-row gap-4 bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 p-4"
        >
            {/* Image */}
            <div className="relative w-full sm:w-48 aspect-square flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                <Image
                    src={product.thumbnail}
                    alt={product.name}
                    fill
                    className={`object-cover group-hover:scale-110 transition-transform duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    onLoad={() => setImageLoaded(true)}
                    priority={priority}
                    sizes="(max-width: 640px) 100vw, 192px"
                />

                {!imageLoaded && (
                    <div className="absolute inset-0 bg-slate-200 animate-pulse" />
                )}

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.tags.includes('hot') && (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            🔥 HOT
                        </span>
                    )}
                    {hasDiscount && (
                        <span className="bg-pink-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            -{discountPercentage}%
                        </span>
                    )}
                </div>

                {!product.inStock && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="bg-white text-slate-800 px-3 py-1 rounded-full font-bold text-xs">
                            Hết hàng
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col">
                <div className="flex-1">
                    {/* Category & Rating */}
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs text-pink-600 font-medium uppercase tracking-wide">
                            {product.specifications.type}
                        </span>
                        <div className="flex items-center gap-1">
                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-bold text-slate-700">{product.rating}</span>
                            <span className="text-xs text-slate-500">({product.reviewCount} đánh giá)</span>
                        </div>
                    </div>

                    {/* Name */}
                    <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-pink-600 transition-colors">
                        {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                        {product.description}
                    </p>

                    {/* Specs */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                            {product.specifications.flowerCount} bông
                        </span>
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                            {product.specifications.flowerType}
                        </span>
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                            Tươi {product.specifications.freshness}
                        </span>
                    </div>
                </div>

                {/* Price & Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-pink-600">
                            {product.price.toLocaleString('vi-VN')}đ
                        </span>
                        {hasDiscount && product.originalPrice && (
                            <span className="text-sm text-slate-400 line-through">
                                {product.originalPrice.toLocaleString('vi-VN')}đ
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleWishlist}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isWishlisted
                                ? 'bg-pink-600 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-pink-50 hover:text-pink-600'
                                }`}
                        >
                            <Heart size={18} className={isWishlisted ? 'fill-current' : ''} />
                        </button>
                        <div onClick={(e) => e.preventDefault()}>
                            <ProductContactButton
                                product={product}
                                variant="zalo"
                                size="md"
                                showLabel={false}
                            />
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="px-4 py-2 bg-pink-600 text-white rounded-full font-medium hover:bg-pink-700 transition-colors flex items-center gap-2"
                        >
                            <ShoppingCart size={18} />
                            <span className="hidden sm:inline">Thêm vào giỏ</span>
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}
