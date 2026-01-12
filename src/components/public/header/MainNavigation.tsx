'use client'

import { ChevronDown, Flower2, Gift, Heart, Sparkles, Calendar, Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

// Elegant menu structure for flower shop
const MENU_ITEMS = [
  {
    label: 'Trang chủ',
    href: '/',
    icon: Home,
  },
  {
    label: 'Sản phẩm',
    href: '/san-pham',
    icon: Flower2,
    megaMenu: [
      {
        category: 'Theo Kiểu Dáng',
        items: [
          { label: 'Bó Hoa', href: '/san-pham/bo-hoa', desc: 'Bó hoa tươi đẹp' },
          { label: 'Giỏ Hoa', href: '/san-pham/gio-hoa', desc: 'Giỏ hoa sang trọng' },
          { label: 'Hộp Hoa', href: '/san-pham/hop-hoa', desc: 'Hộp hoa cao cấp' },
          { label: 'Lẵng Hoa', href: '/san-pham/lang-hoa', desc: 'Lẵng hoa trang trọng' },
          { label: 'Hoa Để Bàn', href: '/san-pham/hoa-de-ban', desc: 'Trang trí không gian' },
        ]
      },
      {
        category: 'Đặc Biệt',
        items: [
          { label: 'Hoa Sáp', href: '/san-pham/hoa-sap', desc: 'Lưu giữ mãi mãi' },
          { label: 'Hoa Gấu Bông', href: '/san-pham/hoa-gau-bong', desc: 'Dễ thương đáng yêu' },
          { label: 'Lan Hồ Điệp', href: '/san-pham/lan-ho-diep', desc: 'Sang trọng quý phái' },
        ]
      }
    ]
  },
  {
    label: 'Dịp Đặc Biệt',
    href: '/dip-dac-biet',
    icon: Calendar,
    submenu: [
      { label: '💝 Sinh nhật', href: '/dip-dac-biet/sinh-nhat' },
      { label: '💍 Đám cưới', href: '/dip-dac-biet/dam-cuoi' },
      { label: '🎓 Tốt nghiệp', href: '/dip-dac-biet/tot-nghiep' },
      { label: '🌟 Khai trương', href: '/dip-dac-biet/khai-truong' },
      { label: '💐 Valentine', href: '/dip-dac-biet/valentine' },
      { label: '👩 Ngày 8/3', href: '/dip-dac-biet/8-3' },
      { label: '👨‍🏫 Ngày 20/11', href: '/dip-dac-biet/20-11' },
      { label: '🎄 Giáng sinh', href: '/dip-dac-biet/giang-sinh' },
    ]
  },
  {
    label: 'Quà Tặng',
    href: '/qua-tang',
    icon: Gift,
  },
  {
    label: 'Blog',
    href: '/blog',
    icon: Sparkles,
  },
]

export default function MainNavigation() {
  const pathname = usePathname()
  const [hoveredMenu, setHoveredMenu] = useState<number | null>(null)

  const isActive = (href: string) => {
    if (!pathname) return false
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav className="bg-gradient-to-r from-pink-50 via-white to-purple-50 border-b border-pink-100 shadow-sm relative overflow-hidden">
      {/* Decorative flower petals */}
      <div className="absolute top-0 right-10 w-16 h-16 bg-pink-200/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-20 w-20 h-20 bg-purple-200/20 rounded-full blur-2xl"></div>

      <div className="container mx-auto px-4">
        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center justify-center gap-2">
          {MENU_ITEMS.map((item, index) => {
            const active = isActive(item.href)
            const hasSubmenu = item.submenu && item.submenu.length > 0
            const hasMegaMenu = item.megaMenu && item.megaMenu.length > 0
            const Icon = item.icon

            return (
              <li
                key={index}
                className="relative group"
                onMouseEnter={() => setHoveredMenu(index)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-2 px-5 py-4 text-sm font-medium transition-all duration-300 relative
                    ${active
                      ? 'text-pink-600'
                      : 'text-gray-700 hover:text-pink-600'
                    }
                  `}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span className="relative">
                    {item.label}
                    {/* Elegant underline */}
                    <span className={`
                      absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300
                      ${active ? 'w-full' : 'w-0 group-hover:w-full'}
                    `}></span>
                  </span>
                  {(hasSubmenu || hasMegaMenu) && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${hoveredMenu === index ? 'rotate-180' : ''
                        }`}
                    />
                  )}

                  {/* Floating flower on hover */}
                  {hoveredMenu === index && (
                    <Flower2 className="absolute -top-2 right-0 w-3 h-3 text-pink-400 animate-bounce" />
                  )}
                </Link>

                {/* Mega Menu for Products */}
                {hasMegaMenu && (
                  <div
                    className={`
                      absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[600px] bg-white/95 backdrop-blur-sm shadow-2xl rounded-b-2xl overflow-hidden z-50
                      transition-all duration-300 origin-top border-t-4 border-pink-500
                      ${hoveredMenu === index
                        ? 'opacity-100 visible scale-y-100'
                        : 'opacity-0 invisible scale-y-0'
                      }
                    `}
                  >
                    <div className="grid grid-cols-2 gap-6 p-6">
                      {item.megaMenu!.map((section, sIdx) => (
                        <div key={sIdx}>
                          <h3 className="text-sm font-bold text-pink-600 mb-3 flex items-center gap-2">
                            <Flower2 className="w-4 h-4" />
                            {section.category}
                          </h3>
                          <ul className="space-y-2">
                            {section.items.map((subItem, subIdx) => (
                              <li key={subIdx}>
                                <Link
                                  href={subItem.href}
                                  className="group/item flex flex-col py-2 px-3 rounded hover:bg-pink-50 transition-colors"
                                >
                                  <span className="text-sm font-medium text-gray-800 group-hover/item:text-pink-600">
                                    {subItem.label}
                                  </span>
                                  <span className="text-xs text-gray-500">{subItem.desc}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    {/* Decorative bottom border */}
                    <div className="h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400"></div>
                  </div>
                )}

                {/* Regular Dropdown for Events */}
                {hasSubmenu && (
                  <div
                    className={`
                      absolute top-full left-0 mt-0 w-64 bg-white/95 backdrop-blur-sm shadow-xl rounded-b-2xl overflow-hidden z-50
                      transition-all duration-300 origin-top border-t-4 border-pink-500
                      ${hoveredMenu === index
                        ? 'opacity-100 visible scale-y-100'
                        : 'opacity-0 invisible scale-y-0'
                      }
                    `}
                  >
                    <ul className="py-3">
                      {item.submenu!.map((subItem, subIdx) => (
                        <li key={subIdx}>
                          <Link
                            href={subItem.href}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            )
          })}
        </ul>

        {/* Mobile Navigation */}
        <div className="lg:hidden py-3">
          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer text-gray-700 font-medium py-2 px-3 bg-white/50 rounded-lg">
              <span className="flex items-center gap-2">
                <Flower2 className="w-5 h-5 text-pink-600" />
                Menu
              </span>
              <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
            </summary>
            <ul className="mt-2 space-y-1 border-t pt-2">
              {MENU_ITEMS.map((item, index) => {
                const Icon = item.icon
                return (
                  <li key={index}>
                    {item.submenu || item.megaMenu ? (
                      <details className="group/sub">
                        <summary className="flex items-center justify-between cursor-pointer px-3 py-2 text-sm text-gray-700 hover:bg-pink-50 rounded">
                          <span className="flex items-center gap-2">
                            {Icon && <Icon className="w-4 h-4" />}
                            {item.label}
                          </span>
                          <ChevronDown className="w-4 h-4 transition-transform group-open/sub:rotate-180" />
                        </summary>
                        <ul className="ml-6 mt-1 space-y-1">
                          {item.submenu && item.submenu.map((subItem, subIdx) => (
                            <li key={subIdx}>
                              <Link
                                href={subItem.href}
                                className="block px-3 py-2 text-sm text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded"
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                          {item.megaMenu && item.megaMenu.map((section) => (
                            <div key={section.category} className="mb-2">
                              <div className="text-xs font-semibold text-pink-600 px-3 py-1">{section.category}</div>
                              {section.items.map((subItem, subIdx) => (
                                <Link
                                  key={subIdx}
                                  href={subItem.href}
                                  className="block px-3 py-2 text-sm text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded"
                                >
                                  {subItem.label}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </ul>
                      </details>
                    ) : (
                      <Link
                        href={item.href}
                        className={`
                          flex items-center gap-2 px-3 py-2 text-sm rounded transition-colors
                          ${isActive(item.href)
                            ? 'bg-pink-100 text-pink-600 font-medium'
                            : 'text-gray-700 hover:bg-pink-50'
                          }
                        `}
                      >
                        {Icon && <Icon className="w-4 h-4" />}
                        {item.label}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </details>
        </div>
      </div>
    </nav>
  )
}