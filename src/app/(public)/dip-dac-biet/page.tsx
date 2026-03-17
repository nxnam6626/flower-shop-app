import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Home, Calendar, Star, Heart } from 'lucide-react'
import productsData from '@/data/products.json'

// Occasions with their details
const OCCASIONS = [
    {
        id: 'birthday',
        name: 'Sinh Nhật',
        emoji: '🎂',
        description: 'Hoa tươi thắm cho ngày sinh nhật đáng nhớ',
        color: 'from-pink-500 to-rose-500',
        bgColor: 'bg-pink-50',
        textColor: 'text-pink-600',
        slug: 'sinh-nhat'
    },
    {
        id: 'valentine',
        name: 'Valentine',
        emoji: '💝',
        description: 'Tỏ tình lãng mạn với hoa tươi đẹp',
        color: 'from-red-500 to-pink-500',
        bgColor: 'bg-red-50',
        textColor: 'text-red-600',
        slug: 'valentine'
    },
    {
        id: 'anniversary',
        name: 'Kỷ Niệm',
        emoji: '💍',
        description: 'Kỷ niệm những khoảnh khắc đáng nhớ',
        color: 'from-purple-500 to-pink-500',
        bgColor: 'bg-purple-50',
        textColor: 'text-purple-600',
        slug: 'ky-niem'
    },
    {
        id: 'wedding',
        name: 'Đám Cưới',
        emoji: '💐',
        description: 'Hoa cưới sang trọng cho ngày trọng đại',
        color: 'from-pink-400 to-rose-400',
        bgColor: 'bg-pink-50',
        textColor: 'text-pink-600',
        slug: 'dam-cuoi'
    },
    {
        id: 'graduation',
        name: 'Tốt Nghiệp',
        emoji: '🎓',
        description: 'Chúc mừng thành công rực rỡ',
        color: 'from-blue-500 to-cyan-500',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-600',
        slug: 'tot-nghiep'
    },
    {
        id: 'opening',
        name: 'Khai Trương',
        emoji: '🌟',
        description: 'Phát tài phát lộc với hoa tươi đẹp',
        color: 'from-yellow-500 to-orange-500',
        bgColor: 'bg-yellow-50',
        textColor: 'text-yellow-600',
        slug: 'khai-truong'
    },
]

