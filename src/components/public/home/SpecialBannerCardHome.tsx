'use client'

import Image from 'next/image'
import Link from 'next/link'

interface SpecialBannerProps {
    title: string;
    image: string;
    linkUrl: string;
    className?: string;
    titleColor?: string;      // Màu chữ title (default: text-teal-900)
    separatorColor?: string;  // Màu separator (default: text-slate-700)
}

export default function SpecialBannerCard({
    title,
    image,
    linkUrl,
    className = "",
    titleColor = "",
    separatorColor = "text-slate-700"
}: SpecialBannerProps) {
    return (
        <div className={`relative aspect-[4/5] md:aspect-auto group overflow-hidden rounded-sm shadow-md transition-all hover:shadow-2xl hover:-translate-y-1 duration-500 animate-fade-in-up ${className}`} style={{ animationDelay: '300ms' }}>
            {/* Background Image */}
            <div className="absolute inset-0 bg-gray-100">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-80 pointer-events-none"></div>
            </div>

            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-20">
                {/* Glass Effect */}
                <div className="absolute inset-[4.5rem] bg-white/10 backdrop-blur-[2px] shadow-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-sm"></div>
                <div className='absolute inset-[4.5rem] border border-white/90 z-10 pointer-events-none'></div>

                {/* Title */}
                <h3 className={`relative text-5xl lg:text-6xl ${titleColor} font-bold mb-3 z-30`}
                    style={{
                        fontFamily: "'Dancing Script', cursive",
                        textShadow: '0px 2px 5px rgba(0,0,0,0.5), 0px 5px 15px rgba(0,0,0,0.2)'
                    }}>
                    {title}
                </h3>

                {/* Decorative Separator */}
                <div className={`relative mb-8 ${separatorColor} scale-100 z-30 drop-shadow-md`}>
                    <svg width="100" height="15" viewBox="0 0 100 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50 7.5 C 40 7.5, 35 12, 25 12 C 15 12, 10 3, 0 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                        <path d="M50 7.5 C 60 7.5, 65 12, 75 12 C 85 12, 90 3, 100 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                        <rect x="47" y="4.5" width="6" height="6" transform="rotate(45 50 7.5)" fill="currentColor" />
                    </svg>
                </div>

                {/* Button */}
                <Link
                    href={linkUrl}
                    className="relative bg-white text-[#3B82F6] px-6 py-2.5 text-[10px] lg:text-xs font-bold uppercase tracking-widest shadow-lg hover:bg-[#F0F9FF] hover:scale-105 hover:shadow-xl transition-all duration-300 box-border border border-white/50 rounded-sm whitespace-nowrap z-30"
                >
                    Xem toàn bộ →
                </Link>
            </div>
        </div>
    )
}