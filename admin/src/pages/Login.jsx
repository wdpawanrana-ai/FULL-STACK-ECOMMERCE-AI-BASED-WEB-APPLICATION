import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { login } from "../store/slices/authSlice";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  if (isAuthenticated) {
    return <Navigate to="/" />
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", formData.email);
    data.append("password", formData.password);
    dispatch(login(data));
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#f5f7ff] px-4">
        <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
          {/* Top accent line */}
          <div className="absolute top-0 inset-x-0 h-2 bg-[#7978e9]"></div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">PoojaEV Admin</h2>
            <p className="text-xs text-slate-400 font-semibold mt-1">
              Sign in to manage system controls and customer settings
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
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
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-450 uppercase tracking-widest" htmlFor="password">
                Password
              </label>
              <input
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#7978e9] focus:ring-2 focus:ring-[#7978e9]/10 outline-none text-sm transition-all duration-200"
                id="password"
                type="password"
                placeholder="••••••••"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                className="px-6 py-3 bg-[#7978e9] hover:bg-[#4b49ac] text-white rounded-2xl text-xs font-bold shadow-md shadow-indigo-100 transition-all active:scale-[0.99]"
                type="submit"
              >
                Sign In
              </button>
              <Link
                className="text-xs font-bold text-[#7978e9] hover:text-[#4b49ac] transition-colors"
                to="/password/forgot"
              >
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
