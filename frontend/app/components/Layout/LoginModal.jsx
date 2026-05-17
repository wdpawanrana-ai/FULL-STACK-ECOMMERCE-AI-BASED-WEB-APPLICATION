"use client";
import { useState, useEffect } from "react";
import { X, Mail, Lock, User, ShieldCheck, Loader2, ArrowRight, Github } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { forgotPassword, login, resetPassword, register as registerAction } from "@/app/store/slices/authSlice";
import { toggleAuthPopup } from "@/app/store/slices/popupSlice";

const LoginModal = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { authUser, isSigningUp, isLoggingIn, isRequestingForToken } = useSelector((state) => state.auth);
  const { isAuthPopupOpen } = useSelector((state) => state.popup);

  const [mode, setMode] = useState("signin");
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (pathname.startsWith("/password/reset/")) {
      setMode("reset");
      if (!isAuthPopupOpen) dispatch(toggleAuthPopup());
    }
  }, [pathname, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "forgot") {
      dispatch(forgotPassword({ email: formData.email })).then(() => {
        setMode("signin");
      });
      return;
    }
    if (mode === "reset") {
      const token = pathname.split("/").pop();
      dispatch(resetPassword({ token, password: formData.password, confirmPassword: formData.confirmPassword }));
      return;
    }
    if (mode === "signup") {
      dispatch(registerAction(formData));
    } else {
      dispatch(login(formData));
    }
  };

  useEffect(() => {
    if (authUser && isAuthPopupOpen) {
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    }
  }, [authUser, isAuthPopupOpen]);

  if (!mounted || !isAuthPopupOpen || authUser) return null;

  const isLoading = isSigningUp || isLoggingIn || isRequestingForToken;

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Advanced Glass Overlay */}
        <div
          className="absolute inset-0 bg-background/40 backdrop-blur-xl transition-all duration-500"
          onClick={() => !isLoading && dispatch(toggleAuthPopup())}
        />

        {/* Modal Container */}
        <div className="relative z-10 w-full max-w-[440px] bg-background border border-border shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] rounded-[2.5rem] overflow-hidden animate-slide-in-bottom">

          {/* Top Decorative Line */}
          <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

          <div className="p-8 sm:p-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-10">
              <div className="space-y-1">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  {mode === "reset" ? "Reset" : mode === "signup" ? "Join" : mode === "forgot" ? "Forgot" : "Login"}
                </h2>
                <p className="text-sm text-foreground/50 font-medium tracking-wide">
                  {mode === "reset" ? "Set your new password" : mode === "signup" ? "Start your journey with us" : mode === "forgot" ? "We'll send a link to your email" : "Welcome back to PoojaEV"}
                </p>
              </div>
              <button
                onClick={() => dispatch(toggleAuthPopup())}
                className="p-3 rounded-2xl bg-secondary/50 text-foreground/40 hover:text-foreground hover:bg-secondary transition-all active:scale-95"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              {mode === "signup" && (
                <div className="group space-y-2">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/20 group-focus-within:text-primary transition-colors" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-secondary/30 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm placeholder:text-foreground/20"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              {mode !== "reset" && (
                <div className="group space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/20 group-focus-within:text-primary transition-colors" />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-secondary/30 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm placeholder:text-foreground/20"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Password */}
              {mode !== "forgot" && (
                <div className="group space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/20 group-focus-within:text-primary transition-colors" />
                    <input
                      type="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-secondary/30 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm placeholder:text-foreground/20"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Confirm Password */}
              {mode === "reset" && (
                <div className="group space-y-2">
                  <div className="relative">
                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/20 group-focus-within:text-primary transition-colors" />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-secondary/30 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm placeholder:text-foreground/20"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Forgot Password Link */}
              {mode === "signin" && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setMode("forgot")}
                    className="text-xs font-bold text-primary/60 hover:text-primary transition-colors uppercase tracking-widest px-1"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm overflow-hidden flex items-center justify-center gap-2 transition-all hover:shadow-xl hover:shadow-primary/20 active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>
                      {mode === "reset" ? "Reset Password" : mode === "signup" ? "Create Free Account" : mode === "forgot" ? "Send Magic Link" : "Sign In to Account"}
                    </span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            {/* Mode Toggles */}
            <div className="mt-8 pt-8 border-t border-border/50 text-center">
              {["signin", "signup"].includes(mode) ? (
                <p className="text-sm text-foreground/40 font-medium">
                  {mode === "signup" ? "Already a member?" : "New to PoojaEV?"}
                  <button
                    type="button"
                    onClick={() => setMode(prev => prev === "signup" ? "signin" : "signup")}
                    className="ml-2 text-foreground font-bold hover:text-primary transition-colors hover:underline underline-offset-4"
                  >
                    {mode === "signup" ? "Sign In" : "Create Account"}
                  </button>
                </p>
              ) : (
                <button
                  onClick={() => setMode("signin")}
                  className="text-sm text-foreground/40 font-bold hover:text-foreground transition-all uppercase tracking-[0.2em]"
                >
                  Back to Login
                </button>
              )}
            </div>
          </div>

          {/* Bottom Decorative Element */}
          <div className="bg-secondary/20 p-4 text-center">
            <p className="text-[10px] text-foreground/20 uppercase tracking-[0.3em]">
              High Performance Ecommerce
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;

