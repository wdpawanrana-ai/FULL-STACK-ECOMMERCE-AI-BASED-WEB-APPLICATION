"use client";

import Link from "next/link";
import { ArrowRight, BatteryCharging, Settings, CircleDashed, Octagon, Zap, Lightbulb, PenTool } from "lucide-react";
import { categories } from "../../data/products";

/**
 * CategoryGrid Component
 * Renders the "SPARE PARTS" section with a highly premium, modern, and responsive UI.
 */
const CategoryGrid = () => {
  // Filter out Electric Scooters to display only raw parts categories
  const spareParts = categories.filter((cat) => cat.name !== "Electric Scooters");

  // Helper to map inventory category names to stylized shorter labels and beautiful icons
  const getCategoryDetails = (name) => {
    switch (name) {
      case "Lithium Batteries":
        return { label: "Battery Pack", Icon: BatteryCharging };
      case "Motor & Controllers":
        return { label: "Motor & Controller", Icon: Settings };
      case "Charging Solutions":
        return { label: "Fast Chargers", Icon: Zap };
      case "Braking Systems":
        return { label: "Brake Systems", Icon: Octagon };
      case "Tires & Rims":
        return { label: "Performance Tyres", Icon: CircleDashed };
      case "Lights & Signals":
        return { label: "Lighting", Icon: Lightbulb };
      case "Accessories":
        return { label: "Accessories", Icon: PenTool };
      default:
        return { label: name, Icon: Settings };
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-primary/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-1 bg-primary rounded-full"></span>
              <span className="text-primary font-black uppercase tracking-[0.2em] text-xs">
                Spare Parts Catalog
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight max-w-xl">
              Quality Parts for <br /> <span className="text-primary/90">Peak Performance</span>
            </h2>
          </div>

          <Link
            href="/products?category=Spare%20Parts"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-foreground hover:bg-primary text-background hover:text-white font-bold rounded-2xl shadow-lg hover:shadow-primary/30 transition-all duration-300 group flex-shrink-0"
          >
            <span className="text-sm">Explore All Parts</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Dynamic Premium Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {spareParts.slice(0, 6).map((item, index) => {
            const { label, Icon } = getCategoryDetails(item.name);

            return (
              <Link
                key={item.id}
                href={`/products?category=${encodeURIComponent(item.name)}`}
                className="group relative flex flex-col justify-between p-6 rounded-3xl bg-secondary/30 dark:bg-white/[0.02] border border-border hover:border-primary/50 hover:bg-white dark:hover:bg-white/[0.05] shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden min-h-[180px]"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Background Pattern Hover Decor */}
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors duration-500" />

                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-background border border-border flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:border-primary/30 group-hover:rotate-3 transition-all duration-300 relative z-10 text-foreground/60 group-hover:text-primary mb-6">
                  <Icon size={26} strokeWidth={2} />
                </div>

                {/* Text Content */}
                <div className="relative z-10 w-full">
                  <h3 className="text-sm font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                    {label}
                  </h3>
                  <div className="w-0 h-0.5 bg-primary mt-2 group-hover:w-full transition-all duration-500 ease-out" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default CategoryGrid;
