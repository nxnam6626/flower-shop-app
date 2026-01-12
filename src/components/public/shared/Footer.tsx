import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 py-12 mt-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h3 className="font-serif text-2xl font-bold mb-4 text-gray-800">
                        Pivoine Fleur
                    </h3>
                    <p className="text-gray-500 mb-4 font-dancing text-xl">
                        Trao gửi yêu thương qua từng cánh hoa
                    </p>
                </div>

                {/* Footer Links - Có thể mở rộng sau */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-sm">
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Về chúng tôi</h4>
                        <ul className="space-y-2 text-gray-600">
                            <li><Link href="/about" className="hover:text-pink-600">Giới thiệu</Link></li>
                            <li><Link href="/contact" className="hover:text-pink-600">Liên hệ</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Sản phẩm</h4>
                        <ul className="space-y-2 text-gray-600">
                            <li><Link href="/products" className="hover:text-pink-600">Tất cả sản phẩm</Link></li>
                            <li><Link href="/bestsellers" className="hover:text-pink-600">Bán chạy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Hỗ trợ</h4>
                        <ul className="space-y-2 text-gray-600">
                            <li><Link href="/shipping" className="hover:text-pink-600">Chính sách giao hàng</Link></li>
                            <li><Link href="/return" className="hover:text-pink-600">Đổi trả</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Liên hệ</h4>
                        <ul className="space-y-2 text-gray-600">
                            <li>Hotline: 093 407 2575</li>
                            <li>Email: contact@pivoinefleur.com</li>
                        </ul>
                    </div>
                </div>

                <div className="text-center text-xs text-gray-400 border-t border-gray-200 pt-6">
                    © 2024 Pivoine Fleur. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
