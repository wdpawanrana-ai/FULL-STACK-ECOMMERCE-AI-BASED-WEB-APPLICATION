"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HeroSlider from "./components/Home/HeroSlider";
import ProductSlider from "./components/Home/ProductSlider";
import FeatureSection from "./components/Home/FeatureSection";
import NewsletterSection from "./components/Home/NewsletterSection";
import CategoryGrid from "./components/Home/CategoryGrid";
import VideoShowcase from "./components/Home/VideoShowcase";
import Testimonials from "./components/Home/Testimonials";

/**
 * Home component serves as the landing page of PoojaEV.
 * Configures the Hero image slider, dynamic category selections, product grids,
 * feature listings, video reels, and localized customer experience testimonials.
 */
export default function Home() {
  // Redux Selectors retrieving products sorted by date (new) and rating (topRated) descriptors
  const { newProducts = [], topRatedProducts = [] } = useSelector((state) => state.product);


  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Full Width */}
      <div className="px-4 sm:px-6 lg:px-8 pt-4">
        <HeroSlider />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Categories */}
        <CategoryGrid />

        {/* Dynamic Product Sections */}
        {newProducts.length > 0 && (
          <ProductSlider title="New Arrivals" products={newProducts} />
        )}

        {/* Feature Highlights */}
        <FeatureSection />

        {/* Instagram/Video Feed */}
        <VideoShowcase />

        {topRatedProducts.length > 0 && (
          <ProductSlider
            title="Most Trusted Rides"
            products={topRatedProducts}
          />
        )}

        {/* Customer Reviews */}
        <Testimonials />

        {/* Newsletter */}
        <NewsletterSection />
      </div>
    </div>
  );
}


