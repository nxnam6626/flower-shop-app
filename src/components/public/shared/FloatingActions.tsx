'use client'

import { useState } from 'react'
import { MapPin, Headset, X } from 'lucide-react'
import { FaFacebookMessenger } from 'react-icons/fa'
import { SiZalo } from 'react-icons/si'

export default function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false)

  // Danh sách các nút con (Thứ tự hiển thị từ dưới lên trên giống hình)
  const actions = [
    {
      label: 'Trò chuyện qua Facebook',
      icon: FaFacebookMessenger,
      color: 'bg-indigo-500',
      href: 'https://facebook.com/flowersight'
    },
    {
      label: 'Chat với mình qua Zalo',
      icon: SiZalo,
      color: 'bg-indigo-400',
      href: 'https://zalo.me/YOUR_ZALO_ID'
    },
    {
      label: 'Ghé thăm cửa hàng',
      icon: MapPin,
      color: 'bg-indigo-300',
      href: '/contact'
    },
  ]

  return (
    <div className="fixed right-24 bottom-12 z-50 flex flex-col items-end gap-3">

      {/* 1. DANH SÁCH CÁC NÚT CON (Chỉ hiện khi isOpen = true) */}
      <div className={`flex flex-col mx-1 gap-3 transition-all duration-300 ease-in-out origin-bottom ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-10 pointer-events-none'}`}>
        {actions.map((action, index) => (
          <a
            key={index}
            href={action.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group justify-end"
          >
            {/* Label bên trái (Luôn hiện như hình mẫu) */}
            <span className="bg-[#4a4a4a] text-white text-sm py-1.5 px-3 rounded-md shadow-lg whitespace-nowrap">
              {action.label}
            </span>

            {/* Nút Icon Tròn */}
            <div className={`${action.color} w-10 h-10  rounded-full flex items-center justify-center text-white shadow-lg hover:brightness-110 transition-all`}>
              <action.icon size={20} strokeWidth={1.5} />
            </div>
          </a>
        ))}
      </div>

      {/* 2. NÚT CHÍNH (TOGGLE BUTTON) */}
      <div className="flex items-center gap-3 justify-end">

        {!isOpen && (
          <div className="bg-[#4a4a4a] text-white text-sm py-2 px-4 rounded-full shadow-lg animate-bounce-horizontal cursor-pointer" onClick={() => setIsOpen(true)}>
            Để chúng mình giúp bạn trao yêu thương
          </div>
        )}

        {/* Nút tròn to nhất */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-indigo-600 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform relative"
        >
          {/* Hiệu ứng vòng sóng lan tỏa */}

          {/* Vòng sóng 1: Chạy ngay */}
          <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60 animate-ripple"></span>

          {/* Vòng sóng 2: Chạy sau 1s (Cú pháp Tailwind v4) */}
          <span className="absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-60 animate-ripple [animation-delay:1s]"></span>

          {/* Đổi Icon: Nếu mở thì hiện X, đóng thì hiện Headset */}
          <Headset size={24} />
        </button>
      </div>

    </div>
  )
}