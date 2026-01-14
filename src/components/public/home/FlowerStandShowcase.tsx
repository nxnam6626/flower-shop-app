'use client'

import ProductCard from './ProductCardHome'
import SpecialBannerCard from './SpecialBannerCardHome'

// 1. Mock Data: Dành cho KỆ HOA (Thường là hoa khai trương, chúc mừng, giá cao hơn)
const STAND_PRODUCTS = [
    { id: 201, name: 'Đại Phát Đại Lợi', price: 1500000, image: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=800&q=80' },
    { id: 202, name: 'Kệ Hoa Khai Trương - KT01', price: 2100000, image: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=800&q=80' },
    { id: 203, name: 'Vững Bước Thành Công', price: 1850000, image: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=800&q=80' },
    // Vị trí số 4 dành cho Banner Kệ Hoa
    { id: 204, name: 'Tiền Tài Tấn Tới', price: 1250000, image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&q=80' },
    { id: 205, name: 'Hưng Thịnh - KT88', price: 2500000, image: 'https://images.unsplash.com/photo-1507290439931-a861b5a38200?w=800&q=80' },
    { id: 206, name: 'Chia Buồn - CB05', price: 1100000, image: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=800&q=80' },
    { id: 207, name: 'Luxury Stand Gold', price: 3200000, image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800&q=80' },
]

export default function FlowerStandShowcase() {
    return (
        <section className="py-12 bg-white border-t border-gray-50">
            <div className="container mx-auto px-4">

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    <SpecialBannerCard
                        title="Kệ hoa"
                        image="/images/background-item-dacbiet-hong.jpg"
                        linkUrl="/kieu-dang/ke-hoa"
                        className="md:col-span-1"
                        titleColor="text-pink-900"
                        separatorColor="text-pink-700"
                    />

                    {STAND_PRODUCTS.map((product) => (
                        <ProductCard key={product.id} data={product} />
                    ))}

                </div>
            </div>
        </section>
    )
}