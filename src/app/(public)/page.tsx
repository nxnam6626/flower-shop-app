import { Metadata } from 'next'

import HeroSection from "@/components/public/home/HeroSection";
import BestSellers from "@/components/public/home/BestSellers";
import BouquetShowcase from "@/components/public/home/BouquetShowcase";
import FlowerBasketShowcase from "@/components/public/home/FlowerBasketShowcase";
import FlowerBoxShowcase from "@/components/public/home/FlowerBoxShowcase";
import FlowerStandShowcase from "@/components/public/home/FlowerStandShowcase";
import FeedbackChatStyles from '@/components/public/home/FeedbackChatStyle';
import FeedbackChatStyle from '@/components/public/home/FeedbackChatStyle';


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

        {/* Flower Box Section */}
        <section id="boxes" aria-labelledby="boxes-heading">
          <FlowerBoxShowcase />

        </section>

        {/* Flower Stand Section */}
        <section id="stands" aria-labelledby="stands-heading">
          <FlowerStandShowcase />
        </section>

        <section id="feedback" aria-labelledby="feedback-heading">
          <FeedbackChatStyle />
        </section>
      </div>
    </>
  );
}