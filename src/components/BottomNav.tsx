'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  MessageCircle, 
  ShoppingBag, 
  Plus 
} from 'lucide-react'

export default function BottomNav() {
  const pathname = usePathname()

  // Định nghĩa các mục điều hướng
  const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Tổng quan' },
    { href: '/gallery', icon: ImageIcon, label: 'Thư viện' }, // Quản lý library
    { href: '/consultations', icon: MessageCircle, label: 'Tư vấn' }, // Lead Capture
    { href: '/orders', icon: ShoppingBag, label: 'Đơn hàng' }, // Order Management
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 lg:hidden z-50 pb-safe">
      <div className="flex justify-around items-center h-16 px-2 relative">
        
        {/* Nhóm bên trái: Dashboard & Thư viện */}
        <div className="flex flex-1 justify-around">
          {navItems.slice(0, 2).map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <NavLink key={item.href} item={item} isActive={isActive} Icon={Icon} />
            )
          })}
        </div>

        {/* Nút Upload trung tâm: Visual-First Action */}
        <div className="relative w-16 h-16 flex justify-center">
          <Link
            href="/upload"
            className="absolute -top-7 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-90 transition-all border-4 border-white"
          >
            <Plus size={30} strokeWidth={3} />
          </Link>
          <span className="text-[10px] mt-9 font-bold text-gray-400">ĐĂNG ẢNH</span>
        </div>

        {/* Nhóm bên phải: Tư vấn & Đơn hàng */}
        <div className="flex flex-1 justify-around">
          {navItems.slice(2, 4).map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <NavLink key={item.href} item={item} isActive={isActive} Icon={Icon} />
            )
          })}
        </div>

      </div>
    </nav>
  )
}

// Component con để tái sử dụng style
function NavLink({ item, isActive, Icon }: any) {
  return (
    <Link
      href={item.href}
      className={`flex flex-col items-center justify-center transition-all duration-300 ${
        isActive ? 'text-pink-600 scale-110' : 'text-gray-400 hover:text-gray-600'
      }`}
    >
      <Icon size={isActive ? 24 : 22} strokeWidth={isActive ? 2.5 : 2} />
      <span className={`text-[10px] mt-1 font-semibold ${isActive ? 'opacity-100' : 'opacity-70'}`}>
        {item.label}
      </span>
    </Link>
  )
}