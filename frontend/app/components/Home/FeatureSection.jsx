import React from "react";
import { Settings, Battery, Wrench, Bike, Headphones, ArrowRight } from "lucide-react";
import Link from "next/link";

/**
 * FeatureSection Component
 * Renders the "OUR SERVICES" section containing all vehicle customer solutions and booking guides.
 */
const FeatureSection = () => {
  const services = [
    {
      icon: Settings,
      title: "General Service",
      description: "Regular checkups and maintenance for smooth rides."
    },
    {
      icon: Battery,
      title: "Battery Care",
      description: "Battery inspection, repair and replacement."
    },
    {
      icon: Wrench,
      title: "Repairs & Fixes",
      description: "Fast and reliable repair services."
    },
    {
      icon: Bike,
      title: "Pick & Drop",
      description: "We pick up your scooter and drop after service."
    },
    {
      icon: Headphones,
      title: "Roadside Assistance",
      description: "24/7 support wherever you are."
    }
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden select-none">

      {/* Dynamic Background Decors */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-1 bg-primary rounded-full"></span>
            <span className="text-primary font-black uppercase tracking-[0.2em] text-xs">
              Our Services
            </span>
            <span className="w-8 h-1 bg-primary rounded-full"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight">
            We Keep You <span className="text-primary/90">Moving</span>
          </h2>
          <p className="mt-4 text-sm font-medium text-foreground/60">
            From routine checkups to emergency roadside assistance, our expert mechanics ensure your EV is always in peak condition.
          </p>
        </div>

        {/* 5-Column Responsive Services Grid - Premium Glassmorphism */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {services.map((svc, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col items-center text-center p-8 rounded-[2rem] bg-secondary/30 dark:bg-white/[0.02] border border-border hover:border-primary/50 hover:bg-white dark:hover:bg-white/[0.05] shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Background Glow on Hover */}
              <div className="absolute inset-x-0 -top-10 h-24 bg-gradient-to-b from-primary/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Modern Icon Sphere */}
              <div className="w-16 h-16 rounded-2xl bg-background border border-border outline outline-offset-4 outline-transparent group-hover:outline-primary/20 flex items-center justify-center text-foreground/50 group-hover:text-primary mb-6 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 relative z-10 shadow-sm">
                <svc.icon size={26} strokeWidth={2} />
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-foreground leading-snug mb-3 tracking-wide group-hover:text-primary transition-colors relative z-10">
                {svc.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-foreground/60 leading-relaxed font-medium relative z-10">
                {svc.description}
              </p>
            </div>
          ))}
        </div>

        {/* Centered CTA Trigger */}
        <div className="flex justify-center relative z-10">
          <Link
            href="/contact?subject=Service+Booking"
            className="group flex items-center gap-3 px-8 py-4 bg-foreground hover:bg-primary text-background hover:text-white rounded-2xl font-bold text-sm tracking-wide shadow-xl hover:shadow-primary/30 transition-all duration-300 active:scale-95"
          >
            <span>Book a Service</span>
            <div className="w-8 h-8 rounded-full bg-background/20 group-hover:bg-white/20 flex items-center justify-center transition-colors">
              <ArrowRight size={16} className="text-current group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeatureSection;