"use client";

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails } from '../../store/slices/productSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { useParams } from 'next/navigation';
import { Loader2, Minus, Plus, ShoppingCart, Zap, Star, ShieldCheck, Truck } from 'lucide-react';
import ReviewsContainer from '../../components/Products/ReviewsContainer';

export default function ProductDetailsPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { productDetails, loading, productReviews } = useSelector(state => state.product);

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductDetails(id));
        }
    }, [dispatch, id]);

    if (loading) {
        return (
            <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-background">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-foreground/40">Loading Product...</p>
            </div>
        );
    }

    if (!productDetails || !productDetails.id) {
        return (
            <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-background">
                <Zap className="w-12 h-12 text-foreground/20 mb-4" />
                <h2 className="text-2xl font-black text-foreground">Product Not Found</h2>
                <p className="mt-2 text-foreground/50">This item might have been removed or doesn't exist.</p>
            </div>
        );
    }

    const { name, description, price, stock, category, images, ratings } = productDetails;
    const isOutOfStock = stock <= 0;

    const handleAddToCart = () => {
        dispatch(addToCart({ product: productDetails, quantity }));
    };

    return (
        <div className="min-h-screen pt-32 pb-24 bg-background">
            <div className="max-w-[1200px] mx-auto px-4 md:px-8">

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-20">

                    {/* Left: Image Gallery */}
                    <div className="w-full lg:w-1/2">
                        <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-secondary/30 border border-border/50 shadow-2xl flex items-center justify-center group">
                            {images?.[0]?.url || productDetails.image ? (
                                <img
                                    src={images?.[0]?.url || productDetails.image}
                                    alt={name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            ) : (
                                <div className="flex flex-col items-center text-foreground/20">
                                    <Zap size={64} className="mb-4 opacity-50" />
                                    <span className="text-xs font-black tracking-[0.2em] uppercase">No Image available</span>
                                </div>
                            )}

                            {/* Badges overlay */}
                            <div className="absolute top-8 left-8 flex flex-col gap-3 items-start">
                                <div className={`px-4 py-2 rounded-full backdrop-blur-md border ${!isOutOfStock ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400'} text-xs font-black uppercase tracking-[0.2em] shadow-lg flex items-center gap-2`}>
                                    <div className={`w-2 h-2 rounded-full ${!isOutOfStock ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                                    {!isOutOfStock ? 'In Stock' : 'Out of Stock'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                        <div className="mb-2">
                            <span className="text-primary font-bold text-xs uppercase tracking-[0.2em] bg-primary/10 px-3 py-1 rounded-full">
                                {category}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black text-foreground mt-4 mb-4 leading-tight">
                            {name}
                        </h1>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} className={i < Math.floor(ratings || 0) ? "fill-primary text-primary" : "text-foreground/20 fill-foreground/10"} />
                                ))}
                            </div>
                            <span className="text-sm font-bold text-foreground/40">{productReviews?.length || 0} Reviews</span>
                        </div>

                        <div className="text-4xl font-black text-foreground mb-8">
                            ₹{price?.toLocaleString() || "0.00"}
                        </div>

                        <p className="text-lg text-foreground/60 leading-relaxed mb-10">
                            {description}
                        </p>

                        {/* Add to Cart Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 bg-secondary/10 p-4 rounded-3xl border border-border/50 backdrop-blur-md mb-8 shadow-inner shadow-background">

                            {/* Quantity Selector */}
                            <div className="flex items-center justify-between sm:justify-center bg-background border border-border/50 rounded-2xl px-2 py-2 w-full sm:w-auto shadow-lg shadow-black/5">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1 || isOutOfStock}
                                    className="p-3 text-foreground/60 hover:text-primary transition-colors disabled:opacity-30 disabled:hover:text-foreground/60 rounded-xl active:scale-95 disabled:active:scale-100"
                                >
                                    <Minus size={18} />
                                </button>
                                <span className="w-12 text-center text-lg font-bold text-foreground">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                                    disabled={quantity >= stock || isOutOfStock}
                                    className="p-3 text-foreground/60 hover:text-primary transition-colors disabled:opacity-30 disabled:hover:text-foreground/60 rounded-xl active:scale-95 disabled:active:scale-100"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>

                            {/* Add Button */}
                            <button
                                onClick={handleAddToCart}
                                disabled={isOutOfStock}
                                className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold text-lg tracking-wide shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3 disabled:bg-secondary disabled:text-foreground/40 disabled:shadow-none disabled:transform-none disabled:cursor-not-allowed"
                            >
                                <ShoppingCart size={20} />
                                {!isOutOfStock ? 'Add to Cart' : 'Sold Out'}
                            </button>
                        </div>

                        {/* Trust Indicators */}
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="flex items-center gap-3 text-foreground/60 p-4 border border-border/30 rounded-2xl bg-secondary/5">
                                <div className="p-2 rounded-full bg-secondary text-foreground">
                                    <ShieldCheck size={18} />
                                </div>
                                <span className="text-sm font-bold tracking-wide">1 Year Warranty</span>
                            </div>
                            <div className="flex items-center gap-3 text-foreground/60 p-4 border border-border/30 rounded-2xl bg-secondary/5">
                                <div className="p-2 rounded-full bg-secondary text-foreground">
                                    <Truck size={18} />
                                </div>
                                <span className="text-sm font-bold tracking-wide">Fast Delivery</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Reviews Section */}
                <div className="pt-16 border-t border-border/50">
                    <ReviewsContainer product={productDetails} productReviews={productReviews} />
                </div>

            </div>
        </div>
    );
}
