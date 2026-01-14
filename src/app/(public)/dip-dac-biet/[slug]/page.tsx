'use client'

import { useState, useEffect, useMemo } from 'react'
import { useParams } from 'next/navigation'
import FilterSidebar from '@/components/public/products/FilterSidebar'
import ProductGrid from '@/components/public/products/ProductGrid'
import { Product, ActiveFilters, SortOption } from '@/types/product'
import { ChevronRight, Home, Calendar } from 'lucide-react'
import Link from 'next/link'

// Import product data
import productsData from '@/data/products.json'

// Occasion details map
const OCCASION_DETAILS: Record<string, {
    name: string
    emoji: string
    description: string
    color: string
    bgGradient: string
}> = {
    'sinh-nhat': {
        name: 'Sinh Nhật',
        emoji: '🎂',
        description: 'Hoa tươi thắm cho ngày sinh nhật đáng nhớ',
        color: 'pink',
        bgGradient: 'from-pink-500 to-rose-500'
    },
    'valentine': {
        name: 'Valentine',
        emoji: '💝',
        description: 'Tỏ tình lãng mạn với hoa tươi đẹp',
        color: 'red',
        bgGradient: 'from-red-500 to-pink-500'
    },
    'ky-niem': {
        name: 'Kỷ Niệm',
        emoji: '💍',
        description: 'Kỷ niệm những khoảnh khắc đáng nhớ',
        color: 'purple',
        bgGradient: 'from-purple-500 to-pink-500'
    },
    'dam-cuoi': {
        name: 'Đám Cưới',
        emoji: '💐',
        description: 'Hoa cưới sang trọng cho ngày trọng đại',
        color: 'pink',
        bgGradient: 'from-pink-400 to-rose-400'
    },
    'tot-nghiep': {
        name: 'Tốt Nghiệp',
        emoji: '🎓',
        description: 'Chúc mừng thành công rực rỡ',
        color: 'blue',
        bgGradient: 'from-blue-500 to-cyan-500'
    },
    'khai-truong': {
        name: 'Khai Trương',
        emoji: '🌟',
        description: 'Phát tài phát lộc với hoa tươi đẹp',
        color: 'yellow',
        bgGradient: 'from-yellow-500 to-orange-500'
    },
}

// Map slug to occasion ID
const SLUG_TO_OCCASION_ID: Record<string, string> = {
    'sinh-nhat': 'birthday',
    'valentine': 'valentine',
    'ky-niem': 'anniversary',
    'dam-cuoi': 'wedding',
    'tot-nghiep': 'graduation',
    'khai-truong': 'opening',
}

export default function OccasionProductsPage() {
    const params = useParams()
    const slug = params.slug as string

    const [loading, setLoading] = useState(true)
    const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
        occasions: [],
        colors: [],
        sortBy: 'newest'
    })

    const occasionId = SLUG_TO_OCCASION_ID[slug]
    const occasionDetails = OCCASION_DETAILS[slug]

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        setLoading(true)

        // Start with products for this occasion
        let filtered = productsData.products.filter(p => p.occasions.includes(occasionId))

        // Apply color filter
        if (activeFilters.colors.length > 0) {
            filtered = filtered.filter(p =>
                p.colors.some(c => activeFilters.colors.includes(c))
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
    }, [occasionId, activeFilters])

    const handleFilterChange = (filterType: 'colors' | 'occasions' | 'priceRange', value: string) => {
        setActiveFilters(prev => {
            if (filterType === 'priceRange') {
                return {
                    ...prev,
                    priceRange: prev.priceRange === value ? undefined : value
                }
            } else if (filterType === 'colors') {
                const currentArray = prev.colors
                const newArray = currentArray.includes(value)
                    ? currentArray.filter(v => v !== value)
                    : [...currentArray, value]
                return { ...prev, colors: newArray }
            }
            return prev
        })
    }

    const handleClearAll = () => {
        setActiveFilters({
            occasions: [],
            colors: [],
            sortBy: activeFilters.sortBy
        })
    }

    const handleSortChange = (sortBy: string) => {
        setActiveFilters(prev => ({ ...prev, sortBy: sortBy as SortOption }))
    }

    if (!occasionDetails) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold text-slate-800 mb-4">
                    Không tìm thấy dịp
                </h1>
                <Link
                    href="/dip-dac-biet"
                    className="text-pink-600 hover:text-pink-700 font-medium"
                >
                    Quay về danh sách dịp đặc biệt
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
                                    href="/dip-dac-biet"
                                    className="text-slate-600 hover:text-pink-600 transition-colors"
                                >
                                    Dịp Đặc Biệt
                                </Link>
                            </li>
                            <ChevronRight size={16} className="text-slate-400" />
                            <li className="font-medium text-pink-600" aria-current="page">
                                {occasionDetails.name}
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Page Header */}
            <div className={`bg-gradient-to-r ${occasionDetails.bgGradient} border-b border-pink-100`}>
                <div className="container mx-auto px-4 py-12">
                    <div className="flex items-center gap-4 mb-3">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg text-4xl">
                            {occasionDetails.emoji}
                        </div>
                        <div className="text-white">
                            <h1 className="text-4xl md:text-5xl font-bold mb-2">
                                Hoa {occasionDetails.name}
                            </h1>
                            <p className="text-lg text-white/90">
                                {occasionDetails.description}
                            </p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 flex-wrap mt-6">
                        <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-white">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm font-medium">
                                {filteredProducts.length} sản phẩm phù hợp
                            </span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-white">
                            <span className="text-sm font-medium">🚚 Giao Trong 2h</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-white">
                            <span className="text-sm font-medium">🎁 Miễn Phí Thiệp</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar Filters */}
                    <div className="hidden lg:block">
                        <FilterSidebar
                            filters={productsData.filters}
                            activeFilters={{
                                colors: activeFilters.colors,
                                occasions: [], // Hide occasion filters since we're already filtered
                                priceRange: activeFilters.priceRange,
                            }}
                            onFilterChange={handleFilterChange}
                            onClearAll={handleClearAll}
                        />
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

        </div>
    )
}
