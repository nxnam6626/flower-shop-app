'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Phone, Mail, MapPin, Heart, Send } from 'lucide-react'

export default function Footer() {
    return (
        <div className="bg-slate-900 text-white py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <h3 className="font-playfair text-3xl font-bold mb-4 text-white">
                            Pivoine <span className="text-teal-400">Fleur</span>
                        </h3>
                        <p className="text-slate-400 mb-6 font-light leading-relaxed">
                            Mang đến những đóa hoa tươi đẹp nhất, trao gửi yêu thương qua từng cánh hoa tinh tế.
                        </p>
                        {/* Social Icons */}
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-teal-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12.49 10.272v-.45h1.347v6.322h-1.347v-.45a2.97 2.97 0 01-1.978.756c-1.648 0-2.984-1.398-2.984-3.122s1.336-3.123 2.984-3.123c.747 0 1.43.28 1.978.756v.31zm-1.978 4.817c.996 0 1.802-.842 1.802-1.885s-.806-1.884-1.802-1.884c-.995 0-1.8.841-1.8 1.884s.805 1.885 1.8 1.885z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-lg mb-6 text-white flex items-center gap-2">
                            <div className="w-8 h-[2px] bg-teal-500"></div>
                            Danh mục
                        </h4>
                        <ul className="space-y-3">
                            {['Bó hoa', 'Giỏ hoa', 'Hộp hoa', 'Kệ hoa', 'Hoa sự kiện'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-2 group">
                                        <span className="w-0 group-hover:w-2 h-[1px] bg-teal-400 transition-all duration-300"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-semibold text-lg mb-6 text-white flex items-center gap-2">
                            <div className="w-8 h-[2px] bg-teal-500"></div>
                            Hỗ trợ
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { label: 'Chính sách giao hàng', href: '/shipping' },
                                { label: 'Hướng dẫn đặt hàng', href: '/guide' },
                                { label: 'Chính sách đổi trả', href: '/return' },
                                { label: 'Câu hỏi thường gặp', href: '/faq' },
                            ].map((item) => (
                                <li key={item.label}>
                                    <Link href={item.href} className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-2 group">
                                        <span className="w-0 group-hover:w-2 h-[1px] bg-teal-400 transition-all duration-300"></span>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold text-lg mb-6 text-white flex items-center gap-2">
                            <div className="w-8 h-[2px] bg-teal-500"></div>
                            Liên hệ
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-slate-400">
                                <MapPin size={20} className="text-teal-500 flex-shrink-0 mt-1" />
                                <span>123 Đường Hoa, Quận 1, TP. Hồ Chí Minh</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-400">
                                <Phone size={20} className="text-teal-500 flex-shrink-0" />
                                <a href="tel:0934072575" className="hover:text-teal-400 transition-colors">
                                    093 407 2575
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-slate-400">
                                <Mail size={20} className="text-teal-500 flex-shrink-0" />
                                <a href="mailto:contact@pivoinefleur.com" className="hover:text-teal-400 transition-colors">
                                    contact@pivoinefleur.com
                                </a>
                            </li>
                        </ul>

                        {/* Working Hours */}
                        <div className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                            <p className="text-sm text-slate-400">
                                <span className="text-teal-400 font-semibold">Giờ làm việc:</span><br />
                                Thứ 2 - Chủ nhật: 8:00 - 20:00
                            </p>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 pt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-slate-500 text-sm flex items-center gap-1">
                            © 2024 Pivoine Fleur. Made with <Heart size={14} className="text-pink-500 fill-pink-500" /> in Vietnam
                        </p>
                        <div className="flex gap-6 text-sm text-slate-500">
                            <Link href="/privacy" className="hover:text-teal-400 transition-colors">Chính sách bảo mật</Link>
                            <Link href="/terms" className="hover:text-teal-400 transition-colors">Điều khoản sử dụng</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
