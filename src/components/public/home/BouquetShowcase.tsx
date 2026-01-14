'use client'

import Image from 'next/image'
import Link from 'next/link'
import SpecialBannerCard from '@/components/public/home/SpecialBannerCardHome'
import ProductCard from './ProductCardHome'

// 1. Mock Data (Dữ liệu từ hình ảnh Bó hoa)
const BOUQUETS = [
    // Sản phẩm 1, 2, 3 (Sẽ nằm sau Banner)
    { id: 1, name: 'Falling In Love – B5', price: 570000, image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=800&q=80' },
    { id: 2, name: 'Vườn Ngọc – BH11', price: 549000, image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80' },
    { id: 3, name: 'Hạ Ngọt', price: 493000, image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80' },
    // Hàng 2
    { id: 4, name: 'Màu Tình Yêu', price: 580000, image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800&q=80' },
    { id: 5, name: 'My shoulder – Bờ vai', price: 680000, image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&q=80' },
    { id: 6, name: 'My friends', price: 480000, image: 'https://images.unsplash.com/photo-1507290439931-a861b5a38200?w=800&q=80' },
    // Sản phẩm giảm giá đặc biệt
    { id: 7, name: 'Lady Day', price: 2370000, originalPrice: 2500000, image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800&q=80' },
]

export default function BouquetShowcase() {
    return (
        <section className="py-12 bg-white border-t border-gray-50">
            <div className="container mx-auto px-4">

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    <SpecialBannerCard
                        title="Bó hoa"
                        image="/images/background-item-dacbiet-tim.jpg"
                        linkUrl="/kieu-dang/bo-hoa"
                        className="md:col-span-1"
                        titleColor="text-violet-900"
                        separatorColor="text-violet-700"
                    />

                    {BOUQUETS.map((product) => (
                        <ProductCard key={product.id} data={product} />
                    ))}

                </div>
            </div>
        </section>
    )
}
