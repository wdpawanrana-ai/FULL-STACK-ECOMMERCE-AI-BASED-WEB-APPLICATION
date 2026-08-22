"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

/**
 * FAQ page tailored for PoojaEV components, logistics, and scooter questions.
 */
const FAQ = () => {
  const [openItems, setOpenItems] = useState({});

  // EV custom Q&A dataset
  const faqs = [
    {
      question: 'What is the dynamic range of PoojaEV Electric Scooters?',
      answer: 'Our performance series scooters offer a dynamic range between 100km to 150km per charge depending on the battery configuration (LFP or NMC) and selected riding mode (Eco, City, or Sport).'
    },
    {
      question: 'How long does battery warranty coverage last?',
      answer: 'Our advanced Lithium Batteries carry an industry-leading 3 to 5 years manufacturer replacement warranty. All batteries include smart BMS (Battery Management System) protection against voltage spikes.'
    },
    {
      question: 'Are there any RTO registration and license requirements?',
      answer: 'For low-speed models (top speed under 25 km/h), no RTO registration or driving license is required. High-speed scooters require standard registration and third-party insurance, which our showroom team assists with.'
    },
    {
      question: 'How fast are spare parts and tire rims dispatched?',
      answer: 'Spares, tires, and motor controllers catalog orders are dispatched from our Noida warehouse within 24 hours. Transit typically takes 2-5 business days across India.'
    },
    {
      question: 'Do you offer doorstep EV service assistance?',
      answer: 'Yes! PoojaEV has a network of certified mobile technicians who provide periodic servicing, brake overhauls, and electronics diagnostic checkups directly at your doorstep.'
    }
  ];

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">

        {/* FAQ Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-primary font-bold uppercase tracking-[0.25em] text-xs">Got Questions?</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">Showroom FAQ</h1>
          <p className="text-lg text-foreground/50 leading-relaxed font-medium">Find expert answers to common queries about battery tech, shipping, and servicing.</p>
        </div>

        {/* Accordion Questions List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = !!openItems[index];
            return (
              <div
                key={index}
                className={`border rounded-3xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-secondary/40 border-primary/20 shadow-md' : 'bg-secondary/10 border-border/40'
                  }`}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3 pr-4">
                    <HelpCircle size={18} className={isOpen ? 'text-primary' : 'text-foreground/30'} />
                    <h3 className="font-bold text-foreground text-sm md:text-base leading-snug">{faq.question}</h3>
                  </div>
                  <div className="flex-shrink-0 p-1.5 rounded-lg bg-background border border-border/30 text-foreground/60 transition-transform">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-primary" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Expandable answers */}
                <div
                  className={`transition-all duration-500 overflow-hidden ${isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                    }`}
                >
                  <div className="px-6 pb-6 pt-2 border-t border-border/20">
                    <p className="text-sm text-foreground/65 leading-relaxed font-medium">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FAQ;