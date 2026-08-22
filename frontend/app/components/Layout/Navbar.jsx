"use client";
import React from "react";
import { Menu, User, ShoppingCart, Sun, Moon, Search, Zap } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { toggleAuthPopup, toggleSearchBar, toggleSidebar } from "@/app/store/slices/popupSlice";
import Link from "next/link";

/**
 * Navbar Component
 * Renders the top navigation header containing logo, page links, search, profile, cart counters, and ride CTAs.
 */
const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cart);
  const { authUser } = useSelector((state) => state.auth);

  const cartItemsCount = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;

  return (
    <nav className="fixed left-0 w-full top-0 z-[100] transition-all duration-500">
      {/* Top electric accent strip */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-20" />

      <div className="bg-background/60 backdrop-blur-2xl border-b border-border/50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24 gap-4">

            {/* Left portion: Sidebar Toggle & Brand Logo */}
            <div className="flex items-center gap-3.5 flex-shrink-0">
              <button
                onClick={() => dispatch(toggleSidebar())}
                className="p-3 rounded-2xl bg-secondary/50 text-foreground/60 hover:text-primary hover:bg-primary/10 transition-all active:scale-95 group"
                aria-label="Toggle Navigation Sidebar"
              >
                <Menu size={22} className="group-hover:rotate-180 transition-transform duration-500" />
              </button>

              <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                  <Zap size={28} className="relative text-primary fill-primary animate-bounce-subtle" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl md:text-2xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors uppercase leading-none">
                    ECONOMICS
                  </span>
                  <span className="text-[8px] font-black uppercase tracking-[0.25em] text-primary mt-0.5 ml-0.5 whitespace-nowrap">
                    Ride The Future
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links (Centered) */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-bold uppercase tracking-wider text-foreground mx-auto">
              <Link href="/" className="hover:text-primary transition-colors text-primary">Home</Link>
              <Link href="/products" className="hover:text-primary transition-colors text-foreground/75">Scooters</Link>
              <Link href="/products?category=Spare%20Parts" className="hover:text-primary transition-colors text-foreground/75 whitespace-nowrap">Spare Parts</Link>
              <Link href="/#services" className="hover:text-primary transition-colors text-foreground/75">Services</Link>
              <Link href="/#reviews" className="hover:text-primary transition-colors text-foreground/75">Reviews</Link>
              <Link href="/about" className="hover:text-primary transition-colors text-foreground/75 whitespace-nowrap">About Us</Link>
              <Link href="/contact" className="hover:text-primary transition-colors text-foreground/75">Contact</Link>
            </div>

            {/* Right Portion: Search input, Theme toggle, Profile, Cart, and Test Ride booking CTA */}
            <div className="flex items-center gap-1.5 md:gap-3 flex-shrink-0 justify-end">

              {/* Search Toggle Input (Desktop) */}
              <button
                onClick={() => dispatch(toggleSearchBar())}
                className="hidden md:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-secondary/50 border border-border/50 text-foreground/45 hover:text-foreground/60 transition-all text-xs font-bold uppercase tracking-wider"
              >
                <Search size={16} />
                <span>Search...</span>
              </button>

              {/* Mobile Search Button */}
              <button
                onClick={() => dispatch(toggleSearchBar())}
                className="md:hidden p-3 rounded-2xl text-foreground/60 hover:text-primary hover:bg-primary/10 transition-all"
                aria-label="Toggle Search"
              >
                <Search size={20} />
              </button>

              {/* Theme Selector */}
              <button
                onClick={toggleTheme}
                className="p-3 rounded-2xl bg-secondary/50 text-foreground/60 hover:text-primary hover:bg-primary/10 transition-all active:scale-95 flex items-center justify-center font-bold"
                aria-label="Toggle Light/Dark Theme"
              >
                {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
              </button>

              {/* User profile dropdown trigger */}
              <button
                onClick={() => dispatch(toggleAuthPopup())}
                className={`p-3 rounded-2xl transition-all active:scale-95 flex items-center gap-2 ${authUser ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-secondary/50 text-foreground/60 hover:text-primary hover:bg-primary/10"
                  }`}
                aria-label="Open User Authentication Portal"
              >
                {authUser?.avatar ? (
                  <img src={authUser.avatar.url || authUser.avatar} alt="User Avatar" className="w-6 h-6 rounded-lg object-cover" />
                ) : (
                  <User size={20} />
                )}
                {authUser && (
                  <span className="hidden md:block text-xs font-bold uppercase tracking-widest">
                    {authUser.name.split(" ")[0]}
                  </span>
                )}
              </button>

              {/* Cart link */}
              <Link
                href="/cart"
                className="relative p-3 rounded-2xl bg-secondary/50 text-foreground/60 hover:text-primary hover:bg-primary/10 transition-all active:scale-95 group font-bold"
                aria-label="View Shopping Cart"
              >
                <ShoppingCart size={20} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center shadow-lg shadow-primary/40 animate-pulse border-2 border-background">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              {/* Book a Test Ride CTA button */}
              <Link
                href="/contact?subject=Test+Ride+Booking"
                className="hidden xl:flex items-center gap-2 px-5 py-3 bg-primary hover:bg-primary/95 text-white rounded-2xl font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 ml-1"
              >
                <span>Book a Test Ride</span>
                <span className="font-bold">→</span>
              </Link>

            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
