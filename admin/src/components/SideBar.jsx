import React, { useState } from "react";
import {
  LayoutDashboard,
  ListOrdered,
  Package,
  Users,
  User,
  LogOut,
  MoveLeft,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import { toggleNavbar, toggleComponent } from "../store/slices/extraSlice";

const SideBar = () => {
  const [activeLink, setActiveLink] = useState(0);
  const links = [
    {
      icon: <LayoutDashboard size={20} />,
      title: "Dashboard",
    },
    {
      icon: <ListOrdered size={20} />,
      title: "Orders",
    },
    {
      icon: <Package size={20} />,
      title: "Products",
    },
    {
      icon: <Users size={20} />,
      title: "Users",
    },
    {
      icon: <User size={20} />,
      title: "Profile",
    },
  ];

  const { isNavbarOpened } = useSelector((state) => state.extra);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {/* Backdrop for mobile drawer */}
      {isNavbarOpened && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-xs z-25 md:hidden"
          onClick={() => dispatch(toggleNavbar())}
        />
      )}

      <aside
        className={`${isNavbarOpened ? "left-0" : "-left-full"
          } fixed w-60 top-16 bottom-0 bg-white border-r border-slate-100 z-30 transition-all duration-300 p-4 flex flex-col justify-between md:left-0`}
      >
        <div className="space-y-4">
          {/* Mobile close menu trigger */}
          <div className="flex items-center justify-between pb-2 md:hidden border-b border-slate-100">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#7978e9]">Navigation Menu</span>
            <button
              onClick={() => dispatch(toggleNavbar())}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
              title="Close Menu"
            >
              <MoveLeft size={18} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 pt-2">
            {links.map((item, index) => {
              const isActive = activeLink === index;
              return (
                <button
                  key={index}
                  onClick={() => {
                    setActiveLink(index);
                    dispatch(toggleComponent(item.title));
                    if (isNavbarOpened) {
                      dispatch(toggleNavbar());
                    }
                  }}
                  className={`w-full transition-all duration-200 rounded-xl px-4 py-3 flex items-center gap-3 font-semibold text-sm ${isActive
                    ? "bg-[#7978e9] text-white shadow-md shadow-indigo-100"
                    : "text-slate-650 hover:bg-[#f8f9fa] hover:text-[#7978e9]"
                    }`}
                >
                  <span className={isActive ? "text-white" : "text-slate-400 group-hover:text-[#7978e9]"}>
                    {item.icon}
                  </span>
                  <span>{item.title}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Logout Button */}
        <div>
          <div className="border-t border-slate-100 my-4"></div>
          <button
            onClick={handleLogout}
            className="w-full transition-all duration-200 rounded-xl px-4 py-3 flex items-center gap-3 font-semibold text-sm text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
