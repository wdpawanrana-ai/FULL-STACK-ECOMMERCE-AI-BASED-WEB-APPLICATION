"use client"

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Zap } from "lucide-react";

import Link from "next/link";
import { addToCart } from "../../store/slices/cartSlice";
import { useDispatch } from "react-redux";

const ProductSlider = ({ title, products = [] }) => {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ product, quantity: 1 }));
  };

  return (
    <section className="py-24 overflow-hidden">
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
            className="p-4 rounded-2xl bg-secondary/50 border border-border/50 text-foreground/40 hover:text-primary hover:border-primary transition-all active:scale-90"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-4 rounded-2xl bg-secondary/50 border border-border/50 text-foreground/40 hover:text-primary hover:border-primary transition-all active:scale-90"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto no-scrollbar scroll-smooth pb-12 px-2"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative min-w-[300px] md:min-w-[380px] scroll-snap-align-start"
          >
            <Link href={`/product/${product.id}`}>
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-secondary/30 border border-border/50 group-hover:border-primary/30 transition-all duration-500 shadow-lg group-hover:shadow-2xl group-hover:shadow-primary/10">
                {/* Product Image */}
                {product.images?.[0]?.url || product.image ? (
                  <img
                    src={product.images?.[0]?.url || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-secondary/20 text-foreground/20 transition-transform duration-700 group-hover:scale-110 group-hover:text-primary/40">
                    <Zap size={48} className="mb-2 opacity-50" />
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase">No Image</span>
                  </div>
                )}

                {/* Glassmorphic Price Tag */}
                <div className="absolute top-6 right-6 px-5 py-2.5 rounded-2xl bg-background/60 backdrop-blur-xl border border-white/20 dark:border-white/10 text-lg font-black text-foreground shadow-xl">
                  ₹{product.price?.toLocaleString()}
                </div>

                {/* Labels/Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-2 items-start">
                  {product.isNew && (
                    <div className="px-4 py-1.5 rounded-full bg-primary text-[10px] font-black text-white uppercase tracking-[0.2em] shadow-lg shadow-primary/40">
                      New Arrival
                    </div>
                  )}
                  <div className={`px-3 py-1.5 rounded-full backdrop-blur-md border ${product.stock > 0 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400'} text-[10px] font-black uppercase tracking-[0.2em] shadow-lg flex items-center gap-1.5`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${product.stock > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </div>
                </div>

                {/* Bottom Content Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className={i < 4 ? "fill-primary text-primary" : "text-foreground/20"} />
                    ))}
                    <span className="text-[10px] font-bold text-foreground/40 ml-2 uppercase tracking-widest">(128 Reviews)</span>
                  </div>

                  <h3 className="text-2xl font-black text-foreground mb-6 line-clamp-1">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      disabled={product.stock <= 0}
                      className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold text-sm tracking-wide shadow-xl shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:bg-secondary disabled:text-foreground/40 disabled:shadow-none disabled:active:scale-100 disabled:cursor-not-allowed"
                    >
                      <ShoppingCart size={18} />
                      {product.stock > 0 ? 'Add to Cart' : 'Sold Out'}
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
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
