"use client";
import { Menu, User, ShoppingCart, Sun, Moon, Search, Zap } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { toggleAuthPopup, toggleCart, toggleSearchBar, toggleSidebar } from "@/app/store/slices/popupSlice";
import Link from "next/link";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.cart);
  const { authUser } = useSelector(state => state.auth);

  const cartItemsCount = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;

  return (
    <nav className="fixed left-0 w-full top-0 z-[100] transition-all duration-500">
      {/* Subtle top accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-20" />

      <div className="bg-background/60 backdrop-blur-2xl border-b border-border/50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">

            {/* Left: Hamburger & Search (Desktop) */}
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={() => dispatch(toggleSidebar())}
                className="p-3 rounded-2xl bg-secondary/50 text-foreground/60 hover:text-primary hover:bg-primary/10 transition-all active:scale-95 group"
              >
                <Menu size={22} className="group-hover:rotate-180 transition-transform duration-500" />
              </button>

              <button
                onClick={() => dispatch(toggleSearchBar())}
                className="hidden md:flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-secondary/50 border border-border/50 text-foreground/40 hover:text-foreground/60 hover:border-primary/30 transition-all"
              >
                <Search size={18} />
                <span className="text-sm font-medium tracking-wide">Search showroom...</span>
              </button>
            </div>

            {/* Center: Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <Zap size={32} className="relative text-primary fill-primary animate-bounce-subtle" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors">
                  POOJA<span className="text-primary">EV</span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/30 -mt-1 ml-0.5">Showroom</span>
              </div>
            </Link>

            {/* Right Side Icons */}
            <div className="flex items-center gap-1 md:gap-3">
              {/* Mobile Search Icon */}
              <button
                onClick={() => dispatch(toggleSearchBar())}
                className="md:hidden p-3 rounded-2xl text-foreground/60 hover:text-primary hover:bg-primary/10 transition-all"
              >
                <Search size={22} />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-3 rounded-2xl bg-secondary/50 text-foreground/60 hover:text-primary hover:bg-primary/10 transition-all active:scale-95 flex items-center justify-center"
              >
                {theme === "dark" ? <Moon size={22} /> : <Sun size={22} />}
              </button>

              {/* User Profile */}
              <button
                onClick={() => dispatch(toggleAuthPopup())}
                className={`p-3 rounded-2xl transition-all active:scale-95 flex items-center gap-2 ${authUser ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-secondary/50 text-foreground/60 hover:text-primary hover:bg-primary/10"}`}
              >
                {authUser?.avatar ? (
                  <img src={authUser.avatar.url || authUser.avatar} alt="User" className="w-6 h-6 rounded-lg object-cover" />
                ) : (
                  <User size={22} />
                )}
                {authUser && <span className="hidden md:block text-xs font-bold uppercase tracking-widest">{authUser.name.split(' ')[0]}</span>}
              </button>

              {/* Cart */}
              <button
                onClick={() => dispatch(toggleCart())}
                className="relative p-3 rounded-2xl bg-secondary/50 text-foreground/60 hover:text-primary hover:bg-primary/10 transition-all active:scale-95 group"
              >
                <ShoppingCart size={22} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center shadow-lg shadow-primary/40 animate-pulse border-2 border-background">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

