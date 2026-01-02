import { getProducts, getAllTags } from '@/actions/products'
import ProductCard from '@/components/ProductCard'
import TagFilter from '@/components/TagFilter'
import { ImageIcon } from 'lucide-react'
import Link from 'next/link'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>
}) {
  const params = await searchParams
  const tagFilter = params.tag
  
  const [products, allTags] = await Promise.all([
    getProducts(tagFilter),
    getAllTags()
  ])

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                <ImageIcon size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Thư viện ảnh</h1>
                <p className="text-gray-600 text-sm">Quản lý mẫu hoa đã đăng</p>
              </div>
            </div>
            
            <Link
              href="/upload"
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-medium hover:from-pink-600 hover:to-rose-600 transition shadow-lg"
            >
              + Đăng mới
            </Link>
          </div>
        </div>

        {/* Tag Filter */}
        {allTags.length > 0 && (
          <TagFilter tags={allTags} currentTag={tagFilter} />
        )}

        {/* Stats */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-100">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">{products.length}</div>
            <div className="text-sm text-gray-600">
              {tagFilter ? `Sản phẩm có tag "${tagFilter}"` : 'Tổng số sản phẩm'}
            </div>
          </div>
        </div>

        {/* Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
            <ImageIcon size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Chưa có sản phẩm nào
            </h3>
            <p className="text-gray-600 mb-4">
              {tagFilter 
                ? `Không tìm thấy sản phẩm với tag "${tagFilter}"`
                : 'Bắt đầu bằng cách đăng mẫu hoa đầu tiên'}
            </p>
            <Link
              href="/upload"
              className="inline-block px-6 py-3 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition"
            >
              Đăng ảnh mới
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
