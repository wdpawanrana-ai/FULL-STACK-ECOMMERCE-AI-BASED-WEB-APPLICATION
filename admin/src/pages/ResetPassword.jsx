import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { resetPassword } from "../store/slices/authSlice";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(token, { password, confirmPassword }));
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#f5f7ff] px-4">
        <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
          {/* Top accent line */}
          <div className="absolute top-0 inset-x-0 h-2 bg-[#7978e9]"></div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Reset Password</h2>
            <p className="text-xs text-slate-400 font-semibold mt-1">
              Enter your new administrative password credentials below
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-450 uppercase tracking-widest" htmlFor="password">
                New Password
              </label>
              <input
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#7978e9] focus:ring-2 focus:ring-[#7978e9]/10 outline-none text-sm transition-all duration-200"
                id="password"
                type="password"
                placeholder="New Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-450 uppercase tracking-widest" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#7978e9] focus:ring-2 focus:ring-[#7978e9]/10 outline-none text-sm transition-all duration-200"
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                className="px-6 py-3 bg-[#7978e9] hover:bg-[#4b49ac] text-white rounded-2xl text-xs font-bold shadow-md shadow-indigo-100 transition-all active:scale-[0.99]"
                type="submit"
              >
                Reset Password
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

export default ResetPassword;
