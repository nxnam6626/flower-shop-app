import { getProducts } from '@/actions/products'
import ProductCard from '@/components/public/ProductCard'
import { ImageIcon } from 'lucide-react'

// Public gallery page - SEO friendly
export const metadata = {
  title: 'Mẫu Hoa - Flower Shop',
  description: 'Xem bộ sưu tập hoa tươi đẹp của chúng tôi',
}

export const dynamic = 'force-dynamic'

export default async function PublicGalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>
}) {
  const params = await searchParams
  const tagFilter = params.tag
  
  const products = await getProducts(tagFilter)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                <ImageIcon size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Flower Shop</h1>
                <p className="text-sm text-gray-600">Hoa tươi mỗi ngày</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Bộ sưu tập hoa tươi
          </h2>
          <p className="text-gray-600">
            {products.length} mẫu hoa đẹp đang chờ bạn
          </p>
        </div>

        {/* Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <ImageIcon size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Chưa có sản phẩm nào
            </h3>
            <p className="text-gray-600">
              Vui lòng quay lại sau
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600 text-sm">
          <p>© 2025 Flower Shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
