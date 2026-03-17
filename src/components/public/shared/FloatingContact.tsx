'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, Phone, X } from 'lucide-react'
import { openZaloChat, openMessengerChat, dialPhone, formatPhoneNumber } from '@/lib/contact'

export default function FloatingContact() {
    const [isOpen, setIsOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    // Show button after scrolling down a bit
    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300)
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll() // Check initial scroll position

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    if (!isVisible) return null

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Contact Options Menu */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 mb-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden min-w-[240px] animate-[slideUp_0.25s_ease-out] motion-reduce:animate-none">

                    {/* Zalo */}
                    <button
                        onClick={() => {
                            openZaloChat()
                            setIsOpen(false)
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-all duration-200 border-b border-slate-100 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                        aria-label="Chat qua Zalo"
                    >
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                            <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                                <path d="M12 2C6.48 2 2 6.48 2 12c0 1.65.41 3.2 1.13 4.57l-1.11 3.31 3.39-1.09C7.8 19.59 9.35 20 12 20c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 16c-1.45 0-2.8-.33-4.03-.92l-.29-.15-2.38.76.78-2.33-.17-.3C5.33 14.8 5 13.45 5 12c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7z" />
                            </svg>
                        </div>
                        <div className="flex-1 text-left">
                            <p className="font-semibold text-slate-800">Chat Zalo</p>
                            <p className="text-xs text-slate-500">Phản hồi nhanh</p>
                        </div>
                    </button>

                    {/* Messenger */}
                    <button
                        onClick={() => {
                            openMessengerChat()
                            setIsOpen(false)
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-all duration-200 border-b border-slate-100 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                        aria-label="Chat qua Facebook Messenger"
                    >
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                            <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                                <path d="M12 2C6.5 2 2 6.14 2 11.25c0 2.88 1.44 5.45 3.69 7.14V22l3.45-1.89c.92.25 1.89.39 2.86.39 5.5 0 10-4.14 10-9.25S17.5 2 12 2zm1.03 12.41l-2.49-2.65-4.87 2.65 5.36-5.69 2.55 2.65 4.81-2.65-5.36 5.69z" />
                            </svg>
                        </div>
                        <div className="flex-1 text-left">
                            <p className="font-semibold text-slate-800">Messenger</p>
                            <p className="text-xs text-slate-500">Chat Facebook</p>
                        </div>
                    </button>

                    {/* Phone */}
                    <button
                        onClick={() => {
                            dialPhone()
                            setIsOpen(false)
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-inset"
                        aria-label="Gọi hotline"
                    >
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                            <Phone className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 text-left">
                            <p className="font-semibold text-slate-800">Gọi ngay</p>
                            <p className="text-xs text-green-600 font-medium">{formatPhoneNumber('0353894802')}</p>
                        </div>
                    </button>

                </div>
            )}

            {/* Main Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
          w-16 h-16 min-w-[48px] min-h-[48px] rounded-full shadow-2xl flex items-center justify-center transition-all duration-300
          ${isOpen
                        ? 'bg-slate-600 hover:bg-slate-700 rotate-90 scale-95'
                        : 'bg-gradient-to-br from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 hover:scale-110 animate-bounce-slow motion-reduce:animate-none'
                    }
          focus:outline-none focus:ring-4 focus:ring-pink-300
        `}
                aria-label={isOpen ? 'Đóng menu liên hệ' : 'Mở menu liên hệ'}
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                {isOpen ? (
                    <X className="w-7 h-7 text-white" />
                ) : (
                    <MessageCircle className="w-7 h-7 text-white" />
                )}
            </button>

            {/* Pulse effect when closed */}
            {!isOpen && (
                <div className="absolute inset-0 rounded-full bg-pink-500 animate-ping opacity-20 pointer-events-none" />
            )}

            <style jsx>{`
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(10px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
        </div>
    )
}
