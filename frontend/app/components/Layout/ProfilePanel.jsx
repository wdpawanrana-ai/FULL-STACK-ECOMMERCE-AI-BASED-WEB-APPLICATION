
"use client"

import { useEffect, useState } from "react";
import { X, LogOut, Upload, Eye, EyeOff, User, Mail, Phone, Lock, Camera, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout, updateProfile, updatePassword } from "@/app/store/slices/authSlice";
import { toggleAuthPopup } from "@/app/store/slices/popupSlice";

const ProfilePanel = () => {
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  const { isAuthPopupOpen } = useSelector((state) => state.popup);
  const { authUser, isUpdatingProfile, isUpdatingPassword } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (authUser) {
      setName(authUser.name || "");
      setEmail(authUser.email || "");
      setPhone(authUser.phone || "");
      setAvatarPreview(authUser.avatar?.url || null);
    }
  }, [authUser]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    if (avatar) {
      formData.append("avatar", avatar);
    }
    dispatch(updateProfile(formData));
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      return toast.error("Passwords do not match");
    }
    dispatch(updatePassword({ currentPassword, newPassword, confirmNewPassword }));
  };

  if (!mounted || !isAuthPopupOpen || !authUser) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-md z-40 transition-opacity duration-300"
        onClick={() => dispatch(toggleAuthPopup())}
      />

      {/* Profile Panel */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-background border-l border-border z-50 shadow-2xl animate-slide-in-right overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">User Profile</h2>
          </div>
          <button
            className="p-3 rounded-full hover:bg-secondary text-foreground/60 hover:text-foreground transition-all active:scale-95"
            onClick={() => dispatch(toggleAuthPopup())}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">

          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative group">
              <div className="w-28 h-28 rounded-2xl overflow-hidden bg-secondary border-4 border-background ring-1 ring-border shadow-xl">
                <img
                  src={avatarPreview || "/placeholder-avatar.jpg"}
                  alt={name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                />
              </div>
              <label
                htmlFor="avatar-upload"
                className="absolute -bottom-2 -right-2 p-2.5 bg-primary text-white rounded-xl shadow-lg cursor-pointer hover:scale-110 active:scale-95 transition-all"
              >
                <Camera size={18} />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-foreground">{name}</h3>
              <p className="text-sm text-foreground/60">{email}</p>
            </div>
          </div>

          {/* Profile Form */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-1 w-1 rounded-full bg-primary" />
              <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/40">Personal Information</h4>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground/70 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-secondary/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground/70 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-secondary/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isUpdatingProfile}
                className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:translate-y-0 transition-all text-sm flex items-center justify-center gap-2"
              >
                {isUpdatingProfile ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Profile Changes"}
              </button>
            </form>
          </div>

          {/* Password Form */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-1 w-1 rounded-full bg-primary" />
              <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/40">Security</h4>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground/70 ml-1">Current Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-secondary/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-foreground/70 ml-1">New Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-foreground/70 ml-1">Confirm New Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isUpdatingPassword}
                className="w-full py-4 bg-foreground text-background font-bold rounded-2xl hover:bg-foreground/90 transition-all text-sm flex items-center justify-center gap-2"
              >
                {isUpdatingPassword ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update Password"}
              </button>
            </form>
          </div>

          {/* Logout Section */}
          <div className="pt-6">
            <button
              onClick={handleLogout}
              className="w-full py-4 border-2 border-red-500/20 text-red-500 font-bold rounded-2xl hover:bg-red-500/5 transition-all text-sm flex items-center justify-center gap-3 group"
            >
              <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Sign Out from Account
            </button>
          </div>
        </div>

        {/* Footer Credit */}
        <div className="p-6 bg-secondary/10 border-t border-border">
          <p className="text-[10px] text-foreground/30 text-center uppercase tracking-[0.2em]">
            PoojaEV Account Security
          </p>
        </div>
      </div>
    </>
  );
};

export default ProfilePanel;
