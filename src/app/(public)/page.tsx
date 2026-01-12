import { Metadata } from 'next'
import BestSellers from "@/components/public/home/BestSellers";
import BouquetShowcase from "@/components/public/home/BouquetShowcase";
import FlowerBasketShowcase from "@/components/public/home/FlowerBasketShowcase";
import HeroSection from "@/components/public/home/HeroSection";

export const metadata: Metadata = {
  title: 'Pivoine Fleur - Cửa hàng hoa tươi cao cấp',
  description: 'Pivoine Fleur - Chuyên cung cấp hoa tươi cao cấp, bó hoa, giỏ hoa đẹp. Giao hàng nhanh, thiết kế độc đáo. 100% hoa tươi mới.',
  keywords: 'hoa tươi, cửa hàng hoa, bó hoa, giỏ hoa, hoa sinh nhật, hoa khai trương, Pivoine Fleur',
}

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section id="hero" aria-label="Hero banner">
        <HeroSection />
      </section>

      {/* Main Content Sections */}
      <div className="container mx-auto px-4 py-10 md:py-20 space-y-16">

        {/* Best Sellers Section */}
        <section id="bestsellers" aria-labelledby="bestsellers-heading">
          <BestSellers />
        </section>

        {/* Flower Baskets Section */}
        <section id="baskets" aria-labelledby="baskets-heading">
          <FlowerBasketShowcase />
        </section>

        {/* Bouquets Section */}
        <section id="bouquets" aria-labelledby="bouquets-heading">
          <BouquetShowcase />
        </section>

      </div>
    </>
  );
}