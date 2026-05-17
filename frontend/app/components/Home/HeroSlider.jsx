"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "The Future of Urban Mobility",
      subtitle: "Performance Series",
      description: "Experience the perfect blend of power and efficiency with our latest electric scooter lineup.",
      image: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=1600",
      cta: "Explore Models",
      url: "/products",
    },
    {
      id: 2,
      title: "Genuine Spares & Accessories",
      subtitle: "Factory Certified",
      description: "Keep your ride in peak condition with our range of original motors, controllers, and batteries.",
      image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1600",
      cta: "Shop Spares",
      url: "/products?category=Spare Parts",
    },
    {
      id: 3,
      title: "Advanced Lithium Technology",
      subtitle: "Energy Elite",
      description: "Long-lasting batteries designed specifically for the toughest road conditions.",
      image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1600",
      cta: "Learn More",
      url: "/products?category=Lithium Batteries",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const slide = slides[currentSlide];

  return (
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden rounded-3xl bg-secondary shadow-sm">
      {/* Clean Background Image */}
      {slides.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
        >
          <img
            src={s.image}
            className="w-full h-full object-cover"
            alt={s.title}
          />
          <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
      ))}

      {/* Simplified Content */}
      <div className="relative h-full flex flex-col justify-end p-8 md:p-20 pb-16 md:pb-24">
        <div className="max-w-2xl space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20 backdrop-blur-md">
            {slide.subtitle}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">
            {slide.title}
          </h1>
          <p className="text-lg text-white/70 max-w-lg leading-relaxed">
            {slide.description}
          </p>
          <div className="pt-4">
            <Link
              href={slide.url}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
            >
              {slide.cta}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Clean Bottom Controls */}
      <div className="absolute bottom-8 right-8 md:right-20 flex items-center gap-4">
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-8 bg-primary' : 'w-4 bg-white/20'}`}
            />
          ))}
        </div>
        <div className="flex gap-2 ml-4">
          <button onClick={prevSlide} className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all active:scale-90">
            <ChevronLeft size={20} />
          </button>
          <button onClick={nextSlide} className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all active:scale-90">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
