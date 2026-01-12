'use client'

import Link from 'next/link'
import { Search, ShoppingCart, Headset, ChevronDown } from 'lucide-react'
import logo from "@/assets/public/images/pivoine-fleur.jpg"
import Image from 'next/image'

export default function Header() {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4 md:gap-8">

        {/* 1. LOGO AREA */}
        <Link href="/" className="flex-shrink-0">

          <div className="flex items-center select-none">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mr-1">

              <Image src={logo} alt="Logo" width={80} height={80} />
            </div>
            <span className="text-3xl font-black text-pink-600 tracking-tighter">Pivoine Fleur</span>
          </div>
        </Link>

        {/* 2. SEARCH BAR (Thanh tìm kiếm) */}
        <div className="flex-1 max-w-2xl hidden md:block">
          <div className="flex h-10 border border-gray-300 rounded-sm overflow-hidden">
            {/* Dropdown 'All' */}
            <button className="flex items-center gap-1 bg-pink-50 px-3 text-xs text-pink-700 border-r border-pink-200 hover:bg-pink-100 transition">
              All <ChevronDown size={14} />
            </button>

            {/* Input */}
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm, danh mục..."
              className="flex-1 px-4 text-sm outline-none text-gray-700 placeholder:text-gray-400"
            />


            <button className="bg-pink-600 w-12 flex items-center justify-center text-white hover:bg-pink-700 transition">
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* 3. RIGHT ACTIONS (Hỗ trợ, Giỏ hàng, Login) */}
        <div className="flex items-center gap-6 lg:gap-8 text-sm text-gray-700">

          {/* Hỗ trợ khách hàng */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 border border-pink-600 rounded-full flex items-center justify-center text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition">
              <Headset size={20} strokeWidth={1.5} />
            </div>
            <div className="hidden lg:flex flex-col leading-tight">
              <span className="font-medium text-gray-500 text-xs">Hỗ trợ</span>
              <span className="font-bold text-pink-600">khách hàng</span>
            </div>
          </div>

          {/* Giỏ Hàng (Cart) - Thiết kế nổi bật như hình mẫu */}
          <Link href="/cart" className="flex items-center gap-2 bg-pink-50 px-4 py-2 rounded-full border border-pink-100 shadow-sm hover:shadow-md transition relative overflow-hidden group">
            {/* Background pattern giả lập */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/floral-linen.png')] group-hover:opacity-20 transition"></div>

            <ShoppingCart size={18} className="text-blue-500 z-10" />
            {/* Badge Số lượng */}
            <span className="bg-pink-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center z-10 shadow-sm">0</span>
            <span className="text-blue-500 font-medium z-10">Giỏ hàng</span>
          </Link>

          {/* Đăng nhập / Đăng ký */}
          <div className="hidden xl:block text-xs font-medium text-gray-600 hover:text-pink-600 cursor-pointer uppercase tracking-wide">
            Đăng nhập / Đăng ký
          </div>

        </div>
      </div>

      {/* Mobile Search (Hiện khi màn hình nhỏ) */}
      <div className="md:hidden px-4 pb-3">
        <div className="flex h-10 border border-gray-300 rounded-sm overflow-hidden">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="flex-1 px-4 text-sm outline-none"
          />
          <button className="bg-pink-600 w-12 flex items-center justify-center text-white hover:bg-pink-700 transition">
            <Search size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}