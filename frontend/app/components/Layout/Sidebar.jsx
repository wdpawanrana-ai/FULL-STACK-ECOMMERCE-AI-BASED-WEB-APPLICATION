"use client";
import { X, Home, Package, Info, HelpCircle, Phone, ShoppingCart, List } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "@/app/store/slices/popupSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector((state) => state.popup);
  const { authUser } = useSelector((state) => state.auth);

  if (!isSidebarOpen) return null;

  const menuItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Products", icon: Package, path: "/products" },
    { name: "About", icon: Info, path: "/about" },
    { name: "FAQ", icon: HelpCircle, path: "/faq" },
    { name: "Contact", icon: Phone, path: "/contact" },
    { name: "Cart", icon: ShoppingCart, path: "/cart" },
    authUser && { name: "My Orders", icon: List, path: "/orders" },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-md z-40 transition-opacity duration-300"
        onClick={() => dispatch(toggleSidebar())}
      />

      {/* Sidebar Panel */}
      <div className="fixed left-0 top-0 h-full w-80 z-50 bg-background/95 backdrop-blur-2xl border-r border-border shadow-2xl animate-slide-in-left flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-8 border-b border-border/50">
          <div>
            <h2 className="text-2xl font-black text-foreground tracking-tight">Economics.</h2>
            <p className="text-xs text-primary font-bold tracking-widest uppercase mt-1">Navigation</p>
          </div>
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2.5 rounded-full bg-secondary/50 hover:bg-secondary text-foreground/70 hover:text-foreground transition-all active:scale-95 hover:rotate-90 duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto px-6 py-8 custom-scrollbar">
          <ul className="space-y-2">
            {menuItems.filter(Boolean).map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  onClick={() => dispatch(toggleSidebar())}
                  className="flex items-center space-x-4 px-5 py-4 rounded-2xl text-foreground/70 hover:text-primary hover:bg-primary/10 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="bg-secondary/50 group-hover:bg-primary/20 p-2 rounded-xl transition-colors duration-300 relative z-10">
                    <item.icon className="w-5 h-5 text-foreground/60 group-hover:text-primary group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300" />
                  </div>
                  <span className="text-sm font-bold tracking-wide relative z-10 group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Promotional / Bottom Section */}
        <div className="mt-auto p-8 border-t border-border/50 bg-gradient-to-t from-secondary/30 to-transparent">
          <div className="bg-primary/10 rounded-2xl p-5 border border-primary/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-primary/30 transition-colors duration-500" />
            <h3 className="text-primary font-black text-sm uppercase tracking-wider mb-2">Need Help?</h3>
            <p className="text-xs text-foreground/70 font-medium leading-relaxed mb-4 relative z-10">
              Our support team is available 24/7 for any queries regarding your EV ride.
            </p>
            <Link
              href="/contact"
              onClick={() => dispatch(toggleSidebar())}
              className="inline-block px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95 relative z-10"
            >
              Contact Support
            </Link>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[10px] text-foreground/40 uppercase tracking-[0.2em] font-bold">
              PoojaEV Premium © 2026
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;