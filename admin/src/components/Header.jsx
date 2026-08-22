import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Bell, Search, Shield } from "lucide-react";
import { toggleNavbar } from "../store/slices/extraSlice";
import avatarFallback from "../assets/avatar.jpg";


const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 z-40 shadow-sm">
      {/* Brand & Mobile Toggle */}
      <div className="flex items-center gap-4 md:w-54 md:shrink-0">
        <button
          onClick={() => dispatch(toggleNavbar())}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 transition-colors md:hidden"
          title="Open Menu"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
          {/* Logo brand icon resembling Vite or Skydash */}
          <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7978e9] to-[#4b49ac] flex items-center justify-center text-white font-black text-sm shadow-md shadow-indigo-150">
            P
          </span>
          <span className="text-lg font-black text-slate-800 tracking-wider">
            Pooja<span className="text-[#7978e9]">EV</span>
          </span>
        </div>
      </div>

      {/* Center Search Element */}
      <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200/60 rounded-2xl px-4 py-2 w-64">
        <Search size={16} className="text-slate-400" />
        <input
          type="text"
          placeholder="Search now"
          className="bg-transparent border-none outline-none text-xs text-slate-700 w-full placeholder-slate-400 font-medium"
        />
      </div>

      {/* Right User Badge and Alerts */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-xl text-slate-400 hover:text-[#7978e9] hover:bg-slate-50 transition-colors">
          <Bell size={20} />
          {/* Unread dot */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#f3797e]"></span>
        </button>

        {/* Profile Card */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-100">
          <img
            src={user?.avatar?.url || avatarFallback}
            alt={user?.name || "Admin"}
            className="w-9 h-9 rounded-full object-cover shadow-sm border border-slate-200 ring-2 ring-[#7978e9]/10"
          />
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-bold leading-tight text-slate-800">{user?.name || "Admin User"}</span>
            <span className="text-[10px] font-bold text-[#7978e9] flex items-center gap-1 mt-0.5">
              <Shield size={10} className="stroke-[2.5]" />
              {user?.role || "System Admin"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
