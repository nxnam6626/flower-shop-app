'use client'

import Link from 'next/link'
import { Search, ShoppingCart, Headset, ChevronDown, Flower2, Calendar, Home, Menu, X } from 'lucide-react'
import logo from "@/assets/public/images/pivoine-fleur.jpg"
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

// Menu structure - removed Quà Tặng and Blog
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
]

export default function Header() {
  const pathname = usePathname()
  const [hoveredMenu, setHoveredMenu] = useState<number | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (href: string) => {
    if (!pathname) return false
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-6 py-3">

          {/* LEFT: Logo */}
          <Link href="/" className="flex-shrink-0 group">
            <div className="flex items-center select-none gap-2.5">
              <div className="w-12 h-12 md:w-14 md:h-14 relative rounded-full overflow-hidden border-2 border-pink-100 group-hover:border-pink-300 transition-colors">
                <Image
                  src={logo}
                  alt="Logo Pivoine Fleur"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-xl md:text-2xl font-serif font-bold text-slate-800 tracking-tight group-hover:text-pink-600 transition-colors leading-tight">
                  Pivoine <span className="text-pink-500">Fleur</span>
                </span>
                <span className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-slate-400 font-medium">
                  Trao gửi yêu thương
                </span>
              </div>
            </div>
          </Link>

          {/* CENTER: Navigation Menu - Desktop Only */}
          <nav className="hidden lg:flex flex-1 justify-center">
            <ul className="flex items-center gap-1">
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
                        flex items-center gap-2 px-4 py-3 text-[15px] font-semibold tracking-wide transition-all duration-300 relative antialiased
                        ${active ? 'text-pink-600' : 'text-slate-700 hover:text-pink-600'}
                      `}
                    >
                      {/* Icon with background circle */}
                      <div className="relative">
                        {Icon && (
                          <>
                            <div className={`absolute inset-0 -m-1.5 rounded-full bg-gradient-to-br from-pink-50 to-rose-50 transition-all duration-300 ${hoveredMenu === index || active ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}></div>
                            <Icon className={`w-[18px] h-[18px] relative z-10 transition-all duration-300 ${active ? 'text-pink-500' : hoveredMenu === index ? 'text-pink-400' : 'text-slate-400'
                              }`} />
                          </>
                        )}
                      </div>

                      <span className="relative">
                        {item.label}
                        <span className={`
                          absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 transition-all duration-300 rounded-full
                          ${active ? 'w-full' : 'w-0 group-hover:w-full'}
                        `}></span>
                      </span>

                      {(hasSubmenu || hasMegaMenu) && (
                        <ChevronDown className={`w-3.5 h-3.5 transition-all duration-300 ${hoveredMenu === index ? 'rotate-180 text-pink-500' : 'text-slate-400'}`} />
                      )}
                    </Link>

                    {/* Mega Menu */}
                    {hasMegaMenu && (
                      <div className={`
                        absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[600px] bg-white shadow-2xl rounded-b-2xl overflow-hidden z-50
                        transition-all duration-300 origin-top
                        ${hoveredMenu === index ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}
                      `}>
                        <div className="h-1 bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500"></div>
                        <div className="grid grid-cols-2 gap-6 p-6 bg-gradient-to-b from-white to-pink-50/20">
                          {item.megaMenu!.map((section, sIdx) => (
                            <div key={sIdx}>
                              <h3 className="text-sm font-bold text-pink-600 mb-3 flex items-center gap-2 uppercase tracking-wide border-b border-pink-100 pb-2">
                                <Flower2 className="w-4 h-4 text-pink-400" />
                                {section.category}
                              </h3>
                              <ul className="space-y-0.5">
                                {section.items.map((subItem, subIdx) => (
                                  <li key={subIdx}>
                                    <Link href={subItem.href} className="group/item flex items-center justify-between py-2 px-3 rounded-lg hover:bg-pink-50 transition-all">
                                      <div className="flex flex-col">
                                        <span className="text-sm font-medium text-slate-800 group-hover/item:text-pink-600">{subItem.label}</span>
                                        <span className="text-xs text-slate-500">{subItem.desc}</span>
                                      </div>
                                      {subItem.badge && (
                                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${subItem.badge === 'Hot' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                                          }`}>{subItem.badge}</span>
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

                    {/* Regular Dropdown */}
                    {hasSubmenu && (
                      <div className={`
                        absolute top-full left-0 mt-0 w-60 bg-white shadow-2xl rounded-b-2xl overflow-hidden z-50
                        transition-all duration-300 origin-top
                        ${hoveredMenu === index ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}
                      `}>
                        <div className="h-1 bg-gradient-to-r from-pink-500 to-rose-400"></div>
                        <ul className="py-2 bg-gradient-to-b from-white to-pink-50/20">
                          {item.submenu!.map((subItem, subIdx) => (
                            <li key={subIdx}>
                              <Link href={subItem.href} className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-pink-50 hover:text-pink-600 transition-all font-medium">
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
          </nav>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">

            {/* Search - Icon only */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="hidden md:flex w-9 h-9 items-center justify-center rounded-full hover:bg-slate-100 text-slate-600 hover:text-pink-600 transition-all"
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            {/* Hotline - Desktop only, compact */}
            <div className="hidden xl:flex items-center gap-2 cursor-pointer group">
              <div className="w-9 h-9 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all">
                <Headset size={16} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] font-medium text-slate-500">Hotline</span>
                <span className="text-xs font-bold text-slate-800 group-hover:text-teal-600 transition-colors">093 407 2575</span>
              </div>
            </div>

            {/* Cart */}
            <Link href="/cart" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="w-9 h-9 bg-pink-50 rounded-full flex items-center justify-center text-pink-500 border border-pink-100 group-hover:bg-pink-500 group-hover:text-white transition-all">
                  <ShoppingCart size={18} strokeWidth={1.5} />
                </div>
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  0
                </span>
              </div>
              <div className="hidden xl:flex flex-col leading-tight">
                <span className="text-[10px] font-medium text-slate-500">Giỏ hàng</span>
                <span className="text-xs font-bold text-slate-800 group-hover:text-pink-600 transition-colors">0đ</span>
              </div>
            </Link>

            {/* Login */}
            <Link href="/login" className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-pink-200 rounded-full text-pink-600 text-xs font-semibold uppercase tracking-wide hover:bg-pink-50 hover:border-pink-400 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
              </svg>
              Đăng nhập
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-700 transition-all"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

          </div>
        </div>

        {/* Search Overlay - Desktop */}
        {searchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-t border-slate-200 shadow-lg py-4 px-4 animate-[slideDown_0.2s_ease-out]">
            <div className="container mx-auto max-w-2xl">
              <div className="flex h-11 border-2 border-pink-400 rounded-full overflow-hidden bg-white focus-within:ring-2 focus-within:ring-pink-200">
                <input
                  type="text"
                  placeholder="Tìm kiếm hoa, danh mục..."
                  className="flex-1 px-5 text-sm outline-none"
                  autoFocus
                />
                <button className="bg-pink-600 w-14 flex items-center justify-center text-white hover:bg-pink-700 transition">
                  <Search size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[73px] bg-black/20 backdrop-blur-sm z-40 animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white h-full w-4/5 max-w-sm shadow-2xl p-6 overflow-y-auto animate-[slideInLeft_0.25s_ease-out]">
            {/* Search - Mobile */}
            <div className="mb-6">
              <div className="flex h-10 border border-slate-300 rounded-full overflow-hidden">
                <input type="text" placeholder="Tìm kiếm..." className="flex-1 px-4 text-sm outline-none" />
                <button className="bg-pink-600 w-12 flex items-center justify-center text-white">
                  <Search size={18} />
                </button>
              </div>
            </div>

            {/* Mobile Menu Items */}
            <nav>
              <ul className="space-y-1">
                {MENU_ITEMS.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <li key={index}>
                      {item.submenu || item.megaMenu ? (
                        <details className="group/sub">
                          <summary className="flex items-center justify-between cursor-pointer px-4 py-3 text-base text-slate-800 hover:bg-pink-50 rounded-xl font-medium min-h-[48px]">
                            <span className="flex items-center gap-3">
                              {Icon && <Icon className="w-5 h-5 text-pink-400" />}
                              {item.label}
                            </span>
                            <ChevronDown className="w-5 h-5 transition-transform group-open/sub:rotate-180" />
                          </summary>
                          <ul className="ml-8 mt-2 space-y-1 border-l-2 border-pink-100 pl-3">
                            {item.submenu && item.submenu.map((subItem, subIdx) => (
                              <li key={subIdx}>
                                <Link href={subItem.href} className="block px-4 py-2.5 text-sm text-slate-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg min-h-[44px] flex items-center">
                                  {subItem.label}
                                </Link>
                              </li>
                            ))}
                            {item.megaMenu && item.megaMenu.map((section) => (
                              <div key={section.category} className="mb-2">
                                <div className="text-xs font-bold text-pink-600 px-4 py-1.5 uppercase">{section.category}</div>
                                {section.items.map((subItem, subIdx) => (
                                  <Link key={subIdx} href={subItem.href} className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg min-h-[44px]">
                                    <span>{subItem.label}</span>
                                    {subItem.badge && (
                                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase ${subItem.badge === 'Hot' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
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
                        <Link href={item.href} className={`flex items-center gap-3 px-4 py-3 text-base rounded-xl font-medium min-h-[48px] transition-colors ${isActive(item.href) ? 'bg-pink-50 text-pink-600' : 'text-slate-700 hover:bg-pink-50'}`}>
                          {Icon && <Icon className={`w-5 h-5 ${isActive(item.href) ? 'text-pink-500' : 'text-slate-400'}`} />}
                          {item.label}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </nav>

            {/* Mobile Login */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <Link href="/login" className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                </svg>
                Đăng nhập / Đăng ký
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </header>
  )
}