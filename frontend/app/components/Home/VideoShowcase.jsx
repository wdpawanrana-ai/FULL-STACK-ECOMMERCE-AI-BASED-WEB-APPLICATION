"use client";

import React from "react";
import { Play, ArrowRight, Instagram } from "lucide-react";
import Link from "next/link";

/**
 * VideoShowcase Component
 * Displays the "#RideTheFuture" Instagram video grid with play overlay triggers.
 */
const VideoShowcase = () => {
    const reels = [
        {
            id: 1,
            thumbnail: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=400&q=80",
        },
        {
            id: 2,
            thumbnail: "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=400&q=80",
        },
        {
            id: 3,
            thumbnail: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400&q=80",
        },
        {
            id: 4,
            thumbnail: "https://images.unsplash.com/photo-1533256058098-9ed7f3c1acdd?w=400&q=80",
        },
        {
            id: 5,
            thumbnail: "https://images.unsplash.com/photo-1623067140924-ac5409a65ae5?w=400&q=80",
        },
        {
            id: 6,
            thumbnail: "https://images.unsplash.com/photo-1621360841013-c7683c659ec6?w=400&q=80",
        }
    ];

    return (
        <section id="video" className="py-20 select-none">

            {/* Header Panel */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div className="space-y-2">
                    <span className="text-primary font-black uppercase tracking-[0.25em] text-xs">
                        Follow Us On Instagram
                    </span>
                    <h2 className="text-2xl md:text-4.5xl font-black text-slate-800 tracking-tight">
                        #RideTheFuture
                    </h2>
                </div>

                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-primary hover:text-white font-bold text-xs uppercase tracking-widest transition-colors group flex-shrink-0"
                >
                    <span>View More</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
            </div>

            {/* 6-Column Reel Grid Layout */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {reels.map((reel) => (
                    <div
                        key={reel.id}
                        className="group relative aspect-square rounded-[2rem] overflow-hidden bg-slate-100 border border-slate-100/50 cursor-pointer shadow-sm"
                    >
                        {/* Visual Thumbnail */}
                        <img
                            src={reel.thumbnail}
                            alt="Reel Media clip"
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            loading="lazy"
                        />

                        {/* Dark Hover Mask and Central Play Button */}
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/35 transition-all duration-300 flex items-center justify-center">
                            <div className="w-11 h-11 rounded-full bg-white/95 text-slate-800 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                                <Play size={14} className="fill-current text-slate-800 ml-0.5" />
                            </div>
                        </div>

                        {/* Instagram top corner icon badge */}
                        <div className="absolute top-4 right-4 z-10 w-6 h-6 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center text-slate-700">
                            <Instagram size={12} className="stroke-[2.5]" />
                        </div>

                    </div>
                ))}
            </div>

        </section>
    );
};

export default VideoShowcase;
