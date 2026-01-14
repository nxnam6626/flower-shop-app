import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Home, Flower2, Star, TrendingUp } from 'lucide-react'
import productsData from '@/data/products.json'

export default function ProductsPage() {
    // Get featured products (top rated or best sellers)
    const featuredProducts = productsData.products
        .filter(p => p.tags.includes('hot') || p.tags.includes('best-seller'))
        .slice(0, 4)

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Breadcrumb */}
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-4">
                    <nav aria-label="Breadcrumb">
                        <ol className="flex items-center gap-2 text-sm">
                            <li>
                                <Link
                                    href="/"
                                    className="flex items-center gap-1 text-slate-600 hover:text-pink-600 transition-colors"
                                >
                                    <Home size={16} />
                                    Trang chủ
                                </Link>
                            </li>
                            <ChevronRight size={16} className="text-slate-400" />
                            <li className="font-medium text-pink-600" aria-current="page">
                                Sản phẩm
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-pink-50 border-b border-pink-100">
                <div className="container mx-auto px-4 py-16 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-6">
                        <Flower2 className="w-10 h-10 text-pink-500" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                        Khám Phá Bộ Sưu Tập Hoa
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                        Tươi mới mỗi ngày, giao hàng nhanh chóng. Hơn{' '}
                        <span className="font-bold text-pink-600">{productsData.products.length}</span> sản phẩm
                        đang chờ bạn khám phá.
                    </p>

                    {/* Quick Stats */}
                    <div className="flex items-center justify-center gap-8 flex-wrap">
                        <div className="flex items-center gap-2 text-slate-600">
                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-medium">Đánh giá 4.8+ ⭐</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                            <TrendingUp className="w-5 h-5 text-green-500" />
                            <span className="text-sm font-medium">100% Hoa Tươi</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                            <span className="text-2xl">🚚</span>
                            <span className="text-sm font-medium">Giao Trong 2h</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Grid */}
            <div className="container mx-auto px-4 py-16">

                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-800 mb-3">
                        Danh Mục Sản Phẩm
                    </h2>
                    <p className="text-slate-600">
                        Chọn danh mục để khám phá các sản phẩm tuyệt vời
                    </p>
                </div>

                {/* Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {productsData.categories.map((category, index) => (
                        <Link
                            key={category.id}
                            href={`/san-pham/${category.slug}`}
                            className="group relative bg-white rounded-2xl border-2 border-slate-200 overflow-hidden hover:border-pink-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Background Pattern */}
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-rose-50 opacity-0 group-hover:opacity-100 transition-opacity" />

                            {/* Content */}
                            <div className="relative p-8 text-center">
                                {/* Icon */}
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-pink-100 rounded-full mb-4 group-hover:bg-pink-200 transition-colors">
                                    <span className="text-4xl">
                                        {index === 0 ? '💐' : index === 1 ? '🧺' : index === 2 ? '📦' : '🌸'}
                                    </span>
                                </div>

                                {/* Name */}
                                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-pink-600 transition-colors">
                                    {category.name}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-slate-500 mb-4">
                                    {category.description}
                                </p>

                                {/* Count */}
                                <div className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full text-sm font-medium text-slate-700 group-hover:bg-pink-100 group-hover:text-pink-700 transition-colors">
                                    <span>{category.count}</span>
                                    <span>sản phẩm</span>
                                </div>

                                {/* Arrow */}
                                <div className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                                    <ChevronRight size={16} className="text-pink-600" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Featured Products */}
                <div className="mt-20">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-800 mb-2">
                                Sản Phẩm Nổi Bật
                            </h2>
                            <p className="text-slate-600">
                                Những sản phẩm được yêu thích nhất
                            </p>
                        </div>
                        <Link
                            href="/san-pham/bo-hoa"
                            className="hidden md:inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium"
                        >
                            Xem tất cả
                            <ChevronRight size={16} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredProducts.map((product) => (
                            <Link
                                key={product.id}
                                href={`/san-pham/${product.category}/${product.slug}`}
                                className="group block bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Image */}
                                <div className="relative aspect-square overflow-hidden bg-slate-100">
                                    <Image
                                        src={product.thumbnail}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    />

                                    {/* Badge */}
                                    {product.tags.includes('hot') && (
                                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                                            🔥 HOT
                                        </span>
                                    )}

                                    {product.discount && (
                                        <span className="absolute top-3 right-3 bg-pink-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                                            -{product.discount}%
                                        </span>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <span className="text-xs text-pink-600 font-medium uppercase tracking-wide">
                                        {product.specifications.type}
                                    </span>
                                    <h3 className="font-semibold text-slate-800 mt-1 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
                                        {product.name}
                                    </h3>

                                    {/* Price */}
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xl font-bold text-pink-600">
                                            {product.price.toLocaleString('vi-VN')}đ
                                        </span>
                                        {product.originalPrice && (
                                            <span className="text-sm text-slate-400 line-through">
                                                {product.originalPrice.toLocaleString('vi-VN')}đ
                                            </span>
                                        )}
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center gap-1 mt-2 pt-2 border-t border-slate-100">
                                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-medium text-slate-700">{product.rating}</span>
                                        <span className="text-xs text-slate-500">({product.reviewCount})</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Mobile "View All" Button */}
                    <div className="mt-8 text-center md:hidden">
                        <Link
                            href="/san-pham/bo-hoa"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-pink-600 text-white rounded-full font-medium hover:bg-pink-700 transition-colors"
                        >
                            Xem tất cả sản phẩm
                            <ChevronRight size={16} />
                        </Link>
                    </div>
                </div>

            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Không Tìm Được Hoa Ưng Ý?
                    </h2>
                    <p className="text-lg text-pink-100 mb-8 max-w-2xl mx-auto">
                        Liên hệ ngay với chúng tôi để được tư vấn và thiết kế hoa theo yêu cầu riêng
                    </p>
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                        <Link
                            href="/lien-he"
                            className="px-8 py-4 bg-white text-pink-600 rounded-full font-bold hover:bg-pink-50 transition-colors shadow-lg"
                        >
                            Liên Hệ Ngay
                        </Link>
                        <a
                            href="tel:0934072575"
                            className="px-8 py-4 bg-pink-700 text-white rounded-full font-bold hover:bg-pink-800 transition-colors border-2 border-white/20"
                        >
                            📞 093 407 2575
                        </a>
                    </div>
                </div>
            </div>

        </div>
    )
}
