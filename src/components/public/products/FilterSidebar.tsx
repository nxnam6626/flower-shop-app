'use client'

import { useState } from 'react'
import { ChevronDown, X, Flower2 } from 'lucide-react'
import { PriceRange, ColorFilter, OccasionFilter } from '@/types/product'

interface FilterSidebarProps {
    filters: {
        priceRanges: PriceRange[]
        colors: ColorFilter[]
        occasions: OccasionFilter[]
    }
    activeFilters: {
        colors: string[]
        occasions: string[]
        priceRange?: string
    }
    onFilterChange: (filterType: 'colors' | 'occasions' | 'priceRange', value: string) => void
    onClearAll: () => void
}

export default function FilterSidebar({
    filters,
    activeFilters,
    onFilterChange,
    onClearAll
}: FilterSidebarProps) {
    const [expandedSections, setExpandedSections] = useState({
        price: true,
        color: true,
        occasion: true,
    })

    const toggleSection = (section: 'price' | 'color' | 'occasion') => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }))
    }

    const hasActiveFilters =
        activeFilters.colors.length > 0 ||
        activeFilters.occasions.length > 0 ||
        !!activeFilters.priceRange

    const activeFilterCount =
        activeFilters.colors.length +
        activeFilters.occasions.length +
        (activeFilters.priceRange ? 1 : 0)

    return (
        <aside className="w-full lg:w-72 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">

            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                    <Flower2 className="w-5 h-5 text-pink-500" />
                    <h3 className="text-lg font-bold text-slate-800">Bộ Lọc</h3>
                    {activeFilterCount > 0 && (
                        <span className="bg-pink-100 text-pink-600 text-xs font-bold px-2 py-0.5 rounded-full">
                            {activeFilterCount}
                        </span>
                    )}
                </div>
                {hasActiveFilters && (
                    <button
                        onClick={onClearAll}
                        className="text-xs text-pink-600 hover:text-pink-700 font-medium flex items-center gap-1 hover:bg-pink-50 px-2 py-1 rounded-lg transition-colors"
                        aria-label="Xóa tất cả bộ lọc"
                    >
                        <X size={14} />
                        Xóa hết
                    </button>
                )}
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
                <button
                    onClick={() => toggleSection('price')}
                    className="flex items-center justify-between w-full mb-3 group"
                    aria-expanded={expandedSections.price}
                >
                    <span className="font-semibold text-slate-700 group-hover:text-pink-600 transition-colors">
                        Khoảng Giá
                    </span>
                    <ChevronDown
                        className={`w-4 h-4 transition-all duration-300 ${expandedSections.price ? 'rotate-0 text-pink-500' : '-rotate-90 text-slate-400'
                            }`}
                    />
                </button>

                {expandedSections.price && (
                    <div className="space-y-2 animate-[fadeIn_0.2s_ease-out]">
                        {filters.priceRanges.map(range => (
                            <label
                                key={range.id}
                                className="flex items-center gap-3 cursor-pointer group py-1 px-2 rounded-lg hover:bg-pink-50 transition-colors"
                            >
                                <input
                                    type="radio"
                                    name="priceRange"
                                    value={range.id}
                                    checked={activeFilters.priceRange === range.id}
                                    onChange={(e) => onFilterChange('priceRange', e.target.value)}
                                    className="w-4 h-4 text-pink-600 focus:ring-pink-500 focus:ring-2 cursor-pointer"
                                />
                                <span className="text-sm text-slate-600 group-hover:text-pink-600 transition-colors flex-1">
                                    {range.label}
                                </span>
                                {activeFilters.priceRange === range.id && (
                                    <span className="text-pink-500 text-xs">✓</span>
                                )}
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-6"></div>

            {/* Color Filter */}
            <div className="mb-6">
                <button
                    onClick={() => toggleSection('color')}
                    className="flex items-center justify-between w-full mb-3 group"
                    aria-expanded={expandedSections.color}
                >
                    <span className="font-semibold text-slate-700 group-hover:text-pink-600 transition-colors">
                        Màu Sắc
                    </span>
                    <ChevronDown
                        className={`w-4 h-4 transition-all duration-300 ${expandedSections.color ? 'rotate-0 text-pink-500' : '-rotate-90 text-slate-400'
                            }`}
                    />
                </button>

                {expandedSections.color && (
                    <div className="grid grid-cols-3 gap-2 animate-[fadeIn_0.2s_ease-out]">
                        {filters.colors.map(color => {
                            const isActive = activeFilters.colors.includes(color.id)
                            return (
                                <button
                                    key={color.id}
                                    onClick={() => onFilterChange('colors', color.id)}
                                    className={`
                    flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 transition-all duration-200
                    ${isActive
                                            ? 'border-pink-500 bg-pink-50 shadow-md scale-105'
                                            : 'border-slate-200 hover:border-pink-300 hover:shadow-sm hover:scale-102'
                                        }
                  `}
                                    aria-pressed={isActive}
                                    aria-label={`Lọc theo màu ${color.name}`}
                                >
                                    <div className="relative">
                                        <div
                                            className="w-10 h-10 rounded-full border-2 border-white shadow-md transition-transform"
                                            style={{
                                                background: color.id === 'mixed'
                                                    ? 'linear-gradient(90deg, #EF4444, #EC4899, #F59E0B)'
                                                    : color.hex
                                            }}
                                        />
                                        {isActive && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                                                    <span className="text-pink-600 text-xs font-bold">✓</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-pink-600' : 'text-slate-600'
                                        }`}>
                                        {color.name}
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-6"></div>

            {/* Occasion Filter */}
            <div className="mb-6">
                <button
                    onClick={() => toggleSection('occasion')}
                    className="flex items-center justify-between w-full mb-3 group"
                    aria-expanded={expandedSections.occasion}
                >
                    <span className="font-semibold text-slate-700 group-hover:text-pink-600 transition-colors">
                        Dịp Đặc Biệt
                    </span>
                    <ChevronDown
                        className={`w-4 h-4 transition-all duration-300 ${expandedSections.occasion ? 'rotate-0 text-pink-500' : '-rotate-90 text-slate-400'
                            }`}
                    />
                </button>

                {expandedSections.occasion && (
                    <div className="space-y-1.5 animate-[fadeIn_0.2s_ease-out]">
                        {filters.occasions.map(occasion => {
                            const isActive = activeFilters.occasions.includes(occasion.id)
                            return (
                                <label
                                    key={occasion.id}
                                    className={`
                    flex items-center gap-3 cursor-pointer py-2 px-3 rounded-lg transition-all
                    ${isActive
                                            ? 'bg-pink-50 border-l-2 border-pink-500'
                                            : 'hover:bg-slate-50 border-l-2 border-transparent'
                                        }
                  `}
                                >
                                    <input
                                        type="checkbox"
                                        value={occasion.id}
                                        checked={isActive}
                                        onChange={(e) => onFilterChange('occasions', e.target.value)}
                                        className="w-4 h-4 text-pink-600 rounded focus:ring-pink-500 focus:ring-2 cursor-pointer"
                                    />
                                    <span className="text-lg">{occasion.icon}</span>
                                    <span className={`text-sm flex-1 transition-colors ${isActive ? 'text-pink-600 font-medium' : 'text-slate-600'
                                        }`}>
                                        {occasion.name}
                                    </span>
                                    {isActive && (
                                        <span className="text-pink-500 text-xs">✓</span>
                                    )}
                                </label>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* Active Filters Summary (Mobile friendly) */}
            {hasActiveFilters && (
                <div className="mt-6 pt-6 border-t border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                            Đang lọc
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {activeFilters.colors.map(colorId => {
                            const color = filters.colors.find(c => c.id === colorId)
                            return color ? (
                                <button
                                    key={colorId}
                                    onClick={() => onFilterChange('colors', colorId)}
                                    className="inline-flex items-center gap-1.5 bg-pink-100 text-pink-700 text-xs font-medium px-2.5 py-1 rounded-full hover:bg-pink-200 transition-colors"
                                >
                                    <span
                                        className="w-3 h-3 rounded-full border border-white"
                                        style={{ backgroundColor: color.hex }}
                                    />
                                    {color.name}
                                    <X size={12} />
                                </button>
                            ) : null
                        })}
                        {activeFilters.occasions.map(occasionId => {
                            const occasion = filters.occasions.find(o => o.id === occasionId)
                            return occasion ? (
                                <button
                                    key={occasionId}
                                    onClick={() => onFilterChange('occasions', occasionId)}
                                    className="inline-flex items-center gap-1.5 bg-pink-100 text-pink-700 text-xs font-medium px-2.5 py-1 rounded-full hover:bg-pink-200 transition-colors"
                                >
                                    {occasion.icon} {occasion.name}
                                    <X size={12} />
                                </button>
                            ) : null
                        })}
                    </div>
                </div>
            )}

            {/* Custom animations */}
            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </aside>
    )
}
