import { Product } from '@/types/product'

/**
 * Search products by query string
 * Searches in: name, description, shortDescription, flowerType
 */
export function searchProducts(
    products: Product[],
    query: string
): Product[] {
    if (!query.trim()) return []

    const lowerQuery = query.toLowerCase().trim()

    return products.filter(p => {
        // Search in product name
        if (p.name.toLowerCase().includes(lowerQuery)) return true

        // Search in description
        if (p.description.toLowerCase().includes(lowerQuery)) return true

        // Search in short description
        if (p.shortDescription.toLowerCase().includes(lowerQuery)) return true

        // Search in flower type
        if (p.specifications.flowerType.toLowerCase().includes(lowerQuery)) return true

        // Search in category type
        if (p.specifications.type.toLowerCase().includes(lowerQuery)) return true

        return false
    })
}

/**
 * Save a search query to recent searches (localStorage)
 * Keeps only the last 5 unique searches
 */
export function saveRecentSearch(query: string): void {
    if (typeof window === 'undefined' || !query.trim()) return

    const recent = getRecentSearches()
    // Remove duplicate and add to front
    const updated = [query.trim(), ...recent.filter(q => q !== query.trim())].slice(0, 5)

    try {
        localStorage.setItem('recentSearches', JSON.stringify(updated))
    } catch (error) {
        console.error('Failed to save recent search:', error)
    }
}

/**
 * Get recent searches from localStorage
 */
export function getRecentSearches(): string[] {
    if (typeof window === 'undefined') return []

    try {
        const stored = localStorage.getItem('recentSearches')
        return stored ? JSON.parse(stored) : []
    } catch (error) {
        console.error('Failed to get recent searches:', error)
        return []
    }
}

/**
 * Clear all recent searches
 */
export function clearRecentSearches(): void {
    if (typeof window === 'undefined') return

    try {
        localStorage.removeItem('recentSearches')
    } catch (error) {
        console.error('Failed to clear recent searches:', error)
    }
}

/**
 * Highlight matching text in a string
 */
export function highlightMatch(text: string, query: string): string {
    if (!query.trim()) return text

    const regex = new RegExp(`(${query})`, 'gi')
    return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>')
}
