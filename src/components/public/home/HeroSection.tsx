'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles, Heart, Gift, ChevronLeft, ChevronRight, Award, ThumbsUp } from 'lucide-react'
import { motion, AnimatePresence, Transition } from 'framer-motion'

export default function HeroSection() {
    const [[page, direction], setPage] = useState([0, 0])

    const slides = [
        {
            title: 'Trao Gửi Yêu Thương',
            subtitle: 'Với Những Bó Hoa Tươi Đẹp Nhất',
            description: 'Mỗi bông hoa đều được chọn lựa kỹ càng để mang đến sự hoàn hảo cho những khoảnh khắc đặc biệt của bạn',
            image: '/images/hero-bouquet.png',
            accent: 'from-pink-500 to-rose-500',
            stats: {
                stat1: { value: '100%', label: 'Hoa tươi mới', icon: 'heart', color: 'from-pink-400 to-rose-500' },
                stat2: { value: '200+', label: 'Đơn mỗi tháng', icon: 'check', color: 'from-green-400 to-emerald-500' }
            }
        },
        {
            title: 'Sắc Hoa Lung Linh',
            subtitle: 'Tô Điểm Mọi Khoảnh Khắc',
            description: 'Hãy để những sắc màu rực rỡ của hoa tươi thắp sáng niềm vui và hạnh phúc trong cuộc sống của bạn',
            image: '/images/hero-arrangement.png',
            accent: 'from-purple-500 to-pink-500',
            stats: {
                stat1: { value: '5+ năm', label: 'Kinh nghiệm', icon: 'award', color: 'from-amber-400 to-orange-500' },
                stat2: { value: '98%', label: 'Khách hài lòng', icon: 'thumbsup', color: 'from-emerald-400 to-green-500' }
            }
        }
    ]

    const slideIndex = Math.abs(page % slides.length)
    const currentContent = slides[slideIndex]

    const paginate = useCallback((newDirection: number) => {
        setPage([page + newDirection, newDirection])
    }, [page])

    // Optimize: Cache random petal positions to avoid recalculating on every render
    const petalPositions = useMemo(() =>
        Array.from({ length: 4 }, (_, i) => ({
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: i * 0.6,
            duration: 3.5 + Math.random() * 1.5
        }))
        , [])

    useEffect(() => {
        const interval = setInterval(() => {
            paginate(1)
        }, 5000)
        return () => clearInterval(interval)
    }, [paginate])

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                paginate(-1)
            } else if (e.key === 'ArrowRight') {
                paginate(1)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [paginate])


    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50, // Vào từ phải nếu next, trái nếu prev
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 50 : -50, // Ra về phải nếu prev, trái nếu next
            opacity: 0
        })
    }

    const transition: Transition = {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
    }

    return (
        <section
            className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50"
            role="region"
            aria-roledescription="carousel"
            aria-label="Hero carousel"
        >

            {/* Navigation Buttons - Hidden on mobile, better positioned on desktop */}
            <div className="hidden lg:flex absolute inset-x-0 top-1/2 -translate-y-1/2 justify-between px-8 lg:px-12 z-30 pointer-events-none">
                <button
                    onClick={() => paginate(-1)}
                    aria-label="Previous slide"
                    className="pointer-events-auto w-12 h-12 rounded-full bg-white/80 backdrop-blur shadow-lg flex items-center justify-center hover:bg-white transition-all text-pink-500 hover:scale-110"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={() => paginate(1)}
                    aria-label="Next slide"
                    className="pointer-events-auto w-12 h-12 rounded-full bg-white/80 backdrop-blur shadow-lg flex items-center justify-center hover:bg-white transition-all text-pink-500 hover:scale-110"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
            {/* Animated Background Gradient Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-pink-300/30 to-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-rose-300/30 to-pink-300/30 rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>
            </div>

            {/* Floating Flower Petals Animation - Temporarily disabled due to hydration */}
            {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {petalPositions.map((petal, i) => (
                    <div
                        key={i}
                        className="absolute w-3 h-3 bg-pink-300/40 rounded-full animate-float"
                        style={{
                            left: `${petal.left}%`,
                            top: `${petal.top}%`,
                            animationDelay: `${petal.delay}s`,
                            animationDuration: `${petal.duration}s`
                        }}
                    />
                ))}
            </div> */}

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    <div className="relative min-h-[400px] flex items-center">
                        <AnimatePresence initial={false} mode='wait' custom={direction}>
                            <motion.div
                                key={page}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={transition}
                                className="space-y-8 text-center lg:text-left w-full"
                            >
                                {/* Badge - Responsive text */}
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-pink-100">
                                    <Sparkles className="w-4 h-4 text-pink-500" />
                                    <span className="text-sm font-medium bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                        <span className="hidden sm:inline">Giao hàng miễn phí cho đơn từ 500k</span>
                                        <span className="sm:hidden">Miễn phí ship 500k+</span>
                                    </span>
                                </div>

                                {/* Main Headline */}
                                <div className="space-y-4">
                                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                                        <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
                                            {currentContent.title}
                                        </span>
                                    </h1>
                                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800">
                                        {currentContent.subtitle}
                                    </h2>
                                    <p className="text-lg sm:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                        {currentContent.description}
                                    </p>
                                </div>

                                {/* Feature Pills */}
                                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md border border-pink-100">
                                        <Heart className="w-4 h-4 text-rose-500" />
                                        <span className="text-sm font-medium text-gray-700">Hoa tươi 100%</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md border border-purple-100">
                                        <Gift className="w-4 h-4 text-purple-500" />
                                        <span className="text-sm font-medium text-gray-700">Thiết kế độc đáo</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md border border-pink-100">
                                        <Sparkles className="w-4 h-4 text-pink-500" />
                                        <span className="text-sm font-medium text-gray-700">Chụp hình trước khi giao</span>
                                    </div>
                                </div>

                                {/* CTA Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    <Link
                                        href="/products"
                                        className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            Khám phá ngay
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>

                                    <Link
                                        href="/contact"
                                        className="group px-8 py-4 bg-white text-gray-800 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-pink-200 hover:border-pink-300"
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            Tư vấn miễn phí
                                            <Heart className="w-5 h-5 text-pink-500 group-hover:scale-110 transition-transform" />
                                        </span>
                                    </Link>
                                </div>

                                {/* Social Proof - Real customer avatars */}
                                <div className="flex items-center gap-6 justify-center lg:justify-start pt-4">
                                    <div className="flex -space-x-3">
                                        {/* Real customer avatars */}
                                        <div className="w-10 h-10 rounded-full border-2 border-white shadow-md overflow-hidden bg-white">
                                            <Image
                                                src="/images/customer-avatars.png"
                                                alt="Happy customer"
                                                width={40}
                                                height={40}
                                                className="object-cover object-[0%_center]"
                                            />
                                        </div>
                                        <div className="w-10 h-10 rounded-full border-2 border-white shadow-md overflow-hidden bg-white">
                                            <Image
                                                src="/images/customer-avatars.png"
                                                alt="Happy customer"
                                                width={40}
                                                height={40}
                                                className="object-cover object-[33%_center]"
                                            />
                                        </div>
                                        <div className="w-10 h-10 rounded-full border-2 border-white shadow-md overflow-hidden bg-white">
                                            <Image
                                                src="/images/customer-avatars.png"
                                                alt="Happy customer"
                                                width={40}
                                                height={40}
                                                className="object-cover object-[66%_center]"
                                            />
                                        </div>
                                        <div className="w-10 h-10 rounded-full border-2 border-white shadow-md overflow-hidden bg-white">
                                            <Image
                                                src="/images/customer-avatars.png"
                                                alt="Happy customer"
                                                width={40}
                                                height={40}
                                                className="object-cover object-[100%_center]"
                                            />
                                        </div>
                                    </div>
                                    <div className="text-left">
                                        <div className="flex items-center gap-1">
                                            <span className="text-yellow-500">★★★★★</span>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-bold text-gray-800">2,000+</span> khách hàng hài lòng
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right Image - Cũng wrap trong AnimatePresence */}
                    <div className="relative lg:h-[600px] h-96">
                        {/* Decorative Elements - Giữ nguyên không cần animate mỗi lần slide đổi */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full blur-2xl opacity-60 animate-pulse" />
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-2xl opacity-60 animate-pulse [animation-delay:1s]" />

                        <AnimatePresence initial={false} mode='wait' custom={direction}>
                            <motion.div
                                key={page}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={transition}
                                className="relative h-full w-full"
                            >
                                {/* Main Image Container */}
                                <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl bg-white p-4">
                                    <div className="relative h-full rounded-2xl overflow-hidden">
                                        <Image
                                            src={currentContent.image}
                                            alt={currentContent.title}
                                            fill
                                            className="object-cover"
                                            priority={slideIndex === 0}
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-t ${currentContent.accent} opacity-10`} />
                                    </div>
                                </div>

                                {/* Floating Stats Cards - Sync with slide, with float animation */}
                                <div className="hidden lg:block absolute -bottom-8 left-8 bg-white rounded-2xl shadow-xl p-4 z-20 animate-float">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-12 h-12 bg-gradient-to-br ${currentContent.stats.stat2.color} rounded-xl flex items-center justify-center`}>
                                            {currentContent.stats.stat2.icon === 'check' ? (
                                                <span className="text-white font-bold text-xl">✓</span>
                                            ) : currentContent.stats.stat2.icon === 'thumbsup' ? (
                                                <ThumbsUp className="w-6 h-6 text-white fill-white" />
                                            ) : (
                                                <Heart className="w-6 h-6 text-white fill-white" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-800">{currentContent.stats.stat2.value}</p>
                                            <p className="text-sm text-gray-600">{currentContent.stats.stat2.label}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="hidden lg:block absolute -top-8 -right-8 bg-white rounded-2xl shadow-xl p-4 z-20 animate-float [animation-delay:1s]">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-12 h-12 bg-gradient-to-br ${currentContent.stats.stat1.color} rounded-xl flex items-center justify-center`}>
                                            {currentContent.stats.stat1.icon === 'heart' ? (
                                                <Heart className="w-6 h-6 text-white fill-white" />
                                            ) : currentContent.stats.stat1.icon === 'award' ? (
                                                <Award className="w-6 h-6 text-white" />
                                            ) : (
                                                <span className="text-white font-bold text-xl">✓</span>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-800">{currentContent.stats.stat1.value}</p>
                                            <p className="text-sm text-gray-600">{currentContent.stats.stat1.label}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>


                    </div>
                </div>

                {/* Slide Indicators */}
                <div className="flex justify-center gap-2 mt-12 lg:mt-16 relative z-20">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                // Tính toán hướng để slide chạy đúng chiều khi click vào dot
                                const newDirection = index > slideIndex ? 1 : -1
                                setPage([index, newDirection])
                            }}
                            className={`h-2 rounded-full transition-all duration-300 ${slideIndex === index
                                ? 'w-8 bg-gradient-to-r from-pink-500 to-rose-500'
                                : 'w-2 bg-gray-300 hover:bg-gray-400'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

        </section>
    )
}
