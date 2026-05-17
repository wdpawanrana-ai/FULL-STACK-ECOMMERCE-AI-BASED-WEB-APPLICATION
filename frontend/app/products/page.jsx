"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllProducts } from '../store/slices/productSlice';
import ProductCard from '../components/Products/ProductCard';
import Pagination from '../components/Products/Pagination';
import { useSearchParams } from 'next/navigation';
import { Filter, X, Search, Star, Box, Loader2, Sparkles } from 'lucide-react';
import { toggleAIModal } from '../store/slices/popupSlice';

const CATEGORIES = [
    "Electric Scooters",
    "Lithium Batteries",
    "Motor & Controllers",
    "Tires & Rims",
    "Braking Systems",
    "Charging Solutions",
    "Lights & Signals",
    "Accessories"
];

function ProductsContent() {
    const { products, totalProducts, loading, error } = useSelector(state => state.product);
    const dispatch = useDispatch();
    const searchParams = useSearchParams();

    const searchCategory = searchParams.get("category") || "";
    const searchTerm = searchParams.get("search") || "";

    const [searchQuery, setSearchQuery] = useState(searchTerm);
    const [selectedCategory, setSelectedCategory] = useState(searchCategory);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [selectedRating, setSelectedRating] = useState(0);
    const [availability, setAvailability] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    useEffect(() => {
        const fetchTimer = setTimeout(() => {
            dispatch(fetchAllProducts({
                category: selectedCategory === "All" ? "" : selectedCategory,
                search: searchQuery,
                price: `${minPrice || 0}-${maxPrice || 1000000}`,
                ratings: selectedRating,
                availability: availability,
                page: currentPage,
            }));
        }, 400); // 400ms debounce
        return () => clearTimeout(fetchTimer);
    }, [dispatch, selectedCategory, searchQuery, minPrice, maxPrice, selectedRating, availability, currentPage]);

    const totalPages = Math.ceil((totalProducts || 1) / 10);

    return (
        <div className="min-h-screen pt-32 pb-24 bg-background selection:bg-primary/30">
            <div className="max-w-[1440px] mx-auto px-4 md:px-8">

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-1.5 w-8 bg-primary rounded-full" />
                            <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs">Explore Inventory</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-foreground">
                            Our Products
                        </h1>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* Mobile Filter Toggle */}
                    <button
                        onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                        className="lg:hidden w-full p-4 rounded-2xl bg-secondary/30 border border-border/50 text-foreground font-bold flex items-center justify-center gap-3 active:scale-95 transition-transform"
                    >
                        <Filter size={20} />
                        {isMobileFilterOpen ? "Hide Filters" : "Show Filters"}
                    </button>

                    {/* Sidebar Filters */}
                    <aside className={`w-full lg:w-80 flex-shrink-0 ${isMobileFilterOpen ? "block" : "hidden"} lg:block sticky top-32 z-20`}>
                        <div className="bg-secondary/10 border border-border/40 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-xl space-y-10">

                            {/* Search */}
                            <div>
                                <h3 className="text-xs font-bold text-foreground/40 uppercase tracking-[0.2em] mb-4">Search</h3>
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3.5 bg-background border border-border/50 rounded-2xl text-sm font-medium text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-foreground/30"
                                    />
                                </div>
                                <button
                                    onClick={() => dispatch(toggleAIModal())}
                                    className="w-full mt-4 py-3.5 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 font-bold flex items-center justify-center gap-2 hover:from-purple-500/20 hover:to-blue-500/20 transition-all shadow-lg shadow-purple-500/5 active:scale-95"
                                >
                                    <Sparkles size={18} className="animate-pulse" />
                                    AI Smart Search
                                </button>
                            </div>

                            {/* Categories */}
                            <div>
                                <h3 className="text-xs font-bold text-foreground/40 uppercase tracking-[0.2em] mb-4">Categories</h3>
                                <div className="flex flex-col gap-2">
                                    {["All", ...CATEGORIES].map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => { setSelectedCategory(cat); setCurrentPage(1); setIsMobileFilterOpen(false); }}
                                            className={`text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${selectedCategory === cat || (cat === "All" && !selectedCategory) ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-foreground/60 hover:bg-secondary/50 hover:text-foreground"}`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price */}
                            <div>
                                <h3 className="text-xs font-bold text-foreground/40 uppercase tracking-[0.2em] mb-4">Price Range (₹)</h3>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                        className="w-full px-4 py-3 bg-background border border-border/50 rounded-xl text-sm font-medium focus:outline-none focus:border-primary/50 transition-all text-foreground"
                                    />
                                    <span className="text-foreground/30 font-bold">-</span>
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        className="w-full px-4 py-3 bg-background border border-border/50 rounded-xl text-sm font-medium focus:outline-none focus:border-primary/50 transition-all text-foreground"
                                    />
                                </div>
                            </div>

                            {/* Availability */}
                            <div>
                                <h3 className="text-xs font-bold text-foreground/40 uppercase tracking-[0.2em] mb-4">Availability</h3>
                                <div className="flex flex-col gap-2">
                                    {[
                                        { label: "Any", value: "" },
                                        { label: "In Stock", value: "in-stock" },
                                        { label: "Out of Stock", value: "out-of-stock" }
                                    ].map((opt) => (
                                        <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center justify-center">
                                                <input
                                                    type="radio"
                                                    name="availability"
                                                    checked={availability === opt.value}
                                                    onChange={() => { setAvailability(opt.value); setCurrentPage(1); }}
                                                    className="w-5 h-5 appearance-none border-2 border-border/50 rounded-full checked:border-primary transition-colors cursor-pointer"
                                                />
                                                {availability === opt.value && <div className="absolute w-2.5 h-2.5 bg-primary rounded-full transition-transform" />}
                                            </div>
                                            <span className={`text-sm font-bold transition-colors ${availability === opt.value ? 'text-foreground' : 'text-foreground/50 group-hover:text-foreground'}`}>{opt.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Rating */}
                            <div>
                                <h3 className="text-xs font-bold text-foreground/40 uppercase tracking-[0.2em] mb-4">Minimum Rating</h3>
                                <div className="flex items-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => { setSelectedRating(star === selectedRating ? 0 : star); setCurrentPage(1); }}
                                            className={`p-2 rounded-xl border transition-all ${selectedRating >= star ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-background border-border/50 text-foreground/20 hover:text-foreground/40 hover:border-primary'}`}
                                        >
                                            <Star size={16} className={selectedRating >= star ? "fill-primary" : ""} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </aside>

                    {/* Main Content Grid */}
                    <main className="flex-1 w-full min-w-0">
                        {/* Loading State */}
                        {loading ? (
                            <div className="w-full h-[60vh] flex flex-col justify-center items-center gap-4 border border-dashed border-border/50 rounded-[2.5rem]">
                                <Loader2 className="w-10 h-10 animate-spin text-primary" />
                                <p className="text-sm font-bold text-foreground/40 tracking-widest uppercase">Fetching Inventory...</p>
                            </div>
                        ) : error ? (
                            <div className="w-full h-[60vh] flex flex-col justify-center items-center gap-4 border border-dashed border-red-500/30 bg-red-500/5 rounded-[2.5rem]">
                                <X className="w-10 h-10 text-red-500" />
                                <p className="text-sm font-bold text-red-500/80 tracking-widest uppercase">Failed to load products</p>
                            </div>
                        ) : products && products.length > 0 ? (
                            <div className="flex flex-col gap-16">
                                {/* The Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
                                    {products.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>

                                {/* Dynamic Pagination */}
                                {totalPages > 1 && (
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={(p) => { setCurrentPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                    />
                                )}
                            </div>
                        ) : (
                            <div className="w-full h-[60vh] flex flex-col justify-center items-center gap-4 border border-dashed border-border/50 rounded-[2.5rem]">
                                <Box className="w-12 h-12 text-foreground/20" />
                                <p className="text-sm font-bold text-foreground/40 tracking-widest uppercase">No products match your criteria</p>
                                <button
                                    onClick={() => {
                                        setSearchQuery("");
                                        setSelectedCategory("");
                                        setMinPrice("");
                                        setMaxPrice("");
                                        setSelectedRating(0);
                                        setAvailability("");
                                    }}
                                    className="mt-6 px-6 py-3 rounded-full bg-secondary/50 text-foreground font-bold text-sm tracking-wide hover:bg-secondary hover:text-primary transition-all active:scale-95"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </main>

                </div>
            </div>
        </div>
    )
}

export default function ProductsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="animate-spin w-10 h-10 text-primary" />
            </div>
        }>
            <ProductsContent />
        </Suspense>
    )
}