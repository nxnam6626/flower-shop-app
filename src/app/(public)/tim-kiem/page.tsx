'use client'

import { useState, useEffect, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import FilterSidebar from '@/components/public/products/FilterSidebar'
import ProductGrid from '@/components/public/products/ProductGrid'
import { Product, ActiveFilters, SortOption } from '@/types/product'
import { ChevronRight, Home, Search as SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { searchProducts } from '@/lib/search'

// Import product data
import productsData from '@/data/products.json'

function SearchResultsContent() {
    const searchParams = useSearchParams()
    const query = searchParams.get('q') || ''

    const [loading, setLoading] = useState(true)
    const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
        colors: [],
        occasions: [],
        sortBy: 'newest'
    })

    // Search and filter products
    const filteredProducts = useMemo(() => {
        setLoading(true)

        // First, search by query
        let filtered = query ? searchProducts(productsData.products, query) : productsData.products

        // Apply color filter
        if (activeFilters.colors.length > 0) {
            filtered = filtered.filter(p =>
                p.colors.some(c => activeFilters.colors.includes(c))
            )
        }

        // Apply occasion filter
        if (activeFilters.occasions.length > 0) {
            filtered = filtered.filter(p =>
                p.occasions.some(o => activeFilters.occasions.includes(o))
            )
        }

        // Apply price range filter
        if (activeFilters.priceRange) {
            const range = productsData.filters.priceRanges.find(
                r => r.id === activeFilters.priceRange
            )
            if (range) {
                filtered = filtered.filter(
                    p => p.price >= range.min && p.price <= range.max
                )
            }
        }

        // Apply sorting
        const sorted = [...filtered].sort((a, b) => {
            switch (activeFilters.sortBy) {
                case 'price-asc':
                    return a.price - b.price
                case 'price-desc':
                    return b.price - a.price
                case 'rating':
                    return b.rating - a.rating
                case 'popular':
                    return b.reviewCount - a.reviewCount
                case 'newest':
                default:
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            }
        })

        setTimeout(() => setLoading(false), 300)
        return sorted
    }, [query, activeFilters])

    const handleFilterChange = (filterType: 'colors' | 'occasions' | 'priceRange', value: string) => {
        setActiveFilters(prev => {
            if (filterType === 'priceRange') {
                return {
                    ...prev,
                    priceRange: prev.priceRange === value ? undefined : value
                }
            } else {
                const currentArray = prev[filterType]
                const newArray = currentArray.includes(value)
                    ? currentArray.filter(v => v !== value)
                    : [...currentArray, value]
                return { ...prev, [filterType]: newArray }
            }
        })
    }

    const handleClearAll = () => {
        setActiveFilters({
            colors: [],
            occasions: [],
            sortBy: activeFilters.sortBy
        })
    }

    const handleSortChange = (sortBy: string) => {
        setActiveFilters(prev => ({ ...prev, sortBy: sortBy as SortOption }))
    }

    // Get search suggestions for empty state
    const popularProducts = productsData.products
        .filter(p => p.tags.includes('hot') || p.tags.includes('best-seller'))
        .slice(0, 4)

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Breadcrumb */}
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-4">
                    <nav aria-label="Breadcrumb">
                        <ol className="flex items-center gap-2 text-sm">
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
                                <span className="text-slate-600">Tìm kiếm</span>
                            </li>
                            {query && (
                                <>
                                    <ChevronRight size={16} className="text-slate-400" />
                                    <li className="font-medium text-pink-600 truncate max-w-xs" aria-current="page">
                                        "{query}"
                                    </li>
                                </>
                            )}
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Page Header */}
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 border-b border-pink-100">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                            <SearchIcon className="w-6 h-6 text-pink-500" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                                {query ? `Kết quả tìm kiếm: "${query}"` : 'Tìm kiếm sản phẩm'}
                            </h1>
                            <p className="text-slate-600 mt-1">
                                {query ? (
                                    <>
                                        Tìm thấy <span className="font-bold text-pink-600">{filteredProducts.length}</span> sản phẩm
                                    </>
                                ) : (
                                    'Nhập từ khóa để tìm kiếm sản phẩm'
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">

                {/* Show results or empty state */}
                {query ? (
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* Sidebar Filters */}
                        <div className="hidden lg:block">
                            <FilterSidebar
                                filters={productsData.filters}
                                activeFilters={{
                                    colors: activeFilters.colors,
                                    occasions: activeFilters.occasions,
                                    priceRange: activeFilters.priceRange,
                                }}
                                onFilterChange={handleFilterChange}
                                onClearAll={handleClearAll}
                            />
                        </div>

                        {/* Product Grid or Empty State */}
                        <div className="flex-1">
                            {filteredProducts.length > 0 ? (
                                <ProductGrid
                                    products={filteredProducts}
                                    loading={loading}
                                    sortBy={activeFilters.sortBy}
                                    onSortChange={handleSortChange}
                                />
                            ) : (
                                // Empty Results State
                                <div className="text-center py-16">
                                    <div className="inline-flex items-center justify-center w-24 h-24 bg-pink-50 rounded-full mb-6">
                                        <span className="text-5xl">🔍</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-800 mb-2">
                                        Không tìm thấy kết quả
                                    </h2>
                                    <p className="text-slate-500 mb-8 max-w-md mx-auto">
                                        Không tìm thấy sản phẩm nào phù hợp với từ khóa "{query}".
                                        Vui lòng thử lại với từ khóa khác hoặc xem gợi ý bên dưới.
                                    </p>

                                    {/* Search Tips */}
                                    <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-2xl mx-auto mb-8 text-left">
                                        <h3 className="font-semibold text-slate-800 mb-3">💡 Gợi ý tìm kiếm:</h3>
                                        <ul className="space-y-2 text-sm text-slate-600">
                                            <li>• Kiểm tra lỗi chính tả</li>
                                            <li>• Thử từ khóa khác (ví dụ: "hoa hồng" thay vì "rose")</li>
                                            <li>• Sử dụng từ khóa chung hơn (ví dụ: "hoa sinh nhật")</li>
                                            <li>• Duyệt theo danh mục hoặc dịp đặc biệt</li>
                                        </ul>
                                    </div>

                                    <div className="flex items-center justify-center gap-4">
                                        <Link
                                            href="/san-pham"
                                            className="px-6 py-3 bg-pink-600 text-white rounded-full font-medium hover:bg-pink-700 transition-colors"
                                        >
                                            Xem Tất Cả Sản Phẩm
                                        </Link>
                                        <Link
                                            href="/dip-dac-biet"
                                            className="px-6 py-3 border-2 border-pink-600 text-pink-600 rounded-full font-medium hover:bg-pink-50 transition-colors"
                                        >
                                            Duyệt Theo Dịp
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                ) : (
                    // No Query State - Show Popular Products
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl font-bold text-slate-800 mb-3">
                                🌸 Sản Phẩm Phổ Biến
                            </h2>
                            <p className="text-slate-600">
                                Khám phá những sản phẩm được yêu thích nhất
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {popularProducts.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/san-pham/${product.category}/${product.slug}`}
                                    className="group block bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="relative aspect-square overflow-hidden bg-slate-100">
                                        <img
                                            src={product.thumbnail}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        {product.tags.includes('hot') && (
                                            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                                                🔥 HOT
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
                                            {product.name}
                                        </h3>
                                        <div className="text-xl font-bold text-pink-600">
                                            {product.price.toLocaleString('vi-VN')}đ
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="text-center mt-8">
                            <Link
                                href="/san-pham"
                                className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium"
                            >
                                Xem tất cả sản phẩm
                                <ChevronRight size={16} />
                            </Link>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default function SearchResultsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block w-12 h-12 border-4 border-pink-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-slate-600">Đang tải...</p>
                </div>
            </div>
        }>
            <SearchResultsContent />
        </Suspense>
    )
}
