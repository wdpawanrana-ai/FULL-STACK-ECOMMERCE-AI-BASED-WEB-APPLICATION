"use client";
import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

/**
 * Contact form and maps indicator page.
 * Processes user queries/support tickets.
 */
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your inquiry was sent successfully. We will reach back within 24 hours.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Contact Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-primary font-bold uppercase tracking-[0.25em] text-xs">Get In Touch</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            Contact PoojaEV
          </h1>
          <p className="text-lg text-foreground/50 max-w-lg mx-auto leading-relaxed">
            Have questions about batteries, delivery timelines, or bulk orders? Reach out to support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact Details Grid */}
          <div className="space-y-8">
            <div className="flex items-start space-x-5 p-6 bg-secondary/20 border border-border/40 rounded-3xl">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1 text-base">Showroom Mailbox</h3>
                <p className="text-sm text-foreground/60">support@poojaev.com</p>
                <p className="text-xs text-foreground/45 mt-0.5">Response within 12-24 hours</p>
              </div>
            </div>

            <div className="flex items-start space-x-5 p-6 bg-secondary/20 border border-border/40 rounded-3xl">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1 text-base">Direct Customer Hotline</h3>
                <p className="text-sm text-foreground/60">+91 98765 43210</p>
                <p className="text-xs text-foreground/45 mt-0.5">Mon - Sat: 9:00 AM - 7:00 PM</p>
              </div>
            </div>

            <div className="flex items-start space-x-5 p-6 bg-secondary/20 border border-border/40 rounded-3xl">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1 text-base">Delhi NCR Corporate HQ</h3>
                <p className="text-sm text-foreground/60">
                  Sector 62, Noida, Uttar Pradesh - 201301
                </p>
                <p className="text-xs text-foreground/45 mt-0.5">Schedule a live demo test-drive</p>
              </div>
            </div>
          </div>

          {/* Inquiry Send Form */}
          <div className="bg-secondary/45 border border-border/40 rounded-3xl p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="px-4 py-3.5 bg-background border border-border/50 rounded-2xl focus:outline-none focus:border-primary text-sm font-medium text-foreground transition-all"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="px-4 py-3.5 bg-background border border-border/50 rounded-2xl focus:outline-none focus:border-primary text-sm font-medium text-foreground transition-all"
                  required
                />
              </div>

              <input
                type="text"
                placeholder="Inquiry Subject (e.g. Battery Warranty / Dealership)"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="w-full px-4 py-3.5 bg-background border border-border/50 rounded-2xl focus:outline-none focus:border-primary text-sm font-medium text-foreground transition-all"
                required
              />

              <textarea
                rows="5"
                placeholder="Describe your request in detail. Mention product SKU if applicable..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-4 py-3.5 bg-background border border-border/50 rounded-2xl focus:outline-none focus:border-primary text-sm font-medium text-foreground resize-none transition-all"
                required
              />

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/95 text-white py-4 rounded-2xl font-bold text-sm tracking-wider uppercase transition-all flex items-center justify-center space-x-2 shadow-lg shadow-primary/20 active:scale-95"
              >
                <Send className="w-4 h-4 cursor-pointer" />
                <span>Submit Ticket</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
