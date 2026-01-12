'use client'

import Image from 'next/image'
import Link from 'next/link'

// 1. Mock Data (Dữ liệu từ hình ảnh Bó hoa)
const BOUQUETS = [
    // Sản phẩm 1, 2, 3 (Sẽ nằm sau Banner)
    { id: 1, name: 'Falling In Love – B5', price: 570000, image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=800&q=80' },
    { id: 2, name: 'Vườn Ngọc – BH11', price: 549000, image: 'https://images.unsplash.com/photo-1599577583696-e24c538e12d4?w=800&q=80' },
    { id: 3, name: 'Hạ Ngọt', price: 493000, image: 'https://images.unsplash.com/photo-1589244159943-460088ed5b92?w=800&q=80' },
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

                    {/* --- VỊ TRÍ 1: BANNER BÓ HOA (Đầu tiên) --- */}
                    <div className="relative aspect-[4/5] md:aspect-auto group overflow-hidden rounded-sm col-span-1">
                        {/* Background Gradient khác biệt chút (Hồng/Xanh) */}
                        <div className="absolute inset-0 bg-gradient-to-bl from-pink-200 via-blue-100 to-white opacity-90"></div>

                        {/* Khung viền trắng trang trí */}
                        <div className="absolute inset-4 border border-white z-10"></div>

                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-20">
                            <h3 className="font-dancing text-4xl md:text-5xl text-white font-bold mb-1 drop-shadow-md text-stroke">
                                Bó hoa
                            </h3>
                            {/* Họa tiết trang trí dưới chữ */}
                            <div className="text-white opacity-80 mb-6 text-xs tracking-widest">
                                ffffff
                            </div>

                            <Link
                                href="/kieu-dang/bo-hoa"
                                className="bg-white text-pink-500 text-xs font-bold py-3 px-6 uppercase tracking-wider hover:bg-pink-50 transition-colors shadow-sm border border-pink-100"
                            >
                                Xem toàn bộ →
                            </Link>
                        </div>
                    </div>

                    {/* --- CÁC SẢN PHẨM CÒN LẠI --- */}
                    {BOUQUETS.map((product) => (
                        <ProductItem key={product.id} product={product} />
                    ))}

                </div>
            </div>
        </section>
    )
}

function ProductItem({ product }: { product: any }) {
    return (
        <div className="group cursor-pointer flex flex-col h-full">
            <div className="relative aspect-square overflow-hidden mb-4 bg-gray-100">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Badge Sale (Nếu có giá cũ) */}
                {product.originalPrice && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm shadow-sm">
                        - {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </div>
                )}

                {/* Nút Xem chi tiết */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button className="w-full bg-white/90 text-gray-800 py-2 text-xs font-bold uppercase hover:bg-pink-600 hover:text-white shadow-lg transition-colors">
                        Xem chi tiết
                    </button>
                </div>
            </div>

            <div className="text-center space-y-1 mt-auto">
                <h4 className="font-serif text-gray-800 text-base group-hover:text-pink-600 transition-colors line-clamp-1">
                    {product.name}
                </h4>

                <div className="flex items-center justify-center gap-2">
                    {/* Giá cũ (Gạch ngang) */}
                    {product.originalPrice && (
                        <span className="text-gray-400 text-xs line-through decoration-gray-400">
                            {product.originalPrice.toLocaleString('vi-VN')} ₫
                        </span>
                    )}

                    {/* Giá hiện tại */}
                    <p className="text-pink-600 font-bold text-sm">
                        {product.price.toLocaleString('vi-VN')} ₫
                    </p>
                </div>
            </div>
        </div>
    )
}