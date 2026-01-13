'use client'

import Image from 'next/image'
import { Heart, Eye, ShoppingBag } from 'lucide-react'

interface ProductProps {
    data: {
        id: number | string;
        name: string;
        price: number;
        image: string;
    };
    index?: number; // Dùng để tính delay animation
}

export default function ProductCard({ data, index = 0 }: ProductProps) {
    return (
        <div
            className="group cursor-pointer flex flex-col items-center animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Image Frame */}
            <div className="relative aspect-square w-full overflow-hidden mb-5 bg-white shadow-sm group-hover:shadow-2xl transition-all duration-500 rounded-sm group-hover:-translate-y-1">
                <Image
                    src={data.image}
                    alt={data.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Inner Border */}
                <div className="absolute inset-3 border border-white/70 scale-95 group-hover:scale-100 opacity-80 group-hover:opacity-100 z-10 pointer-events-none transition-all duration-500 ease-out"></div>

                {/* Action Icons */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-10 group-hover:translate-x-0 transition-transform duration-300 delay-75">
                    <button className="w-8 h-8 lg:w-9 lg:h-9 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-pink-600 hover:text-white shadow-md transition-colors">
                        <ShoppingBag size={16} />
                    </button>
                    <button className="w-8 h-8 lg:w-9 lg:h-9 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-pink-600 hover:text-white shadow-md transition-colors">
                        <Heart size={16} />
                    </button>
                </div>

                {/* Quick View */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out w-max">
                    <button className="bg-white/95 backdrop-blur-sm px-5 py-2 text-xs font-bold uppercase tracking-widest text-gray-800 hover:text-pink-600 hover:bg-white shadow-xl border border-white/50 rounded-full flex items-center gap-2 whitespace-nowrap">
                        <Eye size={14} /> Xem nhanh
                    </button>
                </div>
            </div>

            {/* Typography */}
            <div className="text-center space-y-2 relative z-10 w-full px-2">
                <h4 className="font-playfair text-xl text-gray-800 font-bold italic group-hover:text-pink-600 transition-colors duration-300 tracking-wide line-clamp-1">
                    {data.name}
                </h4>

                <div className="flex items-center justify-center gap-2 my-2 opacity-60 group-hover:opacity-100 group-hover:gap-3 transition-all duration-500">
                    <span className="h-[1px] w-3 bg-pink-300 group-hover:w-6 transition-all duration-500"></span>
                    <span className="text-[10px] text-pink-400">❀</span>
                    <span className="h-[1px] w-3 bg-pink-300 group-hover:w-6 transition-all duration-500"></span>
                </div>

                <p className="text-gray-900 font-semibold text-lg tracking-wider font-sans group-hover:text-pink-600 transition-colors">
                    {data.price.toLocaleString('vi-VN')} <span className="text-sm align-top text-gray-400 group-hover:text-pink-400">₫</span>
                </p>
            </div>
        </div>
    )
}