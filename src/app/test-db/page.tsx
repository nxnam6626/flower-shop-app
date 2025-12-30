import { prisma } from "@/lib/prisma";

export default async function TestConnection() {
  try {
    // Lấy tất cả sản phẩm từ DB
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    return (
      <div className="p-10 max-w-6xl mx-auto">
        <h1 className="text-green-600 font-bold text-3xl mb-2">✅ Kết nối Neon DB thành công!</h1>
        <p className="text-gray-600 mb-6">Tổng số sản phẩm: <strong className="text-2xl text-blue-600">{products.length}</strong></p>
        
        {products.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-6 rounded-lg">
            <p className="font-bold">⚠️ Chưa có sản phẩm nào trong database</p>
            <p className="text-sm mt-2">Hãy dùng trang /test-neon để tạo sản phẩm test</p>
          </div>
        ) : (
          <div className="grid gap-4">
            <h2 className="text-xl font-bold mt-4 mb-2">📋 Danh sách sản phẩm:</h2>
            {products.map((product, index) => (
              <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  <img 
                    src={product.imageUrl} 
                    alt={product.title || 'Product'} 
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  
                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className="font-bold text-lg text-gray-800">
                        {index + 1}. {product.title || '(Không có tên)'}
                      </h3>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                        {product.isRealPhoto ? '📷 Ảnh thật' : '🎨 Ảnh mẫu'}
                      </span>
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-1">ID: <code className="bg-gray-100 px-1 rounded">{product.id}</code></p>
                    
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {product.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-200">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <p className="text-xs text-gray-400 mt-2">
                      🕐 Tạo lúc: {new Date(product.createdAt).toLocaleString('vi-VN')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    return (
      <div className="p-10 text-red-600">
        <h1 className="font-bold text-2xl">❌ Lỗi kết nối Database!</h1>
        <pre className="mt-4 bg-red-50 p-4 rounded text-sm border border-red-200 overflow-auto">
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    );
  }
}