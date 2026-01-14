'use client'

import ProductCard from './ProductCardHome'
import SpecialBannerCard from './SpecialBannerCardHome'

// 1. Mock Data: Dành cho HỘP HOA
const BOX_PRODUCTS = [
    { id: 101, name: 'Hộp hoa - First Love', price: 650000, image: 'https://images.unsplash.com/photo-1599733589046-10c005739ef9?w=800&q=80' },
    { id: 102, name: 'Box of Sunshine', price: 590000, image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80' },
    { id: 103, name: 'Hộp Gỗ Mộc - HG01', price: 720000, image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80' },
    // Vị trí số 4 dành cho Banner Hộp hoa
    { id: 104, name: 'Sweet Box - Pink', price: 480000, image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80' },
    { id: 105, name: 'Luxury Box Red', price: 1200000, image: 'https://images.unsplash.com/photo-1589244159943-460088ed5c92?w=800&q=80' },
    { id: 106, name: 'Hộp Tim Yêu Thương', price: 950000, image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80' },
    { id: 107, name: 'Elegant Blue Box', price: 850000, image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80' },
]

export default function FlowerBoxShowcase() {
    return (
        // ĐỔI NỀN: Dùng bg-purple-50 (tím nhạt) để so le với section trước
        <section className="py-20 bg-purple-50 relative overflow-hidden">
            
            {/* HỌA TIẾT NỀN: Đổi màu chấm sang tím đậm hơn một chút (#8B5CF6 - Violet) để tệp màu */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #8B5CF6 1px, transparent 0)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="container mx-auto px-4 relative z-10">

                {/* GRID LAYOUT: Giữ nguyên cấu trúc 4 cột */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-x-8 md:gap-y-12">

                    {/* --- LOOP 3 SẢN PHẨM ĐẦU TIÊN --- */}
                    {BOX_PRODUCTS.slice(0, 3).map((product) => (
                        <ProductCard key={product.id} data={product} />
                    ))}

                    {/* --- CARD ĐẶC BIỆT: BANNER HỘP HOA (Vị trí thứ 4) --- */}
                    <SpecialBannerCard
                        title="Hộp hoa"
                        image="/images/background-item-dacbiet-cam.jpg"
                        linkUrl="/kieu-dang/hop-hoa"
                        className="md:col-span-1"
                        titleColor="text-orange-900"
                        separatorColor="text-orange-700" 
                    />

                    {/* --- LOOP CÁC SẢN PHẨM CÒN LẠI --- */}
                    {BOX_PRODUCTS.slice(3).map((product, index) => (
                        <ProductCard key={product.id} data={product} index={index + 3} />
                    ))}

                </div>
            </div>
        </section>
    )
}