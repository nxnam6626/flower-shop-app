'use client'

import { ChevronDown, Flower2, Gift, Sparkles, Calendar, Home, Star } from 'lucide-react'
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
          { label: 'Bó Hoa', href: '/san-pham/bo-hoa', desc: 'Bó hoa tươi đẹp', badge: null },
          { label: 'Giỏ Hoa', href: '/san-pham/gio-hoa', desc: 'Giỏ hoa sang trọng', badge: 'Hot' },
          { label: 'Hộp Hoa', href: '/san-pham/hop-hoa', desc: 'Hộp hoa cao cấp', badge: null },
          { label: 'Lẵng Hoa', href: '/san-pham/lang-hoa', desc: 'Lẵng hoa trang trọng', badge: null },
          { label: 'Hoa Để Bàn', href: '/san-pham/hoa-de-ban', desc: 'Trang trí không gian', badge: 'Mới' },
        ]
      },
      {
        category: 'Đặc Biệt',
        items: [
          { label: 'Hoa Sáp', href: '/san-pham/hoa-sap', desc: 'Lưu giữ mãi mãi', badge: null },
          { label: 'Hoa Gấu Bông', href: '/san-pham/hoa-gau-bong', desc: 'Dễ thương đáng yêu', badge: 'Hot' },
          { label: 'Lan Hồ Điệp', href: '/san-pham/lan-ho-diep', desc: 'Sang trọng quý phái', badge: null },
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
    <nav className="bg-white border-b border-slate-200 shadow-sm relative z-40">

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
                    flex items-center gap-2.5 px-6 py-5 text-[16px] font-semibold tracking-wide transition-all duration-300 relative antialiased
                    ${active
                      ? 'text-pink-600'
                      : 'text-slate-700 hover:text-pink-600'
                    }
                  `}
                >
                  {/* Icon with background circle on hover */}
                  <div className="relative">
                    {Icon && (
                      <>
                        {/* Background circle - appears on hover */}
                        <div className={`absolute inset-0 -m-2 rounded-full bg-gradient-to-br from-pink-50 to-rose-50 transition-all duration-300 ${hoveredMenu === index || active ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}></div>

                        {/* Icon */}
                        <Icon className={`w-5 h-5 relative z-10 transition-all duration-300 ${active
                            ? 'text-pink-500'
                            : hoveredMenu === index
                              ? 'text-pink-400 animate-bounce'
                              : 'text-slate-400'
                          }`} />
                      </>
                    )}
                  </div>

                  <span className="relative">
                    {item.label}
                    {/* Elegant gradient underline */}
                    <span className={`
                      absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 transition-all duration-300 rounded-full
                      ${active ? 'w-full' : 'w-0 group-hover:w-full'}
                    `}></span>
                  </span>

                  {(hasSubmenu || hasMegaMenu) && (
                    <ChevronDown
                      className={`w-4 h-4 transition-all duration-300 ${hoveredMenu === index
                          ? 'rotate-180 text-pink-500'
                          : 'text-slate-400'
                        }`}
                    />
                  )}
                </Link>

                {/* Mega Menu for Products */}
                {hasMegaMenu && (
                  <div
                    className={`
                      absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[650px] bg-white shadow-2xl rounded-b-2xl overflow-hidden z-50
                      transition-all duration-300 origin-top
                      ${hoveredMenu === index
                        ? 'opacity-100 visible translate-y-0'
                        : 'opacity-0 invisible -translate-y-4'
                      }
                    `}
                  >
                    {/* Decorative gradient header */}
                    <div className="h-1 bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500"></div>

                    {/* Quick stats bar */}
                    <div className="bg-gradient-to-r from-pink-50/50 to-rose-50/50 px-6 py-3 border-b border-pink-100">
                      <div className="flex items-center justify-center gap-6 text-xs font-semibold text-slate-600">
                        <span className="flex items-center gap-1.5">
                          <Star className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
                          100+ Mẫu Hoa
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className="flex items-center gap-1.5">
                          ⚡ Giao Trong 2h
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className="flex items-center gap-1.5">
                          🌸 Tươi 5 Ngày
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 p-8 bg-gradient-to-b from-white to-pink-50/20">
                      {item.megaMenu!.map((section, sIdx) => (
                        <div key={sIdx} className="space-y-1">
                          <h3 className="text-base font-bold text-pink-600 mb-4 flex items-center gap-2 uppercase tracking-wider border-b-2 border-pink-200 pb-3">
                            <Flower2 className="w-5 h-5 text-pink-400" />
                            {section.category}
                          </h3>
                          <ul className="space-y-0.5">
                            {section.items.map((subItem, subIdx) => (
                              <li key={subIdx}>
                                <Link
                                  href={subItem.href}
                                  className="group/item flex items-center justify-between py-3 px-4 rounded-xl hover:bg-pink-50 transition-all duration-200 border-l-3 border-transparent hover:border-pink-400 hover:translate-x-1"
                                >
                                  <div className="flex flex-col">
                                    <span className="text-[15px] font-medium text-slate-800 group-hover/item:text-pink-600 transition-colors">
                                      {subItem.label}
                                    </span>
                                    <span className="text-xs text-slate-500 group-hover/item:text-slate-600">{subItem.desc}</span>
                                  </div>
                                  {subItem.badge && (
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${subItem.badge === 'Hot'
                                        ? 'bg-red-500 text-white'
                                        : 'bg-green-500 text-white'
                                      }`}>
                                      {subItem.badge}
                                    </span>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Regular Dropdown for Events */}
                {hasSubmenu && (
                  <div
                    className={`
                      absolute top-full left-0 mt-0 w-64 bg-white shadow-2xl rounded-b-2xl overflow-hidden z-50
                      transition-all duration-300 origin-top
                      ${hoveredMenu === index
                        ? 'opacity-100 visible translate-y-0'
                        : 'opacity-0 invisible -translate-y-4'
                      }
                    `}
                  >
                    {/* Decorative gradient header */}
                    <div className="h-1 bg-gradient-to-r from-pink-500 to-rose-400"></div>

                    <ul className="py-3 bg-gradient-to-b from-white to-pink-50/20">
                      {item.submenu!.map((subItem, subIdx) => (
                        <li key={subIdx}>
                          <Link
                            href={subItem.href}
                            className="block px-5 py-3 text-[15px] text-slate-700 hover:bg-pink-50 hover:text-pink-600 transition-all font-medium border-l-3 border-transparent hover:border-pink-400 hover:pl-7"
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
            <summary className="flex items-center justify-between cursor-pointer text-slate-700 font-semibold py-3 px-4 bg-slate-50 rounded-xl hover:bg-pink-50 transition-colors min-h-[48px]">
              <span className="flex items-center gap-3 text-base">
                <Flower2 className="w-6 h-6 text-pink-500" />
                Danh Mục
              </span>
              <ChevronDown className="w-6 h-6 transition-transform group-open:rotate-180 text-slate-400" />
            </summary>
            <ul className="mt-3 space-y-1 bg-white rounded-xl p-3 border border-slate-100 shadow-sm">
              {MENU_ITEMS.map((item, index) => {
                const Icon = item.icon
                return (
                  <li key={index}>
                    {item.submenu || item.megaMenu ? (
                      <details className="group/sub">
                        <summary className="flex items-center justify-between cursor-pointer px-4 py-3.5 text-base text-slate-800 hover:bg-pink-50 rounded-xl font-medium min-h-[48px]">
                          <span className="flex items-center gap-3">
                            {Icon && <Icon className="w-6 h-6 text-pink-400" />}
                            {item.label}
                          </span>
                          <ChevronDown className="w-5 h-5 transition-transform group-open/sub:rotate-180 text-slate-400" />
                        </summary>
                        <ul className="ml-8 mt-2 space-y-1 border-l-2 border-pink-100 pl-4">
                          {item.submenu && item.submenu.map((subItem, subIdx) => (
                            <li key={subIdx}>
                              <Link
                                href={subItem.href}
                                className="block px-4 py-3 text-base text-slate-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg min-h-[48px] flex items-center"
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                          {item.megaMenu && item.megaMenu.map((section) => (
                            <div key={section.category} className="mb-3">
                              <div className="text-sm font-bold text-pink-600 px-4 py-2 uppercase tracking-wide">{section.category}</div>
                              {section.items.map((subItem, subIdx) => (
                                <Link
                                  key={subIdx}
                                  href={subItem.href}
                                  className="flex items-center justify-between px-4 py-3 text-base text-slate-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg min-h-[48px]"
                                >
                                  <span>{subItem.label}</span>
                                  {subItem.badge && (
                                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${subItem.badge === 'Hot'
                                        ? 'bg-red-500 text-white'
                                        : 'bg-green-500 text-white'
                                      }`}>
                                      {subItem.badge}
                                    </span>
                                  )}
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
                          flex items-center gap-3 px-4 py-3.5 text-base rounded-xl transition-colors font-medium min-h-[48px]
                          ${isActive(item.href)
                            ? 'bg-pink-50 text-pink-600'
                            : 'text-slate-700 hover:bg-pink-50 hover:text-pink-600'
                          }
                        `}
                      >
                        {Icon && <Icon className={`w-6 h-6 ${isActive(item.href) ? 'text-pink-500' : 'text-slate-400'}`} />}
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

      {/* Custom styles for bounce animation */}
      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-bounce {
          animation: bounce 0.6s ease-in-out;
        }
      `}</style>
    </nav>
  )
}
