'use client'

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { MessageCircle, CheckCircle2, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';

const FEEDBACKS = [
    {
        id: 1,
        customerName: "Chị Ngọc - Quận 3",
        productImage: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&q=80",
        chatScreenshot: "/images/feedback/chat-zalo-1.jpg",
        platform: "zalo",
        tag: "Hoa sinh nhật"
    },
    {
        id: 2,
        customerName: "Anh Tuấn Anh",
        productImage: "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?w=800&q=80",
        chatScreenshot: "/images/feedback/chat-messenger-1.jpg",
        platform: "messenger",
        tag: "Hoa kỷ niệm"
    },
    {
        id: 3,
        customerName: "Chị Lan - Quận 1",
        productImage: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=800&q=80",
        chatScreenshot: "/images/feedback/chat-zalo-2.jpg",
        platform: "zalo",
        tag: "Hoa khai trương"
    },
    {
        id: 4,
        customerName: "Anh Đức - Tân Bình",
        productImage: "https://images.unsplash.com/photo-1507290439931-a861b5a38200?w=800&q=80",
        chatScreenshot: "/images/feedback/chat-messenger-2.jpg",
        platform: "messenger",
        tag: "Hoa Valentine"
    },
    {
        id: 5,
        customerName: "Chị Hương - Quận 7",
        productImage: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&q=80",
        chatScreenshot: "/images/feedback/chat-zalo-1.jpg",
        platform: "zalo",
        tag: "Hoa cưới"
    },
    {
        id: 6,
        customerName: "Anh Minh - Phú Nhuận",
        productImage: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&q=80",
        chatScreenshot: "/images/feedback/chat-messenger-1.jpg",
        platform: "messenger",
        tag: "Hoa chia buồn"
    },
    {
        id: 7,
        customerName: "Chị Mai - Gò Vấp",
        productImage: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&q=800",
        chatScreenshot: "/images/feedback/chat-zalo-2.jpg",
        platform: "zalo",
        tag: "Hoa 8/3"
    },
    {
        id: 8,
        customerName: "Anh Khoa - Bình Thạnh",
        productImage: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&q=80",
        chatScreenshot: "/images/feedback/chat-messenger-2.jpg",
        platform: "messenger",
        tag: "Hoa 20/10"
    },
];

const ITEMS_PER_PAGE = 2;
const AUTO_SLIDE_INTERVAL = 5000;

export default function FeedbackChatStyle() {
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = Math.ceil(FEEDBACKS.length / ITEMS_PER_PAGE);

    const nextPage = useCallback(() => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    }, [totalPages]);

    const prevPage = useCallback(() => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    }, [totalPages]);

    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextPage();
        }, AUTO_SLIDE_INTERVAL);

        return () => clearInterval(interval);
    }, [nextPage]);

    const currentFeedbacks = FEEDBACKS.slice(
        currentPage * ITEMS_PER_PAGE,
        (currentPage + 1) * ITEMS_PER_PAGE
    );

    return (
        <section className="py-24 bg-[#FDFCFC] relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-40 pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 bg-purple-100 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-50 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16 relative z-10 px-4">
                    {/* 1. KICKER: Dòng chữ định danh nhỏ phía trên */}
                    <span className="block text-2xl text-pink-600 font-semibold uppercase tracking-[0.2em] mb-4">
                        Nhật ký yêu thương
                    </span>

                    {/* 4. PARAGRAPH: Dễ đọc và thoáng hơn */}
                    <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
                        Hạnh phúc của bạn chính là niềm cảm hứng bất tận để chúng tôi sáng tạo mỗi ngày.
                    </p>

                    {/* 3. DECORATIVE DIVIDER: Đường gạch trang trí tinh tế */}
                    <div className="flex items-center justify-center gap-3 mb-8 opacity-50">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-pink-400"></div>
                        {/* Một icon bông hoa hoặc trái tim nhỏ ở giữa (Optional) */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-pink-500">
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.75 3c1.99 0 3.751.984 4.75 2.499A5.75 5.75 0 0117.25 3c3.036 0 5.5 2.322 5.5 5.25 0 3.925-2.438 7.111-4.735 9.256a25.181 25.181 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-pink-400"></div>
                    </div>
                </div>

                {/* Carousel Container */}
                <div className="relative px-12 lg:px-16">
                    {/* Navigation Buttons - Now positioned inside with left/right offset */}
                    <button
                        onClick={prevPage}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-teal-600 hover:shadow-xl hover:scale-110 transition-all duration-300 border border-slate-100"
                        aria-label="Previous"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={nextPage}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-teal-600 hover:shadow-xl hover:scale-110 transition-all duration-300 border border-slate-100"
                        aria-label="Next"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 md:gap-16 transition-all duration-500">
                        {currentFeedbacks.map((fb) => (
                            <div key={fb.id} className="group relative animate-fade-in-up">

                                {/* Khung chứa tổng thể */}
                                <div className="flex flex-col md:flex-row gap-6 items-start">



                                    {/* CỘT 1: SCREENSHOT CHAT - Thiết kế kiểu Phone Mockup */}
                                    <div className="w-full md:w-1/2 relative">
                                        {/* Hiệu ứng bóng đổ cho ảnh chat */}
                                        <div className="absolute -inset-2 bg-gradient-to-tr from-slate-200 to-transparent rounded-[2.5rem] blur-xl opacity-50"></div>

                                        <div className="relative rounded-3xl shadow-2xl border border-slate-100 transition-transform duration-500 group-hover:rotate-0 group-hover:translate-x-2">


                                            <div className="relative w-full aspect-[9/20] rounded-3xl overflow-hidden">
                                                {/* Ảnh Screenshot thật của bạn */}
                                                <Image
                                                    src={fb.chatScreenshot}
                                                    alt={`Chat feedback ${fb.id}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>

                                            {/* Nút Platform nổi trên ảnh chat */}
                                            <div className={`absolute -bottom-4 -right-4 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl
                                                ${fb.platform === 'zalo' ? 'bg-blue-600' : 'bg-gradient-to-br from-purple-500 to-pink-500'}`}>
                                                <MessageCircle size={24} />
                                            </div>
                                        </div>

                                        {/* Info Khách hàng dưới ảnh chat */}
                                        <div className="mt-8 pl-4 border-l-2 border-teal-600">
                                            <p className="text-slate-900 font-bold text-lg">{fb.customerName}</p>
                                            <p className="text-teal-600 text-sm font-medium">{fb.tag}</p>
                                        </div>
                                    </div>

                                    {/* CỘT 2: ẢNH HOA THỰC TẾ - Thiết kế kiểu khung tranh */}
                                    <div className="w-full md:w-1/2 relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl mt-10 z-20 transition-transform duration-500 group-hover:rotate-1 group-hover:scale-[1.02]">
                                        <Image
                                            src={fb.productImage}
                                            alt="Hoa thực tế"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>

                                        {/* Badge Ảnh thực tế - Glassmorphism */}
                                        <div className="absolute top-4 left-4 backdrop-blur-md bg-white/80 px-1 py-1 rounded-full shadow-sm border border-white/50 flex items-center gap-2">
                                            <CheckCircle2 size={14} className="text-teal-600" />
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-800">Ảnh thực tế</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center items-center gap-2 mt-12">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToPage(index)}
                            className={`transition-all duration-300 rounded-full ${currentPage === index
                                ? 'w-8 h-3 bg-teal-600'
                                : 'w-3 h-3 bg-slate-300 hover:bg-slate-400'
                                }`}
                            aria-label={`Go to page ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Page Counter */}
                <div className="text-center mt-4">
                    <span className="text-sm text-slate-500">
                        Trang {currentPage + 1} / {totalPages}
                    </span>
                </div>


            </div>
        </section>
    );
}