"use client";
import { useState, useEffect } from "react";
import { X, Search, Zap, TrendingUp, History } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toggleSearchBar } from "@/app/store/slices/popupSlice";

const SearchOverlay = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const { isSearchBarOpen } = useSelector((state) => state.popup);
  const router = useRouter();

  useEffect(() => {
    if (isSearchBarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSearchBarOpen]);

  if (!isSearchBarOpen) return null;

  const handleSearch = (q = searchQuery) => {
    if (q.trim() !== "") {
      dispatch(toggleSearchBar());
      router.push(`/products?search=${encodeURIComponent(q)}`);
    }
  };

  const popularSearches = [
    "Scooter Battery",
    "Electric Motor",
    "Brake Pads",
    "Charger 60V",
    "Tubeless Tires"
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[10vh] px-4">
      {/* Immersive Background */}
      <div
        className="absolute inset-0 bg-background/40 backdrop-blur-3xl transition-all duration-700 animate-fade-in"
        onClick={() => dispatch(toggleSearchBar())}
      />

      <div className="relative z-10 w-full max-w-3xl animate-slide-in-bottom">
        {/* Search Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-primary/20 text-primary">
              <Zap size={24} className="fill-current" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-foreground tracking-tight">Search Showroom</h2>
              <p className="text-sm text-foreground/40 font-medium">Find spare parts and scooters instantly</p>
            </div>
          </div>
          <button
            onClick={() => dispatch(toggleSearchBar())}
            className="p-4 rounded-full bg-secondary/50 text-foreground/40 hover:text-foreground hover:bg-secondary transition-all active:scale-95 shadow-xl"
          >
            <X size={24} />
          </button>
        </div>

        {/* Input Field */}
        <div className="group relative mb-12">
          <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-foreground/20 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="What are you looking for?"
            className="w-full pl-20 pr-10 py-8 text-2xl font-bold bg-background/50 border-2 border-border/50 rounded-[2.5rem] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-2xl placeholder:text-foreground/10"
          />
          <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <span className="text-[10px] font-black text-foreground/20 border border-border px-2 py-1 rounded">ENTER</span>
          </div>
        </div>

        {/* Popular Searches */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-foreground/40 px-4">
            <TrendingUp size={16} />
            <span className="text-xs font-black uppercase tracking-[0.2em]">Popular Requests</span>
          </div>

          <div className="flex flex-wrap gap-3 px-2">
            {popularSearches.map((tag) => (
              <button
                key={tag}
                onClick={() => handleSearch(tag)}
                className="px-6 py-3 rounded-2xl bg-secondary/50 border border-border/50 text-sm font-bold text-foreground/60 hover:bg-primary hover:text-white hover:border-primary hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Footer Text */}
        <div className="mt-20 text-center">
          <p className="text-xs font-bold text-foreground/20 uppercase tracking-[0.4em]">
            PoojaEV Precision Parts Search
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;

