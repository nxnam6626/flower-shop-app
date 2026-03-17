'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react'
import { Product } from '@/types/product'

interface WishlistContextType {
    wishlist: Product[]
    addToWishlist: (product: Product) => Promise<void>
    removeFromWishlist: (productId: string) => Promise<void>
    isInWishlist: (productId: string) => boolean
    clearWishlist: () => void
    wishlistCount: number
    isLoading: boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

const WISHLIST_STORAGE_KEY = 'flower-shop-wishlist'
const DEBOUNCE_DELAY = 300 // ms

// Simulated API call (replace with real API when backend is ready)
const syncWishlistToAPI = async (wishlist: Product[]): Promise<void> => {
    // TODO: Replace with actual API call when authentication is implemented
    // Example: await fetch('/api/wishlist', { method: 'POST', body: JSON.stringify(wishlist) })

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100))

    // For now, just log (no-op)
    console.log('Wishlist synced (localStorage only):', wishlist.length, 'items')
}

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [wishlist, setWishlist] = useState<Product[]>([])
    const [mounted, setMounted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // Debounce timer ref
    const syncTimerRef = useRef<NodeJS.Timeout | null>(null)
    const pendingWishlistRef = useRef<Product[] | null>(null)

    // Load from localStorage on mount
    useEffect(() => {
        setMounted(true)
        try {
            const stored = localStorage.getItem(WISHLIST_STORAGE_KEY)
            if (stored) {
                const parsed = JSON.parse(stored)
                setWishlist(parsed)

                // TODO: When auth is implemented, sync localStorage with server on mount
                // if (isAuthenticated) {
                //   syncLocalStorageWithServer(parsed)
                // }
            }
        } catch (error) {
            console.error('Failed to load wishlist:', error)
        }
    }, [])

    // Debounced sync to localStorage and API
    const debouncedSync = useCallback((newWishlist: Product[]) => {
        // Store pending wishlist
        pendingWishlistRef.current = newWishlist

        // Clear existing timer
        if (syncTimerRef.current) {
            clearTimeout(syncTimerRef.current)
        }

        // Set new timer
        syncTimerRef.current = setTimeout(async () => {
            if (!pendingWishlistRef.current) return

            try {
                // Save to localStorage
                localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(pendingWishlistRef.current))

                // Sync to API (if authenticated)
                // TODO: Only call API if user is logged in
                // if (isAuthenticated) {
                //   await syncWishlistToAPI(pendingWishlistRef.current)
                // }

                setIsLoading(false)
            } catch (error) {
                console.error('Failed to sync wishlist:', error)
                setIsLoading(false)

                // TODO: Show error toast notification
                // toast.error('Không thể lưu danh sách yêu thích')
            } finally {
                pendingWishlistRef.current = null
            }
        }, DEBOUNCE_DELAY)
    }, [])

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (syncTimerRef.current) {
                clearTimeout(syncTimerRef.current)
            }
        }
    }, [])

    /**
     * Add product to wishlist with Optimistic UI
     */
    const addToWishlist = useCallback(async (product: Product) => {
        // Optimistic update - update UI immediately
        setWishlist(prev => {
            // Prevent duplicates
            if (prev.some(p => p.id === product.id)) {
                return prev
            }
            const newWishlist = [...prev, product]

            // Debounced sync
            if (mounted) {
                setIsLoading(true)
                debouncedSync(newWishlist)
            }

            return newWishlist
        })

        // TODO: When API is ready, handle errors and rollback
        // try {
        //   if (isAuthenticated) {
        //     await api.addToWishlist(product.id)
        //   }
        // } catch (error) {
        //   // Rollback on error
        //   setWishlist(prev => prev.filter(p => p.id !== product.id))
        //   toast.error('Không thể thêm vào danh sách yêu thích')
        // }
    }, [mounted, debouncedSync])

    /**
     * Remove product from wishlist with Optimistic UI
     */
    const removeFromWishlist = useCallback(async (productId: string) => {
        // Store previous state for potential rollback
        const previousWishlist = wishlist

        // Optimistic update - update UI immediately
        setWishlist(prev => {
            const newWishlist = prev.filter(p => p.id !== productId)

            // Debounced sync
            if (mounted) {
                setIsLoading(true)
                debouncedSync(newWishlist)
            }

            return newWishlist
        })

        // TODO: When API is ready, handle errors and rollback
        // try {
        //   if (isAuthenticated) {
        //     await api.removeFromWishlist(productId)
        //   }
        // } catch (error) {
        //   // Rollback on error
        //   setWishlist(previousWishlist)
        //   toast.error('Không thể xóa khỏi danh sách yêu thích')
        // }
    }, [wishlist, mounted, debouncedSync])

    const isInWishlist = useCallback((productId: string): boolean => {
        return wishlist.some(p => p.id === productId)
    }, [wishlist])

    const clearWishlist = useCallback(() => {
        setWishlist([])
        localStorage.removeItem(WISHLIST_STORAGE_KEY)

        // TODO: Clear on server if authenticated
        // if (isAuthenticated) {
        //   api.clearWishlist()
        // }
    }, [])

    const value: WishlistContextType = {
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        wishlistCount: wishlist.length,
        isLoading
    }

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    )
}

export function useWishlist() {
    const context = useContext(WishlistContext)
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider')
    }
    return context
}

/**
 * TODO: Sync localStorage to server when user logs in
 * This preserves guest wishlist items after authentication
 * 
 * @example
 * async function syncGuestWishlistOnLogin(userId: string) {
 *   const guestWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY)
 *   if (guestWishlist) {
 *     const items = JSON.parse(guestWishlist)
 *     await api.mergeWishlist(userId, items)
 *     localStorage.removeItem(WISHLIST_STORAGE_KEY)
 *   }
 * }
 */
