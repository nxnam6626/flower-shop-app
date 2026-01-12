'use client'

import Image from 'next/image'
import Link from 'next/link'

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
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">

                {/* GRID LAYOUT: 4 Cột trên Desktop, 2 Cột trên Mobile */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">

                    {/* --- LOOP 3 SẢN PHẨM ĐẦU TIÊN --- */}
                    {PRODUCTS.slice(0, 3).map((product) => (
                        <ProductItem key={product.id} product={product} />
                    ))}

                    {/* --- CARD ĐẶC BIỆT: BANNER GIỎ HOA (Vị trí thứ 4) --- */}
                    <div className="relative aspect-[4/5] md:aspect-auto group overflow-hidden rounded-sm">
                        {/* Background Gradient Xanh/Tím giống hình */}
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-200 to-pink-300 opacity-90"></div>

                        {/* Nội dung bên trong Banner */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                            <div className="w-16 h-16 mb-2 opacity-20">
                                {/* Họa tiết trang trí mờ (Optional) */}
                                <svg viewBox="0 0 24 24" fill="currentColor" className="text-white"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" /></svg>
                            </div>

                            <h3 className="font-dancing text-4xl md:text-5xl text-white font-bold mb-1 drop-shadow-sm">
                                Giỏ hoa
                            </h3>
                            <p className="font-dancing text-white text-sm mb-6 opacity-80">ffffff</p> {/* Họa tiết text trang trí */}

                            <Link
                                href="/kieu-dang/gio-hoa"
                                className="bg-white text-pink-600 text-xs font-bold py-3 px-6 uppercase tracking-wider hover:bg-pink-50 transition-colors shadow-sm"
                            >
                                Xem toàn bộ →
                            </Link>
                        </div>
                    </div>

                    {/* --- LOOP CÁC SẢN PHẨM CÒN LẠI (Hàng 2) --- */}
                    {PRODUCTS.slice(3).map((product) => (
                        <ProductItem key={product.id} product={product} />
                    ))}

                </div>
            </div>
        </section>
    )
}

// Sub-component hiển thị từng sản phẩm (Tách ra cho gọn)
function ProductItem({ product }: { product: any }) {
    return (
        <div className="group cursor-pointer">
            <div className="relative aspect-square overflow-hidden mb-4">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Nút 'Thêm vào giỏ' hiện khi hover (Optional feature thường thấy) */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button className="w-full bg-white/90 text-gray-800 py-2 text-xs font-bold uppercase hover:bg-pink-600 hover:text-white shadow-lg transition-colors">
                        Xem chi tiết
                    </button>
                </div>
            </div>

            <div className="text-center space-y-1">
                <h4 className="font-serif text-gray-800 text-base group-hover:text-pink-600 transition-colors">
                    {product.name}
                </h4>
                <p className="text-pink-600 font-bold text-sm">
                    {product.price.toLocaleString('vi-VN')} ₫
                </p>
            </div>
        </div>
    )
}