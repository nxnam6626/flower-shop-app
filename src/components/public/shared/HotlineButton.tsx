'use client'

import { Phone } from 'lucide-react'

export default function HotlineButton() {
    return (
        <div className="fixed left-6 bottom-6 z-40">
            <a
                href="tel:0934072575"
                className="bg-pink-600 text-white px-6 py-2 rounded-full shadow-lg font-bold text-sm md:text-base flex items-center gap-2 animate-pulse hover:bg-pink-700 transition-colors"
                aria-label="Gọi hotline"
            >
                <Phone className="w-4 h-4" />
                <span>Hotline: 093 407 2575</span>
            </a>
        </div>
    )
}
