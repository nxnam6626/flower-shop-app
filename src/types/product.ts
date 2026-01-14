// Product Types for Flower Shop

export interface Product {
    id: string
    name: string
    slug: string
    category: string
    price: number
    originalPrice?: number | null
    discount?: number | null
    images: string[]
    thumbnail: string
    description: string
    shortDescription: string
    colors: string[]
    occasions: string[]
    tags: string[]
    stock: number
    inStock: boolean
    rating: number
    reviewCount: number
    specifications: ProductSpecifications
    care: string[]
    createdAt: string
    updatedAt: string
}

export interface ProductSpecifications {
    type: string
    flowerCount: number
    flowerType: string
    height: string
    freshness: string
}

export interface Category {
    id: string
    name: string
    slug: string
    icon: string
    description: string
    count: number
}

export interface PriceRange {
    id: string
    label: string
    min: number
    max: number
}

export interface ColorFilter {
    id: string
    name: string
    hex: string
}

export interface OccasionFilter {
    id: string
    name: string
    icon: string
}

export interface ProductFilters {
    priceRanges: PriceRange[]
    colors: ColorFilter[]
    occasions: OccasionFilter[]
}

export interface ProductData {
    products: Product[]
    categories: Category[]
    filters: ProductFilters
}

// Active filter state
export interface ActiveFilters {
    category?: string
    colors: string[]
    occasions: string[]
    priceRange?: string
    sortBy?: SortOption
    search?: string
}

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'popular' | 'rating'

export type ViewMode = 'grid' | 'list'

// Search and pagination
export interface ProductSearchParams {
    query?: string
    category?: string
    colors?: string[]
    occasions?: string[]
    priceMin?: number
    priceMax?: number
    sortBy?: SortOption
    page?: number
    limit?: number
}

export interface ProductSearchResult {
    products: Product[]
    total: number
    page: number
    totalPages: number
    hasMore: boolean
}

// Cart related types (for future use)
export interface CartItem {
    product: Product
    quantity: number
    customization?: {
        message?: string
        deliveryDate?: string
        deliveryTime?: string
    }
}

// Review types (for future use)
export interface ProductReview {
    id: string
    productId: string
    userId: string
    userName: string
    userAvatar?: string
    rating: number
    title: string
    comment: string
    images?: string[]
    helpful: number
    verified: boolean
    createdAt: string
}
