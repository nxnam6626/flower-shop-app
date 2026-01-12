'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Heart, Eye, ShoppingBag } from 'lucide-react'

// 1. Dữ liệu giả lập (Mock Data) - Cần ít nhất 8 item để demo slide
const MOCK_PRODUCTS = [
    { id: 1, name: "Open my mind", price: 550000, oldPrice: null, image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=800&q=80" },
    { id: 2, name: "Kitkat Socola", price: 750000, oldPrice: 900000, image: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800&q=80" },
    { id: 3, name: "Nét hoa BH-017", price: 450000, oldPrice: null, image: "https://images.unsplash.com/photo-1494955870715-979ca4f13bf0?w=800&q=80" },
    { id: 4, name: "Đến Bên Anh", price: 595000, oldPrice: null, image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=800&q=80" },
    { id: 5, name: "Hồng Đỏ Thắm", price: 600000, oldPrice: 700000, image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&q=80" },
    { id: 6, name: "Baby Trắng Tinh", price: 300000, oldPrice: null, image: "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?w=800&q=80" },
    { id: 7, name: "Hướng Dương Vàng", price: 450000, oldPrice: 500000, image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=800&q=80" },
    { id: 8, name: "Tulip Mùa Xuân", price: 890000, oldPrice: null, image: "https://images.unsplash.com/photo-1507290439931-a861b5a38200?w=800&q=80" },
]

export default function FeaturedCollection() {
    const [activeIndex, setActiveIndex] = useState(0)

    // Hàm chuyển slide
    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 4 >= MOCK_PRODUCTS.length ? 0 : prev + 4))
    }

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 4 < 0 ? MOCK_PRODUCTS.length - 4 : prev - 4))
    }

    // 2. Auto-play 5 giây
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide()
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    // Lấy ra 4 sản phẩm hiện tại để hiển thị ở 4 góc
    // Nếu mảng lẻ, cần logic xử lý thêm, ở đây giả sử data luôn chia hết cho 4 hoặc lặp lại
    const visibleProducts = [
        MOCK_PRODUCTS[(activeIndex) % MOCK_PRODUCTS.length],     // Top Left
        MOCK_PRODUCTS[(activeIndex + 1) % MOCK_PRODUCTS.length], // Bottom Left
        MOCK_PRODUCTS[(activeIndex + 2) % MOCK_PRODUCTS.length], // Top Right
        MOCK_PRODUCTS[(activeIndex + 3) % MOCK_PRODUCTS.length], // Bottom Right
    ]

    // Component con: Thẻ sản phẩm nhỏ
    const ProductCard = ({ product }: { product: any }) => (
        <div className="group animate-fade-in h-full flex flex-col relative overflow-hidden bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
            {/* Image Container */}
            <div className="relative flex-1 overflow-hidden">
                {product.image ? (
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-300">
                        <span className="text-xs tracking-widest">NO IMAGE</span>
                    </div>
                )}

                {/* Overlay & Actions */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-10 group-hover:translate-x-0 transition-transform duration-300 delay-100">
                        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-pink-600 hover:text-white shadow-lg transition-colors" title="Thêm vào giỏ">
                            <ShoppingBag size={18} />
                        </button>
                        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-pink-600 hover:text-white shadow-lg transition-colors" title="Yêu thích">
                            <Heart size={18} />
                        </button>
                    </div>

                    <div className="absolute bottom-4 left-0 right-0 flex justify-center translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
                        <button className="bg-white/90 backdrop-blur-sm text-gray-900 px-6 py-2 rounded-full text-sm font-medium hover:bg-pink-600 hover:text-white transition-colors shadow-lg flex items-center gap-2">
                            <Eye size={16} />
                            Xem chi tiết
                        </button>
                    </div>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-5 text-center bg-white relative z-10 border-t border-gray-50">
                <h3 className="text-xl font-playfair font-bold text-gray-800 line-clamp-1 cursor-pointer hover:text-pink-600 transition-colors mb-2">
                    {product.name}
                </h3>
                <div className="flex items-center justify-center gap-3">
                    {product.oldPrice && (
                        <span className="text-sm text-gray-400 line-through font-sans">
                            {product.oldPrice.toLocaleString()} đ
                        </span>
                    )}
                    <span className="text-lg font-bold text-pink-600 font-sans tracking-wide">
                        {product.price.toLocaleString()} đ
                    </span>
                </div>
            </div>
        </div>
    )

    return (
        <section className="container mx-auto px-4 lg:px-20 py-16">
            {/* Decorative Border Container */}
            <div className="border border-pink-200 p-8 lg:p-12 relative">
                {/* Corner Decorations */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-pink-400 -mt-1 -ml-1"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-pink-400 -mt-1 -mr-1"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-pink-400 -mb-1 -ml-1"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-pink-400 -mb-1 -mr-1"></div>

                {/* Section Title */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-gray-800 mb-4 tracking-wide">
                        Sản phẩm bán chạy
                    </h2>
                    {/* Floral Divider (SVG) */}
                    <div className="flex justify-center items-center">
                        <svg width="200" height="40" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-pink-400">
                            <path d="M100 35C100 35 110 30 115 20C120 10 130 5 140 10C150 15 155 25 165 25C175 25 180 15 190 15C200 15 200 30 200 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                            <path d="M100 35C100 35 90 30 85 20C80 10 70 5 60 10C50 15 45 25 35 25C25 25 20 15 10 15C0 15 0 30 0 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                            <path d="M100 35V15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                            <circle cx="100" cy="10" r="3" fill="currentColor" />
                            <circle cx="85" cy="15" r="2" fill="currentColor" fillOpacity="0.6" />
                            <circle cx="115" cy="15" r="2" fill="currentColor" fillOpacity="0.6" />
                        </svg>
                    </div>
                </div>

                {/* Navigation Buttons for Slider */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-[58%] -translate-y-1/2 z-20 w-12 h-12 border border-pink-200 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-500 hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-all duration-300 shadow-md group"
                    aria-label="Previous Slide"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-[58%] -translate-y-1/2 z-20 w-12 h-12 border border-pink-200 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-500 hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-all duration-300 shadow-md group"
                    aria-label="Next Slide"
                >
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

                    {/* CỘT TRÁI (2 Sản phẩm) */}
                    <div className="lg:col-span-1 flex flex-col gap-6 h-[750px]">
                        <ProductCard product={visibleProducts[0]} />
                        <ProductCard product={visibleProducts[1]} />
                    </div>

                    {/* CỘT GIỮA (Banner Tĩnh) - Fixed 750px height */}
                    <div className="lg:col-span-1 relative h-[750px] w-full max-w-[400px] mx-auto overflow-hidden group shadow-xl">
                        {/* Background Image Banner */}
                        <div className="absolute inset-0 bg-pink-200">
                            <Image
                                src="/images/photo-bestseller-center.jpg"
                                alt="Banner Center"
                                fill
                                className="object-cover opacity-95"
                            />
                            {/* Dark overlay for better text contrast */}
                            <div className="absolute inset-0 bg-black/30"></div>
                        </div>

                        {/* Overlay Content */}
                        <div className="absolute inset-6 border-2 border-white/80 flex flex-col items-center justify-center text-center p-6 bg-white/10 backdrop-blur-[2px]">
                            {/* Title with Playfair Display font */}
                            <h2
                                className="text-7xl lg:text-8xl text-white drop-shadow-2xl mb-2 font-bold tracking-tight"
                                style={{ fontFamily: "'Great Vibes', cursive", textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
                            >
                                Hoa
                            </h2>

                            {/* Subtitle with Dancing Script */}
                            <p
                                className="text-3xl lg:text-5xl text-white italic mb-8 drop-shadow-xl"
                                style={{ fontFamily: "'Dancing Script', cursive" }}
                            >
                                Tuyệt tác từ<br />Thiên nhiên
                            </p>

                            {/* Shortened quote with Alex Brush */}
                            <div
                                className="w-full text-white text-2xl lg:text-3xl mb-10 leading-relaxed hidden lg:block"
                                style={{ fontFamily: "'Alex Brush', cursive", textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
                            >
                                "Mỗi đóa hoa là một tác phẩm nghệ thuật, được thổi hồn bởi sự tận tâm"
                                <span className="text-xl opacity-100 font-sans tracking-wider mt-2 block font-normal">- Pivoine Fleur</span>
                            </div>

                            {/* Soft & Elegant CTA Button */}
                            <button className="px-8 py-2.5 bg-pink-500/90 text-white font-medium text-base tracking-[0.1em] hover:bg-pink-600 transition-all duration-500 font-playfair italic shadow-lg shadow-pink-200/50 hover:shadow-xl hover:shadow-pink-300/50 hover:-translate-y-1 rounded-full backdrop-blur-[2px]">
                                Xem ngay
                            </button>
                        </div>
                    </div>

                    {/* CỘT PHẢI (2 Sản phẩm) */}
                    <div className="lg:col-span-1 flex flex-col gap-6 h-[750px]">
                        <ProductCard product={visibleProducts[2]} />
                        <ProductCard product={visibleProducts[3]} />
                    </div>

                </div>
            </div>
        </section>
    )
}