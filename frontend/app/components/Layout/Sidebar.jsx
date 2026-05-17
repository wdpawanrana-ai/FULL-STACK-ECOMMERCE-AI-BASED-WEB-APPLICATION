"use client";
import { X, Home, Package, Info, HelpCircle, Phone, ShoppingCart, List } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "@/app/store/slices/popupSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector((state) => state.popup);
  const { authUser } = useSelector((state) => state.auth);
  console.log("Sidebar open?", isSidebarOpen);
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
      <div className="fixed left-0 top-0 h-full w-72 z-50 bg-[#0f172a]/90 backdrop-blur-xl border-r border-white/10 shadow-2xl animate-slide-in-left">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-8">
          <h2 className="text-xl font-semibold text-white/90 tracking-wide">Menu</h2>
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 rounded-full hover:bg-white/10 text-white/70 transition-all active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="px-4">
          <ul className="space-y-1.5">
            {menuItems.filter(Boolean).map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  onClick={() => dispatch(toggleSidebar())}
                  className="flex items-center space-x-4 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 group"
                >
                  <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm font-medium tracking-wide">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Decorative element at bottom */}
        <div className="absolute bottom-8 left-0 w-full px-6">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <p className="mt-4 text-[10px] text-white/30 uppercase tracking-[0.2em] text-center">
            PoojaEV Premium
          </p>
        </div>
      </div>
    </>
  );
};


export default Sidebar;