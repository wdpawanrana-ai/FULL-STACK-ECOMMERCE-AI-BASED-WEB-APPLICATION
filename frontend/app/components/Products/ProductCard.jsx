import React from "react";
import { Star, ShoppingCart, Info, RotateCw } from "lucide-react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/store/slices/cartSlice";

/**
 * ProductCard Components
 * Renders high-end vehicle grid items with price tags, EV range/top speed metrics, and CTA triggers.
 */
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ product, quantity: 1 }));
  };

  const hasImage = product.images?.[0]?.url || product.image;
  const imageUrl = product.images?.[0]?.url || product.image;
  const isOutOfStock = product.stock <= 0;

  // Smart Scooter specification mapping helper
  const getSpecs = (name, categoryName) => {
    const isScooter = categoryName?.toLowerCase().includes("scooter") || false;
    if (!isScooter) {
      return { key1: "Genuine", value1: "Spare", key2: "OEM", value2: "Certified" };
    }
    const lowercaseName = name.toLowerCase();
    if (lowercaseName.includes("pro")) {
      return { key1: "140 KM", value1: "Range", key2: "70 KM/H", value2: "Top Speed" };
    } else if (lowercaseName.includes("lite")) {
      return { key1: "90 KM", value1: "Range", key2: "45 KM/H", value2: "Top Speed" };
    } else if (lowercaseName.includes("plus")) {
      return { key1: "150 KM", value1: "Range", key2: "75 KM/H", value2: "Top Speed" };
    } else {
      return { key1: "120 KM", value1: "Range", key2: "60 KM/H", value2: "Top Speed" };
    }
  };

  const specs = getSpecs(product.name, product.category);
  const isScooter = product.category?.toLowerCase().includes("scooter");

  return (
    <div className="group relative bg-white rounded-[2rem] border border-slate-100 hover:border-primary/40 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.05)] flex flex-col h-full select-none">

      {/* 360 View overlay badge (Scooters only) */}
      {isScooter && (
        <div className="absolute top-4 right-4 z-20 flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 bg-white/70 text-slate-600 backdrop-blur-sm pr-0.5" title="Interactive 360 View Available">
          <span className="text-[9px] font-black tracking-tighter">360°</span>
        </div>
      )}

      {/* Image container frame */}
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-50 flex items-center justify-center p-6">

        {hasImage ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="max-h-full max-w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="text-slate-300 flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">No Image</span>
          </div>
        )}

        {/* Small transparent stock notification indicator */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10">
            <span className="px-4 py-1.5 rounded-full bg-rose-50 border border-rose-100 text-[10px] font-extrabold text-rose-500 uppercase tracking-widest">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Info Details Section */}
      <div className="p-6 flex flex-col justify-between flex-grow">

        <div className="text-center mb-4">
          {/* Title */}
          <h3 className="text-lg font-black text-slate-800 tracking-tight group-hover:text-primary transition-colors line-clamp-1 mb-3">
            {product.name}
          </h3>

          {/* Specs Hud labels row */}
          <div className="flex items-center justify-center gap-6 py-2 px-3 bg-slate-50 rounded-xl max-w-[240px] mx-auto text-center border border-slate-100/50">
            <div className="flex flex-col">
              <span className="text-xs font-black text-slate-700 leading-none">{specs.key1}</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{specs.value1}</span>
            </div>
            <div className="w-px h-6 bg-slate-200"></div>
            <div className="flex flex-col">
              <span className="text-xs font-black text-slate-700 leading-none">{specs.key2}</span>
              <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase mt-0.5">{specs.value2}</span>
            </div>
          </div>
        </div>

        {/* Price and CTA bottom controls row */}
        <div className="mt-auto pt-2 flex items-center justify-between border-t border-slate-50 gap-3">

          {/* Price */}
          <div className="flex flex-col">
            <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Ex-Showroom</span>
            <span className="text-base font-black text-slate-800">
              ₹ {product.price?.toLocaleString()}
            </span>
          </div>

          {/* Details CTA and Cart hover action */}
          <div className="flex items-center gap-1.5">
            {/* Quick Add To Cart Button */}
            {!isOutOfStock && (
              <button
                onClick={(e) => handleAddToCart(e, product)}
                className="p-2.5 bg-slate-100 hover:bg-primary/20 text-slate-600 hover:text-primary rounded-xl transition-all duration-300"
                title="Quick Add To Cart"
              >
                <ShoppingCart size={15} />
              </button>
            )}

            <Link
              href={`/product/${product.id}`}
              className="px-4 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-sm hover:shadow-md hover:shadow-primary/20 transition-all duration-300"
            >
              View Details
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductCard;
