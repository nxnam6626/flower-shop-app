import { Product } from '@/types/product'

// Contact Configuration
const ZALO_ID = process.env.NEXT_PUBLIC_ZALO_ID || '0353894802'
const MESSENGER_PAGE_ID = process.env.NEXT_PUBLIC_MESSENGER_PAGE_ID || ''
const HOTLINE = '0353894802'

/**
 * Generate pre-filled message for product inquiry
 */
export function generateProductMessage(product: Product): string {
    const url = typeof window !== 'undefined' ? window.location.href : ''

    return `Xin chào shop! Em muốn tư vấn về:

🌸 Sản phẩm: ${product.name}
💰 Giá: ${product.price.toLocaleString('vi-VN')}đ
🔗 Link: ${url}

Em cần tư vấn thêm về màu sắc và thời gian giao hàng ạ!`
}

/**
 * Generate message for wishlist consultation (catalog browsing model)
 */
export function generateWishlistMessage(products: Product[]): string {
    if (products.length === 0) {
        return 'Xin chào shop! Em muốn được tư vấn về hoa ạ!'
    }

    const productList = products.map((product, index) =>
        `${index + 1}. ${product.name}\n   💰 ${product.price.toLocaleString('vi-VN')}đ`
    ).join('\n\n')

    const total = products.reduce((sum, p) => sum + p.price, 0)

    return `Xin chào shop! Em có ${products.length} sản phẩm yêu thích cần được tư vấn:

${productList}

💝 Tổng giá trị tham khảo: ~${total.toLocaleString('vi-VN')}đ

Em muốn được shop tư vấn thêm về:
- Màu sắc và kích thước phù hợp
- Thời gian giao hàng
- Khuyến mãi hoặc combo (nếu có)

Mong shop hỗ trợ tư vấn chi tiết ạ!`
}

/**
 * Generate general inquiry message
 */
export function generateGeneralMessage(subject?: string): string {
    return subject
        ? `Xin chào shop! Em muốn tư vấn về ${subject}.`
        : 'Xin chào shop! Em muốn được tư vấn về hoa ạ!'
}

/**
 * Open Zalo chat (no pre-filled message - Zalo doesn't support it)
 */
export function openZaloChat(message?: string): void {
    window.open(`https://zalo.me/${ZALO_ID}`, '_blank')
}

/**
 * Open Facebook Messenger chat
 */
export function openMessengerChat(message?: string): void {
    if (!MESSENGER_PAGE_ID) {
        console.warn('Messenger Page ID not configured')
        return
    }

    // Facebook Messenger deep link
    const messengerUrl = `https://m.me/${MESSENGER_PAGE_ID}`
    window.open(messengerUrl, '_blank')
}

/**
 * Dial phone number
 */
export function dialPhone(): void {
    window.location.href = `tel:${HOTLINE}`
}

/**
 * Get formatted hotline for display
 */
export function getHotline(): string {
    return HOTLINE
}

/**
 * Format phone number for display (Vietnamese format)
 */
export function formatPhoneNumber(phone: string): string {
    // Format: 0353 894 802
    if (phone.length === 10) {
        return `${phone.slice(0, 4)} ${phone.slice(4, 7)} ${phone.slice(7)}`
    }
    return phone
}
