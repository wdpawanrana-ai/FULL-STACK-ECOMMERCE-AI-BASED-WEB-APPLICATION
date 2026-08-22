"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../Products/ProductCard";

/**
 * ProductSlider Carousel section.
 * Shows horizontal scroll grids of selected bikes/parts.
 */
const ProductSlider = ({ title, products = [] }) => {
  const scrollRef = useRef(null);

  // Handles smooth horizontal scroll triggers
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 overflow-hidden">

      {/* Product Slider Header Details */}
      <div className="flex items-center justify-between mb-12">
        <div className="space-y-1">
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight">
            {title}
          </h2>
          <div className="h-1.5 w-20 bg-primary rounded-full" />
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => scroll("left")}
            className="p-4 rounded-2xl bg-secondary/50 border border-border/50 text-foreground/45 hover:text-primary hover:border-primary transition-all active:scale-95 duration-200"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-4 rounded-2xl bg-secondary/50 border border-border/50 text-foreground/45 hover:text-primary hover:border-primary transition-all active:scale-95 duration-200"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Grid Container */}
      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto no-scrollbar scroll-smooth pb-12 px-2"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[280px] md:min-w-[340px] max-w-[340px] scroll-snap-align-start flex flex-col"
          >
            {/* Reuses the exact, highly-polished ProductCard configuration */}
            <ProductCard product={product} />
          </div>
        ))}

        {/* Fallback state when items fail to load or are empty */}
        {products.length === 0 && (
          <div className="w-full py-20 text-center border-2 border-dashed border-border rounded-[2.5rem]">
            <p className="text-foreground/30 font-bold uppercase tracking-widest">No products available in this section</p>
          </div>
        )}
      </div>

    </section>
  );
};

export default ProductSlider;
