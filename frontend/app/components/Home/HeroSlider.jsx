"use client";

import React, { useState, useEffect } from "react";
import {
  Zap,
  Leaf,
  Gauge,
  ShieldCheck,
  ArrowRight,
  Play,
  TrendingDown,
  Award,
  Sparkles,
  Shield,
  Truck
} from "lucide-react";
import Link from "next/link";

/**
 * HeroSlider Component
 * Displays a premium electric scooter landing slider matching the "ECONOMICS RIDE THE FUTURE" mock-up.
 */
const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      badge: "100% ELECTRIC. 0% EMISSIONS.",
      titleFirst: "SMART RIDES",
      titleSecond: "GREENER FUTURE",
      subtitle: "Premium Electric Scooters for a Better Tomorrow.",
      image: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=800&q=80",
      range: "120+",
      topSpeed: "75",
      warranty: "3",
      glowColor: "from-lime-500/20 to-emerald-500/0"
    },
    {
      id: 2,
      badge: "PRO RANGE. HYPER PERFORMANCE.",
      titleFirst: "UNLEASH POWER",
      titleSecond: "LIMITLESS RANGE",
      subtitle: "Engineered to deliver high speed and dynamic control.",
      image: "https://images.unsplash.com/photo-1621360841013-c7683c659ec6?w=800&q=80",
      range: "140+",
      topSpeed: "70",
      warranty: "5",
      glowColor: "from-red-500/20 to-orange-500/0"
    },
    {
      id: 3,
      badge: "SMART CITY COMMUTER EDITION.",
      titleFirst: "EASY DAILY",
      titleSecond: "URBAN TRANSIT",
      subtitle: "Elegant design optimized for simple everyday commutes.",
      image: "https://images.unsplash.com/photo-1533256058098-9ed7f3c1acdd?w=800&q=80",
      range: "90+",
      topSpeed: "45",
      warranty: "3",
      glowColor: "from-blue-500/20 to-indigo-500/0"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const active = slides[currentSlide];

  return (
    <div className="relative w-full overflow-hidden bg-[#070b13] text-white rounded-[2.5rem] shadow-2xl border border-white/5 mb-10">

      {/* Background City Night Overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1600&q=80"
          alt="City Backdrop"
          className="w-full h-full object-cover opacity-25 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070b13] via-[#070b13]/85 to-transparent"></div>
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#070b13] via-transparent to-transparent"></div>
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 py-12 md:px-16 md:py-20 items-center min-h-[560px]">

        {/* Left Column: Text & Call-To-Action */}
        <div className="lg:col-span-5 flex flex-col items-start space-y-6">

          {/* Tagline Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
            {active.badge}
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none">
              {active.titleFirst}
            </h1>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-primary leading-none">
              {active.titleSecond}
            </h2>
          </div>

          {/* Subheading */}
          <p className="text-base text-slate-350 max-w-sm font-medium">
            {active.subtitle}
          </p>

          {/* Feature Badges list */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-bold text-slate-400">
            <div className="flex items-center gap-1.5">
              <Leaf size={14} className="text-primary" />
              <span>Zero Emission</span>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingDown size={14} className="text-primary" />
              <span>Low Running Cost</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Gauge size={14} className="text-primary" />
              <span>High Performance</span>
            </div>
          </div>

          {/* User interactive buttons */}
          <div className="flex items-center gap-4 pt-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/95 text-[#070b13] rounded-full font-bold text-xs uppercase tracking-wider shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-[1.03] active:scale-95"
            >
              <span>Explore Scooters</span>
              <ArrowRight size={14} className="stroke-[3]" />
            </Link>

            <Link
              href="/#video"
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-all text-xs font-bold uppercase tracking-wider group"
            >
              <span className="p-2.5 rounded-full border border-slate-500 group-hover:border-primary group-hover:bg-primary/10 transition-colors flex items-center justify-center">
                <Play size={12} className="fill-slate-300 group-hover:fill-primary text-slate-300 group-hover:text-primary transition-all" />
              </span>
              <span>Watch Video</span>
            </Link>
          </div>

          {/* Horizontal Slide Indicators */}
          <div className="flex items-center gap-3 pt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${index === currentSlide ? "w-10 bg-primary" : "w-5 bg-white/20 hover:bg-white/40"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

        </div>

        {/* Center Column: Scooter Visual */}
        <div className="lg:col-span-5 flex justify-center items-center relative py-6 lg:py-0">
          {/* Radial color backglow */}
          <div className={`absolute w-72 h-72 rounded-full blur-[80px] bg-gradient-to-tr ${active.glowColor} z-0`}></div>

          {/* Scooter Image with subtle float animation */}
          <div className="relative z-10 max-w-sm md:max-w-md animate-bounce-subtle">
            <img
              src={active.image}
              alt="Electric Scooter"
              className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(130,195,30,0.25)] rounded-3xl"
            />
          </div>
        </div>

        {/* Right Column: Stats HUD widgets */}
        <div className="lg:col-span-2 flex flex-col md:flex-row lg:flex-col items-center justify-center gap-6 lg:gap-8 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8 ml-0 lg:ml-4 select-none">

          {/* Stat 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center text-primary mb-2 shadow-inner">
              <Zap size={18} className="fill-primary/10" />
            </div>
            <span className="text-2xl font-black text-white leading-none">{active.range}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">KM Range</span>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center text-primary mb-2 shadow-inner">
              <Gauge size={18} />
            </div>
            <span className="text-2xl font-black text-white leading-none">{active.topSpeed}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">KM/H Speed</span>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center text-primary mb-2 shadow-inner">
              <ShieldCheck size={18} />
            </div>
            <span className="text-2xl font-black text-white leading-none">{active.warranty}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Years Warranty</span>
          </div>

        </div>

      </div>

      {/* Bottom Values ribbon */}
      <div className="relative z-10 bg-black/60 backdrop-blur-md border-t border-white/5 py-5 px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center items-center text-xs font-bold text-slate-300">

          <div className="flex items-center justify-center gap-2">
            <span className="p-1 rounded-full bg-primary/10 text-primary border border-primary/20"><Sparkles size={12} /></span>
            <span>Trusted By Thousands</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <span className="p-1 rounded-full bg-primary/10 text-primary border border-primary/20"><Zap size={12} /></span>
            <span>Wide Range Of Products</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <span className="p-1 rounded-full bg-primary/10 text-primary border border-primary/20"><Award size={12} /></span>
            <span>Best Quality Guaranteed</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <span className="p-1 rounded-full bg-primary/10 text-primary border border-primary/20"><Shield size={12} /></span>
            <span>Expert Support Always Here</span>
          </div>

          <div className="flex items-center justify-center gap-2 col-span-2 md:col-span-1">
            <span className="p-1 rounded-full bg-primary/10 text-primary border border-primary/20"><Truck size={12} /></span>
            <span>Fast Delivery Pan India</span>
          </div>

        </div>
      </div>

    </div>
  );
};

export default HeroSlider;
