'use client'

import ProductCard from './ProductCardHome'
import SpecialBannerCard from './SpecialBannerCardHome'

// 1. Mock Data (Dữ liệu giả lập từ hình ảnh)
const PRODUCTS = [
    { id: 1, name: 'Fall in love', price: 510000, image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&q=80' },
    { id: 2, name: 'Ngày Thơ – GH02', price: 890000, image: 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?w=800&q=80' },
    { id: 3, name: 'Vạn Sự May Mắn', price: 550000, image: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=800&q=80' },
    // Vị trí số 4 dành cho Banner
    { id: 4, name: 'Gọi nắng', price: 449000, image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=800&q=80' },
    { id: 5, name: 'Moonlight – GH005', price: 670000, image: 'https://images.unsplash.com/photo-1507290439931-a861b5a38200?w=800&q=80' },
    { id: 6, name: 'Sự Ái Mộ – GD030', price: 649000, image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800&q=80' },
    { id: 7, name: 'Day for happy', price: 490000, image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=800&q=80' },
]

export default function FlowerBasketShowcase() {
    return (
        <section className="py-20 bg-[#FDFCFC] relative overflow-hidden">
            {/* Subtle Floral Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #BE185D 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

            <div className="container mx-auto px-4 relative z-10">

                {/* GRID LAYOUT: 4 Cột trên Desktop, 2 Cột trên Mobile */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-x-8 md:gap-y-12">

                    {/* --- LOOP 3 SẢN PHẨM ĐẦU TIÊN --- */}
                    {PRODUCTS.slice(0, 3).map((product, index) => (
                        <ProductCard key={product.id} data={product} />
                    ))}

                    {/* --- CARD ĐẶC BIỆT: BANNER GIỎ HOA (Vị trí thứ 4) --- */}
                    <SpecialBannerCard
                        title="Giỏ hoa"
                        image="/images/background-item-dacbiet.jpg"
                        linkUrl="/kieu-dang/gio-hoa"
                        className="md:col-span-1"
                        titleColor="text-teal-900"
                        separatorColor="text-slate-700"
                    />

                    {/* --- LOOP CÁC SẢN PHẨM CÒN LẠI (Hàng 2) --- */}
                    {PRODUCTS.slice(3).map((product, index) => (
                        <ProductCard key={product.id} data={product} index={index + 3} />
                    ))}

                </div>
            </div>
        </section>
    )
}
