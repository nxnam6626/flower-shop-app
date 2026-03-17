'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, Copy, Check, MessageCircle } from 'lucide-react'
import { Product } from '@/types/product'
import { generateProductMessage, openZaloChat, openMessengerChat } from '@/lib/contact'
import Image from 'next/image'

interface ProductContactModalProps {
    product: Product
    isOpen: boolean
    onClose: () => void
}

export default function ProductContactModal({ product, isOpen, onClose }: ProductContactModalProps) {
    const [copied, setCopied] = useState(false)
    const [mounted, setMounted] = useState(false)
    const message = generateProductMessage(product)

    // Ensure component is mounted (for SSR compatibility)
    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    // Handle Escape key to close modal
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose()
            }
        }

        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [isOpen, onClose])

    if (!isOpen || !mounted) return null

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(message)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    const handleOpenZalo = () => {
        openZaloChat()
        onClose()
    }

    const handleOpenMessenger = () => {
        openMessengerChat()
        onClose()
    }

    const modalContent = (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out] motion-reduce:animate-none"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] overflow-y-auto animate-[slideUp_0.3s_ease-out] motion-reduce:animate-none"
                onClick={(e) => e.stopPropagation()}
                role="document"
            >

                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-pink-500 to-rose-600 text-white p-6 rounded-t-2xl z-10">
                    <div className="flex items-center justify-between mb-3">
                        <h2 id="modal-title" className="text-2xl font-bold">Tư Vấn Sản Phẩm</h2>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 min-w-[44px] min-h-[44px] rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                            aria-label="Đóng hộp thoại"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    <p id="modal-description" className="text-pink-100 text-sm">
                        Chúng tôi sẵn sàng hỗ trợ bạn qua Zalo hoặc Messenger
                    </p>
                </div>

                {/* Product Info */}
                <div className="p-4 border-b border-slate-200">
                    <div className="flex gap-3">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                            <Image
                                src={product.thumbnail}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="80px"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-slate-800 mb-1 line-clamp-2 text-sm leading-tight">
                                {product.name}
                            </h3>
                            <p className="text-xs text-slate-500 mb-2 truncate">
                                {product.specifications.type}
                            </p>
                            <p className="text-lg font-bold text-pink-600">
                                {product.price.toLocaleString('vi-VN')}đ
                            </p>
                        </div>
                    </div>
                </div>

                {/* Message Template */}
                <div className="p-4 border-b border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                        <label htmlFor="message-content" className="text-xs font-semibold text-slate-700">
                            📝 Nội dung tin nhắn
                        </label>
                        <button
                            onClick={handleCopy}
                            className={`flex items-center gap-1.5 px-2.5 py-1.5 min-h-[36px] rounded-lg text-xs font-medium transition-all ${copied
                                    ? 'bg-green-50 text-green-700'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                } focus:outline-none focus:ring-2 focus:ring-pink-500`}
                            aria-label={copied ? "Đã copy tin nhắn" : "Copy tin nhắn"}
                        >
                            {copied ? (
                                <>
                                    <Check size={12} />
                                    Đã copy
                                </>
                            ) : (
                                <>
                                    <Copy size={12} />
                                    Copy
                                </>
                            )}
                        </button>
                    </div>

                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                        <pre id="message-content" className="text-xs text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
                            {message}
                        </pre>
                    </div>

                    <p className="text-xs text-slate-500 mt-2 bg-blue-50 border border-blue-100 rounded-lg p-2.5 leading-relaxed">
                        💡 <strong>Hướng dẫn:</strong> Click nút "Copy" rồi mở Zalo, paste (Ctrl+V) tin nhắn này và gửi cho shop để được tư vấn nhanh nhất!
                    </p>
                </div>

                {/* Contact Actions */}
                <div className="p-4 space-y-2.5">
                    <p className="text-xs font-semibold text-slate-700 mb-2">
                        Chọn cách liên hệ:
                    </p>

                    {/* Zalo Button */}
                    <button
                        onClick={handleOpenZalo}
                        className="w-full flex items-center gap-3 p-3 min-h-[56px] bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all duration-200 hover:shadow-lg group focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                        aria-label="Mở Zalo để chat với shop"
                    >
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                            <MessageCircle size={20} />
                        </div>
                        <div className="flex-1 text-left">
                            <p className="font-bold text-sm">Chat qua Zalo</p>
                            <p className="text-xs text-blue-100">
                                Mở Zalo → Nhắn tin với shop
                            </p>
                        </div>
                    </button>

                    {/* Messenger Button */}
                    <button
                        onClick={handleOpenMessenger}
                        className="w-full flex items-center gap-3 p-3 min-h-[56px] bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl transition-all duration-200 hover:shadow-lg group focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
                        aria-label="Mở Facebook Messenger để chat với shop"
                    >
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5" aria-hidden="true">
                                <path d="M12 2C6.5 2 2 6.14 2 11.25c0 2.88 1.44 5.45 3.69 7.14V22l3.45-1.89c.92.25 1.89.39 2.86.39 5.5 0 10-4.14 10-9.25S17.5 2 12 2zm1.03 12.41l-2.49-2.65-4.87 2.65 5.36-5.69 2.55 2.65 4.81-2.65-5.36 5.69z" />
                            </svg>
                        </div>
                        <div className="flex-1 text-left">
                            <p className="font-bold text-sm">Chat Messenger</p>
                            <p className="text-xs text-blue-100">
                                Tư vấn qua Facebook
                            </p>
                        </div>
                    </button>
                </div>

                {/* Footer */}
                <div className="bg-slate-50 p-4 rounded-b-2xl border-t border-slate-200">
                    <p className="text-xs text-center text-slate-500">
                        ⏰ Thời gian hỗ trợ: 8:00 - 22:00 hàng ngày
                    </p>
                </div>

            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </div>
    )

    // Use Portal to render modal at document.body level
    return createPortal(modalContent, document.body)
}
