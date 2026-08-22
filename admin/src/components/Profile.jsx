import React, { useState, useEffect } from "react";
import avatarFallback from "../assets/avatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import { updateAdminPassword, updateAdminProfile } from "../store/slices/authSlice";
import { User, Mail, Shield, Lock, Eye, EyeOff, Camera } from "lucide-react";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const [editData, setEditData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [avatar, setAvatar] = useState(null);
  const [passwardData, setPasswardData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setEditData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  const handleProfileChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswardData({
      ...passwardData,
      [e.target.name]: e.target.value,
    });
  };

  const dispatch = useDispatch();

  const updateProfile = () => {
    const formData = new FormData();
    formData.append("name", editData.name);
    formData.append("email", editData.email);
    if (avatar) {
      formData.append("avatar", avatar);
    }
    dispatch(updateAdminProfile(formData));
  };

  const updatePassword = () => {
    const formData = new FormData();
    formData.append("currentPassword", passwardData.currentPassword);
    formData.append("newPassword", passwardData.newPassword);
    formData.append("confirmNewPassword", passwardData.confirmPassword);
    dispatch(updateAdminPassword(formData));
  };

  return (
    <>
      <div className="w-full p-4 md:p-8">
        <div>

          {/* Upper Hero Section */}
          <div className="mb-8 animate-fade-in">
            <div className="relative h-32 rounded-3xl bg-white overflow-hidden shadow-sm border border-slate-100 mb-8 animate-fade-in flex items-center px-6 md:px-8">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#7978e9]/15 via-transparent to-transparent"></div>
              <div>
                <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">Admin Profile</h1>
                <p className="text-xs md:text-sm text-slate-505 font-semibold mt-1">
                  Manage your administrator account credentials and personal details
                </p>
              </div>
            </div>

            {/* Profile Card & Forms Grid */}
            <div className="mt-0 grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Left Column: Profile Card */}
              <div className="lg:col-span-1 flex flex-col gap-6 relative z-10">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#7978e9] to-[#7da0fa]"></div>

                  {/* Avatar with ring */}
                  <div className="relative mt-4 mb-4 select-none">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#7978e9] to-[#7da0fa] scale-105 blur-sm opacity-25 group-hover:opacity-45 transition-opacity"></div>
                    <div className="relative w-32 h-32 rounded-full p-1 bg-white ring-4 ring-[#7978e9]/10">
                      <img
                        src={user?.avatar?.url || avatarFallback}
                        alt={user?.name || "Admin"}
                        className="w-full h-full rounded-full object-cover border border-slate-205 shadow-inner"
                      />
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-slate-800 tracking-tight truncate w-full p-1">{user?.name}</h2>
                  <span className="mt-1 px-3 py-1 text-xs font-black rounded-full bg-[#7978e9]/10 text-[#7978e9] border border-[#7978e9]/20 flex items-center gap-1.5 justify-center">
                    <Shield size={12} className="stroke-[2.5]" />
                    {user?.role || "Admin"}
                  </span>

                  <div className="w-full border-t border-slate-100 my-5"></div>

                  {/* Profile Details List */}
                  <div className="w-full flex flex-col gap-4 text-left">
                    <div className="flex items-center gap-3 w-full min-w-0">
                      <div className="p-2.5 rounded-xl bg-[#7978e9]/10 text-[#7978e9] border border-[#7978e9]/20 flex-shrink-0">
                        <User size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Full Name</p>
                        <p className="text-sm font-semibold text-slate-700 truncate">{user?.name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full min-w-0">
                      <div className="p-2.5 rounded-xl bg-[#7978e9]/10 text-[#7978e9] border border-[#7978e9]/20 flex-shrink-0">
                        <Mail size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Email Address</p>
                        <p className="text-sm font-semibold text-slate-700 truncate break-all">{user?.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Update Forms */}
              <div className="lg:col-span-2 flex flex-col gap-8 relative z-10">

                {/* Form 1: Update Profile Details */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 rounded bg-[#7978e9]"></span>
                    Personal Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Name</label>
                      <div className="relative">
                        <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          name="name"
                          value={editData.name}
                          onChange={handleProfileChange}
                          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-205 bg-slate-50 focus:border-[#7978e9] focus:ring-2 focus:ring-[#7978e9]/10 outline-none text-sm text-slate-800 transition-all duration-200 placeholder-slate-400 font-semibold"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    {/* Email field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="email"
                          name="email"
                          value={editData.email}
                          onChange={handleProfileChange}
                          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-205 bg-slate-50 focus:border-[#7978e9] focus:ring-2 focus:ring-[#7978e9]/10 outline-none text-sm text-slate-800 transition-all duration-200 placeholder-slate-400 font-semibold"
                          placeholder="admin@example.com"
                        />
                      </div>
                    </div>

                    {/* Avatar Upload field */}
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-[10px] font-bold text-slate-405 uppercase tracking-wider">Update Avatar</label>
                      <label className="flex items-center justify-center border-2 border-dashed border-slate-200 hover:border-[#7978e9]/60 rounded-2xl p-4 cursor-pointer hover:bg-slate-50 transition-all duration-200 group">
                        <div className="flex items-center gap-3 w-full min-w-0 justify-center">
                          <div className="p-2.5 rounded-xl bg-slate-50 group-hover:bg-[#7978e9]/10 text-slate-400 group-hover:text-[#7978e9] transition-colors flex-shrink-0">
                            <Camera size={18} />
                          </div>
                          <span className="text-sm font-semibold text-slate-500 group-hover:text-[#7978e9] transition-colors truncate">
                            {avatar ? avatar.name : "Select raw avatar image..."}
                          </span>
                        </div>
                        <input
                          type="file"
                          name="avatar"
                          onChange={handleAvatarChange}
                          className="hidden"
                          accept="image/*"
                        />
                      </label>
                    </div>

                    <div className="md:col-span-2 flex justify-end mt-2">
                      <button
                        onClick={updateProfile}
                        disabled={loading}
                        className="px-6 py-3 bg-[#7978e9] hover:bg-[#4b49ac] text-white rounded-2xl font-black text-sm shadow-md shadow-indigo-100/50 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none"
                      >
                        {loading ? "Updating..." : "Save Profile Details"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Form 2: Update Password */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 rounded bg-[#4b49ac]"></span>
                    Secured Password Management
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Current Password */}
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Password</label>
                      <div className="relative">
                        <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          name="currentPassword"
                          value={passwardData.currentPassword}
                          onChange={handlePasswordChange}
                          className="w-full pl-11 pr-12 py-3 rounded-2xl border border-slate-205 bg-slate-50 focus:border-[#4b49ac] focus:ring-2 focus:ring-[#4b49ac]/10 outline-none text-sm text-slate-800 transition-all duration-200 placeholder-slate-400 font-semibold"
                          placeholder="Current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#4b49ac] transition-colors"
                        >
                          {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    {/* New Password */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">New Password</label>
                      <div className="relative">
                        <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type={showNewPassword ? "text" : "password"}
                          name="newPassword"
                          value={passwardData.newPassword}
                          onChange={handlePasswordChange}
                          className="w-full pl-11 pr-12 py-3 rounded-2xl border border-slate-205 bg-slate-50 focus:border-[#4b49ac] focus:ring-2 focus:ring-[#4b49ac]/10 outline-none text-sm text-slate-800 transition-all duration-200 placeholder-slate-400 font-semibold"
                          placeholder="At least 8 characters"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#4b49ac] transition-colors"
                        >
                          {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Confirm New Password</label>
                      <div className="relative">
                        <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={passwardData.confirmPassword}
                          onChange={handlePasswordChange}
                          className="w-full pl-11 pr-12 py-3 rounded-2xl border border-slate-205 bg-slate-50 focus:border-[#4b49ac] focus:ring-2 focus:ring-[#4b49ac]/10 outline-none text-sm text-slate-800 transition-all duration-200 placeholder-slate-400 font-semibold"
                          placeholder="Confirm password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#4b49ac] transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-2 flex justify-end mt-2">
                      <button
                        onClick={updatePassword}
                        disabled={loading}
                        className="px-6 py-3 bg-[#4b49ac] hover:bg-[#3f3d91] text-white rounded-2xl font-black text-sm shadow-md shadow-indigo-100/50 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none"
                      >
                        {loading ? "Updating..." : "Update Security Password"}
                      </button>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
