"use client";

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartQuantity } from '../store/slices/cartSlice';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingCart, Zap, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

export default function CartPage() {
    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const updateQuantity = (id, quantity) => {
        if (quantity <= 0) {
            dispatch(removeFromCart({ id }));
        } else {
            dispatch(updateCartQuantity({ id, quantity }));
        }
    };

    let subtotal = 0;
    if (cart) {
        subtotal = cart.reduce((sum, item) => {
            if (!item?.product?.price) return sum;
            return sum + (item.product.price * item.quantity);
        }, 0);
    }

    // Free shipping threshold example (₹5000)
    const shipping = subtotal > 5000 ? 0 : (subtotal > 0 ? 499 : 0);
    const total = subtotal + shipping;

    if (!cart || cart.filter(item => item?.product?.id).length === 0) {
        return (
            <div className="min-h-screen pt-32 pb-24 bg-background flex flex-col items-center justify-center text-center px-4">
                <div className="w-24 h-24 bg-secondary/50 rounded-[2rem] flex items-center justify-center mb-8 border border-border/50 shadow-inner">
                    <ShoppingCart size={40} className="text-foreground/20" />
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">Your cart is empty</h2>
                <p className="text-lg text-foreground/50 max-w-md mx-auto mb-10 leading-relaxed">
                    Looks like you haven't added anything to your cart yet. Discover our top-tier electric vehicles and parts!
                </p>
                <Link href="/products">
                    <button className="px-10 py-4 bg-primary text-white rounded-2xl font-bold tracking-wide shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0 transition-all text-lg flex items-center gap-3">
                        Continue Shopping
                        <ArrowRight size={20} />
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-24 bg-background selection:bg-primary/30">
            <div className="max-w-[1200px] mx-auto px-4 md:px-8">

                <div className="mb-12">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="h-1.5 w-8 bg-primary rounded-full" />
                        <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs">Review Order</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
                        Shopping Cart
                    </h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-start">

                    {/* Left Col: Cart Items */}
                    <div className="flex-1 w-full space-y-6">
                        {cart.map((item) => {
                            if (!item?.product?.id) return null;

                            return (
                                <div key={item.product.id} className="group flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-secondary/10 border border-border/50 p-6 rounded-3xl transition-transform hover:-translate-y-1 shadow-lg shadow-black/5">
                                    {/* Image */}
                                    <Link href={`/product/${item.product.id}`} className="relative w-full sm:w-32 aspect-square rounded-2xl overflow-hidden bg-background border border-border/50 flex-shrink-0 flex items-center justify-center">
                                        {item.product.images?.[0]?.url || item.product.image ? (
                                            <img
                                                src={item.product.images?.[0]?.url || item.product.image}
                                                alt={item.product.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="text-foreground/20 group-hover:scale-110 transition-transform duration-500 flex flex-col items-center">
                                                <Zap size={24} className="opacity-50 mb-1" />
                                                <span className="text-[8px] font-black uppercase tracking-widest">No Image</span>
                                            </div>
                                        )}
                                    </Link>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0 w-full">
                                        <Link href={`/product/${item.product.id}`}>
                                            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                                {item.product.name}
                                            </h3>
                                        </Link>
                                        <p className="text-xs font-bold text-foreground/40 uppercase tracking-[0.2em] mb-4">
                                            {item.product.category || "Uncategorized"}
                                        </p>
                                        <div className="flex items-center gap-4 text-foreground/60 p-3 bg-background rounded-xl w-fit border border-border/50 shadow-inner">
                                            <span className="text-[10px] font-bold uppercase tracking-widest">Unit Price:</span>
                                            <span className="font-black text-foreground">₹{item.product.price?.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    {/* Controls */}
                                    <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-center w-full sm:w-auto gap-6 sm:gap-4 mt-2 sm:mt-0">
                                        <div className="flex items-center bg-background border border-border/50 rounded-xl px-2 py-1 shadow-sm">
                                            <button
                                                className="p-2 text-foreground/60 hover:text-primary transition-colors disabled:opacity-30 active:scale-90 disabled:active:scale-100 rounded-lg"
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={16} strokeWidth={3} />
                                            </button>
                                            <span className="w-12 text-center text-sm font-black text-foreground">{item.quantity}</span>
                                            <button
                                                className="p-2 text-foreground/60 hover:text-primary transition-colors disabled:opacity-30 active:scale-90 disabled:active:scale-100 rounded-lg"
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                disabled={item.quantity >= (item.product.stock || 99)}
                                            >
                                                <Plus size={16} strokeWidth={3} />
                                            </button>
                                        </div>

                                        <button
                                            className="flex items-center gap-2 p-2 text-red-500/60 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all font-bold text-xs uppercase tracking-widest active:scale-95"
                                            onClick={() => dispatch(removeFromCart({ id: item.product.id }))}
                                        >
                                            <Trash2 size={16} />
                                            <span className="sm:hidden">Remove Item</span>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Col: Summary */}
                    <div className="w-full lg:w-[400px] flex-shrink-0 sticky top-32">
                        <div className="bg-secondary/10 border border-border/50 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-xl">
                            <h3 className="text-xl font-black text-foreground mb-8 pb-6 border-b border-border/50">Order Summary</h3>

                            <div className="space-y-5 mb-8">
                                <div className="flex items-center justify-between text-foreground/60 font-medium">
                                    <span>Subtotal ({cart.filter(Boolean).length} item{cart.length > 1 ? 's' : ''})</span>
                                    <span className="font-bold text-foreground">₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between text-foreground/60 font-medium">
                                    <span>Estimated Shipping</span>
                                    {shipping === 0 ? (
                                        <span className="font-bold text-emerald-500 tracking-wide uppercase text-sm">Free</span>
                                    ) : (
                                        <span className="font-bold text-foreground">₹{shipping.toLocaleString()}</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-border/50 mb-8">
                                <span className="text-lg font-black text-foreground">Total</span>
                                <span className="text-3xl font-black text-primary">₹{total.toLocaleString()}</span>
                            </div>

                            <Link href="/payment">
                                <button className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg tracking-wide shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3">
                                    Proceed to Checkout
                                    <ArrowRight size={20} />
                                </button>
                            </Link>

                            {/* Trust Indicators */}
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <div className="flex flex-col items-center justify-center text-center gap-2 p-4 bg-background rounded-2xl border border-border/30">
                                    <ShieldCheck size={20} className="text-foreground/40" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Secure<br />Payment</span>
                                </div>
                                <div className="flex flex-col items-center justify-center text-center gap-2 p-4 bg-background rounded-2xl border border-border/30">
                                    <Truck size={20} className="text-foreground/40" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Fast<br />Delivery</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
