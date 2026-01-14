'use client'

import { Product, ViewMode } from '@/types/product'
import ProductCard from './ProductCard'
import { Grid3x3, List, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'

interface ProductGridProps {
    products: Product[]
    loading?: boolean
    sortBy?: string
    onSortChange?: (sortBy: string) => void
}

const SORT_OPTIONS = [
    { value: 'newest', label: 'Mới nhất' },
    { value: 'popular', label: 'Phổ biến' },
    { value: 'price-asc', label: 'Giá: Thấp → Cao' },
    { value: 'price-desc', label: 'Giá: Cao → Thấp' },
    { value: 'rating', label: 'Đánh giá cao' },
]

export default function ProductGrid({
    products,
    loading = false,
    sortBy = 'newest',
    onSortChange
}: ProductGridProps) {
    const [viewMode, setViewMode] = useState<ViewMode>('grid')

    // Loading skeleton
    if (loading) {
        return (
            <div>
                <div className="h-12 bg-slate-100 rounded-lg mb-6 animate-pulse" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="bg-slate-200 aspect-square rounded-2xl mb-4" />
                            <div className="bg-slate-200 h-4 rounded mb-2" />
                            <div className="bg-slate-200 h-4 rounded w-2/3 mb-2" />
                            <div className="bg-slate-200 h-6 rounded w-1/2" />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    // Empty state
    if (products.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-pink-50 rounded-full mb-6">
                    <span className="text-5xl">🌸</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                    Không tìm thấy sản phẩm
                </h3>
                <p className="text-slate-500 mb-6 max-w-md mx-auto">
                    Rất tiếc, chúng tôi không tìm thấy sản phẩm nào phù hợp với bộ lọc của bạn.
                    Vui lòng thử điều chỉnh lại.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2.5 bg-pink-600 text-white rounded-full font-medium hover:bg-pink-700 transition-colors"
                >
                    Xem tất cả sản phẩm
                </button>
            </div>
        )
    }

    return (
        <div>
            {/* Header with controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 bg-white p-4 rounded-xl border border-slate-200">

                {/* Results count */}
                <div className="flex items-center gap-3">
                    <p className="text-sm text-slate-600">
                        Hiển thị <span className="font-bold text-pink-600">{products.length}</span> sản phẩm
                    </p>
                    {products.length > 0 && (
                        <span className="hidden sm:inline text-slate-300">•</span>
                    )}
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3 w-full sm:w-auto">

                    {/* Sort dropdown */}
                    {onSortChange && (
                        <div className="relative flex-1 sm:flex-initial">
                            <select
                                value={sortBy}
                                onChange={(e) => onSortChange(e.target.value)}
                                className="w-full sm:w-auto appearance-none bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 pr-10 text-sm text-slate-700 font-medium cursor-pointer hover:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                            >
                                {SORT_OPTIONS.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <SlidersHorizontal
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                            />
                        </div>
                    )}

                    {/* View mode toggle */}
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'grid'
                                    ? 'bg-white text-pink-600 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                                }`}
                            aria-label="Grid view"
                            aria-pressed={viewMode === 'grid'}
                        >
                            <Grid3x3 size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'list'
                                    ? 'bg-white text-pink-600 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                                }`}
                            aria-label="List view"
                            aria-pressed={viewMode === 'list'}
                        >
                            <List size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Product Grid/List */}
            <div className={
                viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'flex flex-col gap-4'
            }>
                {products.map((product, index) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        viewMode={viewMode}
                        priority={index < 6} // Prioritize first 6 images for LCP
                    />
                ))}
            </div>

            {/* Pagination placeholder - can be extended */}
            {products.length >= 12 && (
                <div className="mt-12 flex justify-center">
                    <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full p-1">
                        <button className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-full transition-colors">
                            Trước
                        </button>
                        <button className="px-4 py-2 text-sm font-medium bg-pink-600 text-white rounded-full">
                            1
                        </button>
                        <button className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-full transition-colors">
                            2
                        </button>
                        <button className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-full transition-colors">
                            3
                        </button>
                        <button className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-full transition-colors">
                            Sau
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
