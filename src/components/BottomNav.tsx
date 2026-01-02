'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ImageIcon, MessageSquare } from 'lucide-react'

export default function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    {
      href: '/dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard'
    },
    {
      href: '/gallery',
      icon: ImageIcon,
      label: 'Thư viện'
    },
    {
      href: '/consultations',
      icon: MessageSquare,
      label: 'Tư vấn'
    }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden z-50 safe-area-inset-bottom">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full transition ${
                isActive 
                  ? 'text-pink-600' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Icon size={24} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
