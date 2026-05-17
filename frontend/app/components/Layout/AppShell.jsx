"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../store/slices/authSlice";
import { fetchAllProducts } from "../../store/slices/productSlice";
import { Loader2 } from "lucide-react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import SearchOverlay from "./SearchOverlay";
import Footer from "./Footer";
import CartSidebar from "./CartSidebar";
import ProfilePanel from "./ProfilePanel";
import LoginModal from "./LoginModal";
import AISearchModal from "../Products/AISearchModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../../contexts/ThemeContext";

export default function AppShell({ children }) {
    const { authUser, isCheckingAuth } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { theme } = useTheme();

    useEffect(() => {
        dispatch(getUser());
    }, [getUser]);

    useEffect(() => {
        dispatch(fetchAllProducts());

    }, []);

    const { products } = useSelector((state) => state.product);


    if (isCheckingAuth && !authUser || !products) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-background">
                <div className="relative">
                    <Loader2 className="w-12 h-12 text-primary animate-spin" />
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 animate-pulse" />
                </div>
                <p className="mt-8 text-xs font-black uppercase tracking-[0.4em] text-foreground/20 animate-pulse">
                    Starting Engines
                </p>
            </div>
        );
    }

    return (
        <>
            <SearchOverlay />
            <Navbar />
            <Sidebar />
            <CartSidebar />
            <ProfilePanel />
            <LoginModal />
            <AISearchModal />
            <main className="min-h-screen pt-24">
                {children}
            </main>
            <Footer />
            <ToastContainer
                position="bottom-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={theme === "dark" ? "dark" : "light"}
            />
        </>
    );
}