export default function SpecialOccasionsPage() {
    // Get products for each occasion
    const getOccasionProducts = (occasionId: string) => {
        return productsData.products
            .filter(p => p.occasions.includes(occasionId))
            .slice(0, 3)
    }

    // Top occasions with most products
    const topOccasions = OCCASIONS.map(occasion => ({
        ...occasion,
        productCount: productsData.products.filter(p => p.occasions.includes(occasion.id)).length
    })).sort((a, b) => b.productCount - a.productCount)

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
                                Dịp Đặc Biệt
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 border-b border-pink-100">
                <div className="container mx-auto px-4 py-16 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-6">
                        <Calendar className="w-10 h-10 text-pink-500" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                        Hoa Cho Mọi Dịp Đặc Biệt
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                        Tìm kiếm hoa hoàn hảo cho từng khoảnh khắc quan trọng trong cuộc sống.
                        Mỗi dịp đều xứng đáng được tôn vinh với những bông hoa tươi thắm nhất.
                    </p>

                    {/* Quick Stats */}
                    <div className="flex items-center justify-center gap-8 flex-wrap">
                        <div className="flex items-center gap-2 text-slate-600">
                            <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
                            <span className="text-sm font-medium">{OCCASIONS.length} Dịp Lễ</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-medium">Thiết Kế Độc Quyền</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                            <span className="text-2xl">🎁</span>
                            <span className="text-sm font-medium">Miễn Phí Thiệp</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-16">

                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-800 mb-3">
                        Chọn Dịp Để Xem Hoa
                    </h2>
                    <p className="text-slate-600">
                        Mỗi dịp đều có những thiết kế hoa phù hợp và ý nghĩa riêng
                    </p>
                </div>

                {/* Occasions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {topOccasions.map((occasion) => {
                        const products = getOccasionProducts(occasion.id)

                        return (
                            <div
                                key={occasion.id}
                                className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden hover:border-pink-400 hover:shadow-xl transition-all duration-300"
                            >
                                {/* Header */}
                                <div className={`bg-gradient-to-r ${occasion.color} p-6 text-white text-center`}>
                                    <div className="text-6xl mb-3">{occasion.emoji}</div>
                                    <h3 className="text-2xl font-bold mb-2">{occasion.name}</h3>
                                    <p className="text-sm text-white/90 mb-3">{occasion.description}</p>
                                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-medium">
                                        {occasion.productCount} sản phẩm
                                    </div>
                                </div>

                                {/* Product Preview */}
                                {products.length > 0 && (
                                    <div className="p-4">
                                        <div className="grid grid-cols-3 gap-2 mb-4">
                                            {products.map((product, idx) => (
                                                <Link
                                                    key={product.id}
                                                    href={`/san-pham/${product.category}/${product.slug}`}
                                                    className="relative aspect-square rounded-lg overflow-hidden group/img"
                                                >
                                                    <Image
                                                        src={product.thumbnail}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover group-hover/img:scale-110 transition-transform"
                                                        sizes="(max-width: 768px) 33vw, 10vw"
                                                    />
                                                </Link>
                                            ))}
                                        </div>

                                        {/* CTA Button */}
                                        <Link
                                            href={`/dip-dac-biet/${occasion.slug}`}
                                            className={`block w-full py-3 text-center rounded-xl font-semibold transition-all bg-gradient-to-r ${occasion.color} text-white hover:shadow-lg`}
                                        >
                                            Xem Tất Cả
                                        </Link>
                                    </div>
                                )}

                                {/* No products */}
                                {products.length === 0 && (
                                    <div className="p-6 text-center text-slate-500 text-sm">
                                        Đang cập nhật sản phẩm...
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Popular Products Section */}
                <div className="mt-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-800 mb-3">
                            Sản Phẩm Phổ Biến Cho Các Dịp
                        </h2>
                        <p className="text-slate-600">
                            Những mẫu hoa được mua nhiều nhất cho các dịp đặc biệt
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {productsData.products
                            .filter(p => p.occasions.length > 0)
                            .sort((a, b) => b.reviewCount - a.reviewCount)
                            .slice(0, 4)
                            .map((product) => (
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

                                        {/* Occasions */}
                                        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                                            {product.occasions.slice(0, 2).map(occId => {
                                                const occ = OCCASIONS.find(o => o.id === occId)
                                                return occ ? (
                                                    <span key={occId} className="text-xl" title={occ.name}>
                                                        {occ.emoji}
                                                    </span>
                                                ) : null
                                            })}
                                        </div>

                                        {product.discount && (
                                            <span className="absolute top-3 right-3 bg-pink-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                                                -{product.discount}%
                                            </span>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-4">
                                        <span className="text-xs text-pink-600 font-medium uppercase">
                                            {product.specifications.type}
                                        </span>
                                        <h3 className="font-semibold text-slate-800 mt-1 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
                                            {product.name}
                                        </h3>

                                        <div className="flex items-baseline gap-2 mb-2">
                                            <span className="text-xl font-bold text-pink-600">
                                                {product.price.toLocaleString('vi-VN')}đ
                                            </span>
                                            {product.originalPrice && (
                                                <span className="text-sm text-slate-400 line-through">
                                                    {product.originalPrice.toLocaleString('vi-VN')}đ
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-1 pt-2 border-t border-slate-100">
                                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm font-medium">{product.rating}</span>
                                            <span className="text-xs text-slate-500">({product.reviewCount})</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>

            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Cần Tư Vấn Cho Dịp Đặc Biệt?
                    </h2>
                    <p className="text-lg text-pink-100 mb-8 max-w-2xl mx-auto">
                        Đội ngũ florist chuyên nghiệp sẽ giúp bạn chọn hoa phù hợp nhất cho từng dịp
                    </p>
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                        <Link
                            href="/lien-he"
                            className="px-8 py-4 bg-white text-pink-600 rounded-full font-bold hover:bg-pink-50 transition-colors shadow-lg"
                        >
                            Tư Vấn Miễn Phí
                        </Link>
                        <a
                            href="tel:0353894802"
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
