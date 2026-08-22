"use client";

import React from "react";
import { Star, ArrowRight, Quote } from "lucide-react";
import Link from "next/link";

/**
 * Testimonials Component
 * Renders the customer testimonials grid section with verified buyer status cards.
 */
const Testimonials = () => {
    const reviews = [
        {
            id: 1,
            name: "Amit Verma",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
            comment: "Best electric scooter and excellent service! Very low maintenance and great performance."
        },
        {
            id: 2,
            name: "Neha Sharma",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
            comment: "Amazing experience with Economics. Their service team is very professional and supportive."
        },
        {
            id: 3,
            name: "Rohit Singh",
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80",
            comment: "Quality spare parts and timely delivery. Highly recommended!"
        }
    ];

    return (
        <section id="reviews" className="py-20 select-none">

            {/* Testimonials Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div className="space-y-2">
                    <span className="text-primary font-black uppercase tracking-[0.25em] text-xs">
                        Customer Reviews
                    </span>
                    <h2 className="text-2xl md:text-4.5xl font-black text-foreground tracking-tight">
                        What Our Customers Say
                    </h2>
                </div>

                <Link
                    href="/contact?subject=Customer+Review"
                    className="flex items-center gap-1.5 text-primary hover:opacity-80 font-bold text-xs uppercase tracking-widest transition-colors group flex-shrink-0"
                >
                    <span>View All Reviews</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* Grid of Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {reviews.map((rev) => (
                    <div
                        key={rev.id}
                        className="relative bg-secondary/30 dark:bg-white/[0.02] rounded-3xl border border-border p-8 flex flex-col justify-between hover:border-primary/30 hover:bg-secondary/50 dark:hover:bg-white/[0.04] transition-all duration-300"
                    >
                        {/* Top quote icon watermark decoration */}
                        <div className="absolute top-6 right-6 text-foreground/10 pointer-events-none">
                            <Quote size={28} className="rotate-180" />
                        </div>

                        <div>
                            {/* Star Rating list */}
                            <div className="flex items-center gap-1 mb-5">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={15} className="fill-amber-500 text-amber-500" />
                                ))}
                            </div>

                            {/* Verified Text Comment */}
                            <p className="text-sm text-foreground/70 leading-relaxed font-semibold mb-8">
                                {rev.comment}
                            </p>
                        </div>

                        {/* User Profile bar */}
                        <div className="flex items-center gap-3.5 pt-4 border-t border-border/50">
                            <img
                                src={rev.avatar}
                                alt={rev.name}
                                className="w-10 h-10 rounded-full object-cover border border-border"
                            />
                            <div className="flex flex-col">
                                <span className="text-sm font-black text-foreground">{rev.name}</span>
                                <span className="text-[10px] font-bold text-foreground/50 uppercase tracking-wider flex items-center gap-1 mt-0.5">
                                    Verified Buyer
                                    <span className="text-emerald-500 font-bold">✓</span>
                                </span>
                            </div>
                        </div>

                    </div>
                ))}
            </div>

        </section>
    );
};

export default Testimonials;
