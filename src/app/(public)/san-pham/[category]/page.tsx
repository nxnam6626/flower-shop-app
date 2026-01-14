'use client'

import { useState, useEffect, useMemo } from 'react'
import { useParams } from 'next/navigation'
import FilterSidebar from '@/components/public/products/FilterSidebar'
import ProductGrid from '@/components/public/products/ProductGrid'
import { Product, ActiveFilters, SortOption } from '@/types/product'
import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'

// Import product data
import productsData from '@/data/products.json'

export default function ProductListingPage() {
    const params = useParams()
    const category = params.category as string

    const [loading, setLoading] = useState(true)
    const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
        category,
        colors: [],
        occasions: [],
        sortBy: 'newest'
    })

    // Get category info
    const categoryInfo = productsData.categories.find(cat => cat.slug === category)

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        setLoading(true)

        let filtered = productsData.products.filter(p => p.category === category)

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

        setTimeout(() => setLoading(false), 300) // Simulate loading
        return sorted
    }, [category, activeFilters])

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
            category,
            colors: [],
            occasions: [],
            sortBy: activeFilters.sortBy
        })
    }

    const handleSortChange = (sortBy: string) => {
        setActiveFilters(prev => ({ ...prev, sortBy: sortBy as SortOption }))
    }

    if (!categoryInfo) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold text-slate-800 mb-4">
                    Không tìm thấy danh mục
                </h1>
                <Link
                    href="/"
                    className="text-pink-600 hover:text-pink-700 font-medium"
                >
                    Quay về trang chủ
                </Link>
            </div>
        )
    }

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
                                <Link
                                    href="/san-pham"
                                    className="text-slate-600 hover:text-pink-600 transition-colors"
                                >
                                    Sản phẩm
                                </Link>
                            </li>
                            <ChevronRight size={16} className="text-slate-400" />
                            <li className="font-medium text-pink-600" aria-current="page">
                                {categoryInfo.name}
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Page Header */}
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 border-b border-pink-100">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                            <span className="text-2xl">🌸</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                            {categoryInfo.name}
                        </h1>
                    </div>
                    <p className="text-slate-600 max-w-2xl">
                        {categoryInfo.description} - Hiện có{' '}
                        <span className="font-bold text-pink-600">{categoryInfo.count}</span> sản phẩm
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar Filters - Hidden on mobile, visible on lg+ */}
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

                    {/* Mobile Filter Button */}
                    <div className="lg:hidden fixed bottom-6 right-6 z-40">
                        <button
                            onClick={() => {
                                // TODO: Open mobile filter modal
                                alert('Mobile filters coming soon!')
                            }}
                            className="w-14 h-14 bg-pink-600 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-pink-700 transition-all hover:scale-110"
                            aria-label="Open filters"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                            </svg>
                        </button>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <ProductGrid
                            products={filteredProducts}
                            loading={loading}
                            sortBy={activeFilters.sortBy}
                            onSortChange={handleSortChange}
                        />
                    </div>

                </div>
            </div>

            {/* Mobile Filter Modal - Placeholder */}
            {/* TODO: Implement mobile filter modal */}

        </div>
    )
}
