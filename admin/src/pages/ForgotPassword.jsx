import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { forgotPassword } from "../store/slices/authSlice";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  if (isAuthenticated) {
    return <Navigate to="/" />
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
    setEmail("");
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#f5f7ff] px-4">
        <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
          {/* Top accent line */}
          <div className="absolute top-0 inset-x-0 h-2 bg-[#7978e9]"></div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Forgot Password</h2>
            <p className="text-xs text-slate-400 font-semibold mt-1">
              Enter your email below to request a security reset token
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-450 uppercase tracking-widest" htmlFor="email">
                Email Address
              </label>
              <input
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#7978e9] focus:ring-2 focus:ring-[#7978e9]/10 outline-none text-sm transition-all duration-200"
                id="email"
                type="email"
                placeholder="admin@poojaev.com"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                className="px-6 py-3 bg-[#7978e9] hover:bg-[#4b49ac] text-white rounded-2xl text-xs font-bold shadow-md shadow-indigo-100 transition-all active:scale-[0.99]"
                type="submit"
              >
                Send Request
              </button>
              <Link
                className="text-xs font-bold text-[#7978e9] hover:text-[#4b49ac] transition-colors"
                to="/login"
              >
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
