'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, Eye, ShoppingBag } from 'lucide-react'

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
                        <ProductItem key={product.id} product={product} index={index} />
                    ))}

                    {/* --- CARD ĐẶC BIỆT: BANNER GIỎ HOA (Vị trí thứ 4) --- */}
                    <div className="relative aspect-[4/5] md:aspect-auto group overflow-hidden rounded-sm shadow-md transition-all hover:shadow-2xl hover:-translate-y-1 duration-500 animate-fade-in-up md:col-span-1" style={{ animationDelay: '300ms' }}>
                        {/* Background Image */}
                        <div className="absolute inset-0 bg-gray-100">
                            <Image
                                src="/images/background-item-dacbiet.jpg"
                                alt="Flower Basket Background"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            {/* Full-size Gradient Overlay for Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-80 pointer-events-none"></div>
                        </div>



                        {/* Content Container (Frosted Glass Effect) */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-20">

                            {/* Glass background for text area only */}
                            <div className="absolute inset-[4.5rem] bg-white/10 backdrop-blur-[2px] shadow-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-sm"></div>
                            <div className='absolute inset-[4.5rem] border border-white/90 z-10 pointer-events-none'></div>

                            {/* Title with Shadow - Enhanced for Readability */}
                            <h3 className="relative text-5xl lg:text-6xl text-teal-900 font-bold mb-3 z-30"
                                style={{
                                    fontFamily: "'Dancing Script', cursive",
                                    textShadow: '0px 2px 5px rgba(0,0,0,0.5), 0px 5px 15px rgba(0,0,0,0.2)'
                                }}>
                                Giỏ hoa
                            </h3>

                            {/* Decorative Separator - Calligraphy Swirl */}
                            <div className="relative mb-8 text-slate-700 scale-100 z-30 drop-shadow-md">
                                <svg width="100" height="15" viewBox="0 0 100 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {/* Đường uốn lượn trái */}
                                    <path d="M50 7.5 C 40 7.5, 35 12, 25 12 C 15 12, 10 3, 0 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />

                                    {/* Đường uốn lượn phải */}
                                    <path d="M50 7.5 C 60 7.5, 65 12, 75 12 C 85 12, 90 3, 100 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />

                                    {/* Hình thoi ở giữa */}
                                    <rect x="47" y="4.5" width="6" height="6" transform="rotate(45 50 7.5)" fill="currentColor" />
                                </svg>
                            </div>

                            {/* Button */}
                            <Link
                                href="/kieu-dang/gio-hoa"
                                className="relative bg-white text-[#3B82F6] px-6 py-2.5 text-[10px] lg:text-xs font-bold uppercase tracking-widest shadow-lg hover:bg-[#F0F9FF] hover:scale-105 hover:shadow-xl transition-all duration-300 box-border border border-white/50 rounded-sm whitespace-nowrap z-30"
                            >
                                Xem toàn bộ →
                            </Link>
                        </div>
                    </div>

                    {/* --- LOOP CÁC SẢN PHẨM CÒN LẠI (Hàng 2) --- */}
                    {PRODUCTS.slice(3).map((product, index) => (
                        <ProductItem key={product.id} product={product} index={index + 3} />
                    ))}

                </div>
            </div>
        </section>
    )
}

// Sub-component hiển thị từng sản phẩm (Tách ra cho gọn)
function ProductItem({ product, index }: { product: any, index: number }) {
    return (
        <div
            className="group cursor-pointer flex flex-col items-center animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Image Frame with Artistic Touch */}
            <div className="relative aspect-square w-full overflow-hidden mb-5 bg-white shadow-sm group-hover:shadow-2xl transition-all duration-500 rounded-sm group-hover:-translate-y-1">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay layer for depth */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Artistic Inner Border Frame */}
                <div className="absolute inset-3 border border-white/70 scale-95 group-hover:scale-100 opacity-80 group-hover:opacity-100 z-10 pointer-events-none transition-all duration-500 ease-out"></div>

                {/* Floating Action Icons (Right) */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-10 group-hover:translate-x-0 transition-transform duration-300 delay-75">
                    <button className="w-8 h-8 lg:w-9 lg:h-9 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-pink-600 hover:text-white shadow-md transition-colors" title="Thêm vào giỏ">
                        <ShoppingBag size={16} />
                    </button>
                    <button className="w-8 h-8 lg:w-9 lg:h-9 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-pink-600 hover:text-white shadow-md transition-colors" title="Yêu thích">
                        <Heart size={16} />
                    </button>
                </div>

                {/* Elegant Quick View Button (Slide Up) */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out w-max">
                    <button className="bg-white/95 backdrop-blur-sm px-5 py-2 text-xs font-bold uppercase tracking-widest text-gray-800 hover:text-pink-600 hover:bg-white shadow-xl border border-white/50 rounded-full flex items-center gap-2 whitespace-nowrap">
                        <Eye size={14} /> Xem nhanh
                    </button>
                </div>
            </div>

            {/* Typography Refinement */}
            <div className="text-center space-y-2 relative z-10 w-full px-2">
                <h4 className="font-playfair text-xl text-gray-800 font-bold italic group-hover:text-pink-600 transition-colors duration-300 tracking-wide line-clamp-1">
                    {product.name}
                </h4>

                {/* Artistic Separator: Line - Flower - Line */}
                <div className="flex items-center justify-center gap-2 my-2 opacity-60 group-hover:opacity-100 group-hover:gap-3 transition-all duration-500">
                    <span className="h-[1px] w-3 bg-pink-300 group-hover:w-6 transition-all duration-500"></span>
                    <span className="text-[10px] text-pink-400">❀</span>
                    <span className="h-[1px] w-3 bg-pink-300 group-hover:w-6 transition-all duration-500"></span>
                </div>

                <p className="text-gray-900 font-semibold text-lg tracking-wider font-sans group-hover:text-pink-600 transition-colors">
                    {product.price.toLocaleString('vi-VN')} <span className="text-sm align-top text-gray-400 group-hover:text-pink-400">₫</span>
                </p>
            </div>
        </div>
    )
}