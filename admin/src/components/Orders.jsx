import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders, updateOrderStatus, deleteOrder } from "../store/slices/orderSlice";
import { Trash2, ShieldAlert, ShoppingBag, Calendar, User, Phone, MapPin, Loader2, Check } from "lucide-react";

/**
 * Orders Component
 * Renders the dashboard orders grid, status filters, deletion triggers, and a detailed sliding drawer view.
 */
const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);

  const [filterByStatus, setFilterByStatus] = useState("All");
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, status: newStatus }));
  };

  const confirmDelete = () => {
    dispatch(deleteOrder(deleteConfirm.id));
    setDeleteConfirm({ open: false, id: null });
  };

  const filteredOrders =
    filterByStatus === "All"
      ? orders
      : orders?.filter((order) => order.order_status === filterByStatus);

  // Status badge styling helper
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Processing":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Shipped":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "Delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Cancelled":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  // Stats calculation
  const totalRevenue = orders?.reduce((acc, order) => acc + Number(order.total_price), 0) || 0;
  const processingCount = orders?.filter((o) => o.order_status === "Processing").length || 0;
  const deliveredCount = orders?.filter((o) => o.order_status === "Delivered").length || 0;

  return (
    <>
      <div className="w-full p-4 md:p-8">
        <div>

          {/* Upper Hero Banner */}
          <div className="relative h-32 rounded-3xl bg-white overflow-hidden shadow-sm border border-slate-100 mb-8 animate-fade-in flex items-center px-6 md:px-8">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#7978e9]/15 via-transparent to-transparent"></div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">Manage Orders</h1>
              <p className="text-xs md:text-sm text-slate-505 font-semibold mt-1">
                Track and fulfill customer sales receipts and update shipping status
              </p>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 relative z-10">
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 hover:border-[#7978e9]/30 transition-all duration-300 hover:scale-[1.02]">
              <div className="p-3.5 rounded-2xl bg-blue-50 text-blue-500 border border-blue-100">
                <ShoppingBag size={22} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Total Sales</p>
                <p className="text-xl font-black text-slate-850">₹{totalRevenue.toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 hover:border-amber-500/30 transition-all duration-300 hover:scale-[1.02]">
              <div className="p-3.5 rounded-2xl bg-amber-50 text-amber-650 border border-amber-100">
                <Loader2 size={22} className="animate-spin" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Processing</p>
                <p className="text-xl font-black text-slate-850">{processingCount} orders</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 hover:border-emerald-500/30 transition-all duration-300 hover:scale-[1.02]">
              <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                <Check size={22} className="stroke-[3]" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Delivered</p>
                <p className="text-xl font-black text-slate-850">{deliveredCount} items</p>
              </div>
            </div>
          </div>

          {/* Table Container Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <span className="w-1.5 h-6 rounded bg-[#7978e9]"></span>
                Purchase Orders
              </h3>

              {/* Status Filter buttons */}
              <div className="flex flex-wrap gap-2">
                {["All", "Processing", "Shipped", "Delivered", "Cancelled"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterByStatus(status)}
                    className={`px-4 py-1.5 rounded-2xl text-xs font-black border transition-all duration-200 ${filterByStatus === status
                      ? "bg-[#7978e9] text-white border-transparent shadow shadow-indigo-100"
                      : "bg-[#f8f9fa] text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-3">
                <div className="w-10 h-10 border-4 border-slate-200 border-t-[#7978e9] rounded-full animate-spin"></div>
                <p className="text-sm font-semibold text-slate-400">Loading orders data...</p>
              </div>
            ) : filteredOrders?.length === 0 ? (
              <div className="py-20 text-center text-slate-400">
                <p className="font-semibold mb-2">No orders found matching status</p>
                <span className="text-xs text-slate-400">Status: {filterByStatus}</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                      <th className="pb-3 pl-2">Ordered Date / ID</th>
                      <th className="pb-3">Buyer details</th>
                      <th className="pb-3">Items details</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Order status</th>
                      <th className="pb-3 pr-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                    {filteredOrders?.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 pl-2">
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                              <Calendar size={13} className="text-slate-400" />
                              {new Date(order.created_at).toLocaleDateString()}
                            </span>
                            <span className="text-[9px] text-slate-400 font-mono mt-0.5 truncate max-w-[120px]" title={order.id}>
                              {order.id}
                            </span>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-800">{order.shipping_info?.full_name}</span>
                            <span className="text-xs text-slate-500">{order.shipping_info?.phone}</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2 max-w-[200px]">
                            <div className="flex -space-x-2.5 overflow-hidden">
                              {order.order_items?.slice(0, 3).map((item, idx) => (
                                <img
                                  key={idx}
                                  src={item.image}
                                  alt={item.title}
                                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover border border-slate-100"
                                />
                              ))}
                              {order.order_items?.length > 3 && (
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-[9px] font-black text-slate-500 ring-2 ring-white border border-slate-200">
                                  +{order.order_items.length - 3}
                                </div>
                              )}
                            </div>
                            <span className="text-xs text-slate-505 truncate font-semibold">
                              {order.order_items?.[0]?.title}
                              {order.order_items?.length > 1 && " and more..."}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 font-black text-slate-800">₹{Number(order.total_price).toLocaleString()}</td>
                        <td className="py-4">
                          <select
                            value={order.order_status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className="bg-slate-50 text-slate-700 border border-slate-205 px-3 py-1.5 rounded-full text-xs font-black outline-none cursor-pointer hover:bg-slate-100 transition-colors"
                          >
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="py-4 pr-2 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedOrderDetails(order)}
                              className="px-2.5 py-1 text-slate-500 hover:text-[#7978e9] hover:bg-[#7978e9]/10 rounded-xl transition-all"
                              title="View Details"
                            >
                              <span className="text-xs font-black">Details</span>
                            </button>
                            <button
                              onClick={() => setDeleteConfirm({ open: true, id: order.id })}
                              className="p-2 text-slate-450 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                              title="Delete Order"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-xl border border-slate-150 flex flex-col items-center text-center">
            <div className="p-3.5 rounded-full bg-red-50 text-red-500 mb-4 animate-bounce">
              <ShieldAlert size={28} />
            </div>
            <h4 className="text-lg font-black text-slate-800 mb-2">Delete Receipt Record?</h4>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              This action is destructive and irreversible. The order database entry will be permanently deleted.
            </p>
            <div className="flex gap-4 w-full">
              <button
                onClick={() => setDeleteConfirm({ open: false, id: null })}
                className="flex-1 py-3 border border-slate-205 hover:bg-slate-55 text-slate-500 rounded-2xl text-sm font-semibold transition-all duration-200"
              >
                Go Back
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-3 bg-red-550 hover:bg-red-600 text-white rounded-2xl text-sm font-black shadow-md shadow-red-200/50 border border-red-500/20 transition-all duration-205"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Details Drawer */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white h-full w-full max-w-md p-6 flex flex-col justify-between shadow-xl border-l border-slate-100 relative animate-slide-in overflow-y-auto">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h4 className="text-lg font-black text-slate-800">Order Details</h4>
                  <span className="text-[10px] text-slate-400 font-mono truncate">{selectedOrderDetails.id}</span>
                </div>
                <button
                  onClick={() => setSelectedOrderDetails(null)}
                  className="p-1 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-700 text-xl font-bold transition-colors"
                >
                  &times;
                </button>
              </div>

              {/* Shipping Information Section */}
              <div className="my-6 space-y-4">
                <h5 className="text-[10px] font-black text-slate-405 uppercase tracking-widest">Shipping Details</h5>
                <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <User size={16} className="text-slate-400" />
                    <span className="text-sm font-bold text-slate-750">{selectedOrderDetails.shipping_info?.full_name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-slate-400" />
                    <span className="text-sm text-slate-600">{selectedOrderDetails.shipping_info?.phone}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-slate-400 mt-0.5" />
                    <span className="text-sm text-slate-606 leading-relaxed font-semibold">
                      {selectedOrderDetails.shipping_info?.address}, {selectedOrderDetails.shipping_info?.city}, {selectedOrderDetails.shipping_info?.state}, {selectedOrderDetails.shipping_info?.country} - {selectedOrderDetails.shipping_info?.pincode}
                    </span>
                  </div>
                </div>
              </div>

              {/* Items Ordered */}
              <div className="space-y-4">
                <h5 className="text-[10px] font-black text-slate-405 uppercase tracking-widest">Items Ordered</h5>
                <div className="divide-y divide-slate-100 max-h-[250px] overflow-y-auto pr-1">
                  {selectedOrderDetails.order_items?.map((item, idx) => (
                    <div key={idx} className="py-3 flex gap-3 items-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-10 w-10 rounded-xl object-cover border border-slate-150 bg-slate-50"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-800 truncate">{item.title}</p>
                        <p className="text-xs text-slate-400 font-semibold font-mono">
                          {item.quantity} x ₹{Number(item.price).toLocaleString()}
                        </p>
                      </div>
                      <span className="text-sm font-black text-slate-800">
                        ₹{(item.quantity * Number(item.price)).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sum-up Footer */}
            <div className="pt-4 border-t border-slate-105 mt-6 space-y-4">
              <div className="flex justify-between items-center text-sm font-bold text-slate-450">
                <span>Shipping cost:</span>
                <span className="text-slate-650">₹{selectedOrderDetails.shipping_price}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold text-slate-450">
                <span>Tax index:</span>
                <span className="text-slate-650">{(selectedOrderDetails.tax_price * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between items-center text-base font-black text-slate-800">
                <span>Total Charge:</span>
                <span className="text-emerald-600">₹{Number(selectedOrderDetails.total_price).toLocaleString()}</span>
              </div>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="w-full py-3 bg-[#7978e9] hover:bg-[#4b49ac] text-white rounded-2xl text-sm font-black transition-colors duration-200 mt-2"
              >
                Close Drawer View
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Orders;
