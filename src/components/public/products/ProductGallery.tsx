'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ZoomIn, X, Maximize2 } from 'lucide-react'

interface ProductGalleryProps {
    images: string[]
    productName: string
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isZoomed, setIsZoomed] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
    }

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isZoomed) return

        const rect = e.currentTarget.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100

        setZoomPosition({ x, y })
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (!isFullscreen) return

        if (e.key === 'ArrowRight') nextImage()
        if (e.key === 'ArrowLeft') prevImage()
        if (e.key === 'Escape') setIsFullscreen(false)
    }

    // Keyboard navigation for fullscreen
    useState(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('keydown', handleKeyDown as any)
            return () => window.removeEventListener('keydown', handleKeyDown as any)
        }
    })

    return (
        <div className="space-y-4">

            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 group">
                <div
                    className="relative w-full h-full cursor-zoom-in"
                    onMouseEnter={() => setIsZoomed(true)}
                    onMouseLeave={() => setIsZoomed(false)}
                    onMouseMove={handleMouseMove}
                    onClick={() => setIsFullscreen(true)}
                >
                    <Image
                        src={images[currentIndex]}
                        alt={`${productName} - Hình ${currentIndex + 1}`}
                        fill
                        className={`object-cover transition-all duration-500 ${isZoomed ? 'scale-150' : 'scale-100'
                            }`}
                        style={isZoomed ? {
                            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                        } : {}}
                        priority={currentIndex === 0}
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                prevImage()
                            }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={20} className="text-slate-700" />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                nextImage()
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110"
                            aria-label="Next image"
                        >
                            <ChevronRight size={20} className="text-slate-700" />
                        </button>
                    </>
                )}

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-black/50 backdrop-blur px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-1.5 text-white text-xs font-medium">
                        <ZoomIn size={14} />
                        Di chuột để zoom
                    </div>
                    {images.length > 1 && (
                        <>
                            <span className="w-px h-4 bg-white/30" />
                            <div className="flex items-center gap-1.5 text-white text-xs font-medium">
                                <Maximize2 size={14} />
                                Click để phóng to
                            </div>
                        </>
                    )}
                </div>

                {/* Image counter */}
                {images.length > 1 && (
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur text-white px-3 py-1.5 rounded-full text-xs font-medium">
                        {currentIndex + 1} / {images.length}
                    </div>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${currentIndex === index
                                    ? 'border-pink-500 ring-2 ring-pink-200 scale-105'
                                    : 'border-slate-200 hover:border-pink-300 hover:scale-102'
                                }`}
                            aria-label={`View image ${index + 1}`}
                            aria-pressed={currentIndex === index}
                        >
                            <Image
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 25vw, 20vw"
                            />
                            {currentIndex === index && (
                                <div className="absolute inset-0 bg-pink-500/20 flex items-center justify-center">
                                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                                        <span className="text-pink-600 text-xs font-bold">✓</span>
                                    </div>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            )}

            {/* Fullscreen Modal */}
            {isFullscreen && (
                <div
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center animate-[fadeIn_0.2s_ease-out]"
                    onClick={() => setIsFullscreen(false)}
                >
                    {/* Close button */}
                    <button
                        onClick={() => setIsFullscreen(false)}
                        className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white transition-all z-10"
                        aria-label="Close fullscreen"
                    >
                        <X size={24} />
                    </button>

                    {/* Image counter */}
                    <div className="absolute top-6 left-6 bg-white/10 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium z-10">
                        {currentIndex + 1} / {images.length}
                    </div>

                    {/* Navigation */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    prevImage()
                                }}
                                className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white transition-all z-10"
                                aria-label="Previous image"
                            >
                                <ChevronLeft size={28} />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    nextImage()
                                }}
                                className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white transition-all z-10"
                                aria-label="Next image"
                            >
                                <ChevronRight size={28} />
                            </button>
                        </>
                    )}

                    {/* Main image */}
                    <div
                        className="relative w-[90vw] h-[90vh] max-w-6xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={images[currentIndex]}
                            alt={`${productName} - Fullscreen ${currentIndex + 1}`}
                            fill
                            className="object-contain"
                            sizes="90vw"
                            priority
                        />
                    </div>

                    {/* Thumbnails */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto px-4 py-2 bg-white/10 backdrop-blur rounded-full">
                        {images.map((image, index) => (
                            <button
                                key={index}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setCurrentIndex(index)
                                }}
                                className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${currentIndex === index
                                        ? 'border-white scale-110'
                                        : 'border-white/30 hover:border-white/60'
                                    }`}
                            >
                                <Image
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="64px"
                                />
                            </button>
                        ))}
                    </div>

                    {/* Instructions */}
                    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white/60 text-sm">
                        Nhấn <kbd className="px-2 py-1 bg-white/10 rounded mx-1">ESC</kbd> để đóng
                    </div>
                </div>
            )}

            {/* Custom animations */}
            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
        </div>
    )
}
