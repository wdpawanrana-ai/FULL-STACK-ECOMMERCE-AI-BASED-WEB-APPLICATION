import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, deleteUser } from "../store/slices/adminSlice";
import { Trash2, ShieldAlert, User, Mail, Calendar, ChevronLeft, ChevronRight, Shield, ShoppingBag } from "lucide-react";
import avatarFallback from "../assets/avatar.jpg";

const Users = () => {
  const dispatch = useDispatch();
  const { users, totalUsers, loading } = useSelector((state) => state.admin);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });

  useEffect(() => {
    dispatch(fetchAllUsers(currentPage));
  }, [dispatch, currentPage]);

  const handleDelete = () => {
    dispatch(deleteUser(deleteConfirm.id, currentPage));
    setDeleteConfirm({ open: false, id: null });
  };

  const totalPages = Math.ceil((totalUsers || 0) / 10) || 1;

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <>
      <div className="w-full p-4 md:p-8">
        <div>

          {/* Upper Hero Section */}
          <div className="relative h-32 rounded-3xl bg-white overflow-hidden shadow-sm border border-slate-100 mb-8 animate-fade-in flex items-center px-6 md:px-8">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#7978e9]/15 via-transparent to-transparent"></div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">Active Customers</h1>
              <p className="text-xs text-slate-505 font-semibold mt-1">
                Manage registered store buyers, track registration history, and handle accounts
              </p>
            </div>
          </div>

          {/* Users List Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-8 relative z-10">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <span className="w-1.5 h-6 rounded bg-[#7978e9]"></span>
                User Directory
              </h3>
              <div className="px-3 py-1.5 text-xs font-black text-[#7978e9] bg-[#7978e9]/10 border border-[#7978e9]/20 rounded-full">
                Total Users: {totalUsers || 0}
              </div>
            </div>

            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-3">
                <div className="w-10 h-10 border-4 border-slate-200 border-t-[#7978e9] rounded-full animate-spin"></div>
                <p className="text-sm font-semibold text-slate-400">Fetching customer accounts...</p>
              </div>
            ) : !users || users.length === 0 ? (
              <div className="py-20 text-center text-slate-400">
                <p className="font-semibold">No registered users found</p>
                <p className="text-xs text-slate-400 mt-1">Check back later or register accounts in store frontend</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                        <th className="pb-3 pl-2">Client Details</th>
                        <th className="pb-3">Email Address</th>
                        <th className="pb-3">Role</th>
                        <th className="pb-3">Registered On</th>
                        <th className="pb-3 pr-2 text-right">Delete Account</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                      {users.map((client) => (
                        <tr key={client.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 pl-2">
                            <div className="flex items-center gap-3">
                              <img
                                src={client.avatar?.url || avatarFallback}
                                alt={client.name}
                                className="w-9 h-9 rounded-full object-cover border border-slate-200 ring-2 ring-white shadow-sm"
                              />
                              <div className="flex flex-col">
                                <span className="font-bold text-slate-800">{client.name}</span>
                                <span className="text-[9px] text-slate-400 font-mono select-all">{client.id}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4">
                            <span className="text-slate-605 font-bold flex items-center gap-2">
                              <Mail size={14} className="text-slate-400" />
                              {client.email}
                            </span>
                          </td>
                          <td className="py-4">
                            <span className="px-2.5 py-1 text-xs font-black rounded-full bg-[#7978e9]/10 text-[#7978e9] border border-[#7978e9]/20 flex items-center gap-1.5 w-max">
                              <Shield size={11} className="stroke-[2.5]" />
                              {client.role || "User"}
                            </span>
                          </td>
                          <td className="py-4 text-slate-500 font-medium">
                            <span className="flex items-center gap-1.5 text-xs">
                              <Calendar size={13} className="text-slate-400" />
                              {new Date(client.created_at).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </td>
                          <td className="py-4 pr-2 text-right">
                            <button
                              onClick={() => setDeleteConfirm({ open: true, id: client.id })}
                              className="p-2 text-slate-450 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                              title="Delete User"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination footer bar */}
                {totalPages > 1 && (
                  <div className="flex justify-between items-center pt-6 mt-6 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-400">
                      Page {currentPage} of {totalPages}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-500 transition-colors disabled:opacity-40 disabled:pointer-events-none"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-550 transition-colors disabled:opacity-40 disabled:pointer-events-none"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Delete User Modal */}
      {deleteConfirm.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-xl border border-slate-150 flex flex-col items-center text-center">
            <div className="p-3.5 rounded-full bg-red-50 text-red-550 mb-4 animate-bounce">
              <ShieldAlert size={28} />
            </div>
            <h4 className="text-lg font-black text-slate-800 mb-2">Delete Client Account?</h4>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              This action is destructive and permanent. The user's account details and profile information will be wiped.
            </p>
            <div className="flex gap-4 w-full">
              <button
                onClick={() => setDeleteConfirm({ open: false, id: null })}
                className="flex-1 py-3 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-2xl text-sm font-semibold transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-3 bg-red-550 hover:bg-red-600 text-white rounded-2xl text-sm font-black shadow-md shadow-red-200/50 border border-red-500/20 transition-all duration-200"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
