import Link from "next/link";
import { prisma } from "@/lib/prisma"; // Gọi database

// Server Component: Lấy dữ liệu trực tiếp từ DB
export default async function HomePage() {
  // Lấy 8 ảnh mới nhất từ Database để hiển thị
  // (Nếu chưa có DB thì mảng này sẽ rỗng, không sao cả)
  const products = await prisma.product.findMany({
    take: 8,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="pb-20">
      {/* 1. HERO SECTION: Lời chào ấn tượng */}
      <section className="relative h-[80vh] w-full bg-gray-100 flex items-center justify-center overflow-hidden">
        {/* Giả lập ảnh nền (Sau này bạn thay bằng ảnh thật) */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-white opacity-50 z-0"></div>
        
        <div className="text-center z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 tracking-tight">
            Gói trọn <span className="text-pink-600 italic">cảm xúc</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto">
            Không chỉ là hoa, chúng tôi thiết kế những câu chuyện dành riêng cho người thương của bạn.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/consult" 
              className="bg-black text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition transform"
            >
              Tư vấn ngay
            </Link>
            <Link 
              href="/gallery" 
              className="bg-white text-black border border-black px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition"
            >
              Xem mẫu hoa
            </Link>
          </div>
        </div>
      </section>

      {/* 2. GALLERY PREVIEW: Ảnh mới nhất */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Tác phẩm mới nhất</h2>
            <p className="text-gray-500">Được thiết kế thủ công hôm nay</p>
          </div>
          <Link href="/gallery" className="text-pink-600 font-medium hover:underline">
            Xem tất cả &rarr;
          </Link>
        </div>

        {/* Lưới ảnh (Grid) */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((product: any) => (
              <div key={product.id} className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
                <img 
                  src={product.imageUrl} 
                  alt={product.title || "Hoa thiết kế"} 
                  className="object-cover w-full h-full group-hover:scale-110 transition duration-500"
                />
              </div>
            ))}
          </div>
        ) : (
          // Hiển thị khi chưa có dữ liệu
          <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed">
            <p className="text-gray-400">Chưa có sản phẩm nào được đăng.</p>
            <p className="text-sm text-gray-400">Hãy vào trang Admin để upload ảnh đầu tiên.</p>
          </div>
        )}
      </section>
    </div>
  );
}