import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashbordStats } from "../store/slices/adminSlice";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import {
  TrendingUp,
  Users,
  ShoppingBag,
  AlertTriangle,
  Calendar,
  DollarSign,
  Package,
  Truck,
  CheckCircle,
  XCircle
} from "lucide-react";

/**
 * Dashboard Component
 * Contains executive charts, sales reports counters, user registration analytics, and items list summaries.
 */
const Dashboard = () => {
  const dispatch = useDispatch();
  const stats = useSelector((state) => state.admin);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getDashbordStats());
  }, [dispatch]);

  const {
    loading,
    totalRevenueAllTime,
    todayRevenue,
    yesterdayRevenue,
    totalUsersCount,
    monthlySales,
    orderStatusCounts,
    topSellingProducts,
    lowStockProducts,
    revenueGrowth,
    newUsersThisMonth,
    currentMonthSales,
  } = stats;

  // Colors for Order status pie chart
  const COLORS = {
    Processing: "#7da0fa", // Sky Blue
    Shipped: "#a189f7",    // Lilac
    Delivered: "#7978e9",  // Purple/Indigo
    Cancelled: "#f3797e",  // Rose
  };

  const pieData = Object.entries(orderStatusCounts || {}).map(([key, value]) => ({
    name: key,
    value: Number(value || 0),
  })).filter(item => item.value > 0);

  const totalOrders = Object.values(orderStatusCounts || {}).reduce((a, b) => a + Number(b || 0), 0);

  return (
    <>
      <div className="w-full p-4 md:p-8">
        <div>

          {loading ? (
            <div className="py-32 flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 border-4 border-slate-205 border-t-[#7978e9] rounded-full animate-spin"></div>
              <p className="text-sm font-semibold text-slate-400">Loading dashboard report summary...</p>
            </div>
          ) : (
            <>
              {/* Upper Section: Welcome Banner and 4 Mini Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 relative z-10 animate-fade-in">
                {/* Welcome Card Widget */}
                <div className="lg:col-span-7 relative overflow-hidden bg-white rounded-3xl p-6 md:p-8 border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm min-h-[220px]">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#7978e9]/15 via-transparent to-transparent"></div>

                  <div className="relative z-10 flex-1 max-w-[95%] md:max-w-[65%]">
                    <p className="text-[10px] font-black text-[#7978e9] uppercase tracking-widest">Control Center</p>
                    <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight mt-1.5">
                      Welcome {user?.name || "Admin"}
                    </h1>
                    <p className="text-xs text-slate-500 font-semibold mt-3 leading-relaxed">
                      All systems are running smoothly! You have <span className="text-red-500 font-black">{lowStockProducts || 0} unread alerts!</span>
                    </p>

                    {/* Decorative floating widgets representing PoojaEV details */}
                    <div className="mt-5 flex items-center gap-2 text-[#7978e9] font-bold text-xs select-none">
                      <div className="flex -space-x-1.5">
                        <span className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-xs animate-bounce" style={{ animationDelay: '0.1s' }}>🛵</span>
                        <span className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-xs animate-bounce" style={{ animationDelay: '0.3s' }}>⚡</span>
                        <span className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-xs animate-bounce" style={{ animationDelay: '0.5s' }}>🔋</span>
                      </div>
                      <span className="ml-1.5 text-slate-400 font-extrabold uppercase tracking-wide text-[10px]">PoojaEV Status Monitor</span>
                    </div>
                  </div>

                  {/* Weather Widget */}
                  <div className="relative z-10 w-full md:w-auto bg-[#f8f9fa] border border-slate-200 rounded-2xl p-4 flex items-center gap-4 flex-shrink-0 justify-between md:justify-center md:flex-col text-center self-stretch md:self-auto shadow-sm">
                    <div className="flex items-center gap-2.5 md:flex-col">
                      <span className="text-3xl font-black text-[#7978e9] tracking-tighter">31°C</span>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider text-left md:text-center">Live Weather</p>
                        <p className="text-[11px] text-slate-700 font-black truncate">Bangalore, India</p>
                      </div>
                    </div>
                    <div className="w-10 h-10 bg-[#7978e9]/10 rounded-full flex items-center justify-center border border-[#7978e9]/20 text-lg animate-pulse hidden md:flex">
                      ☀️
                    </div>
                  </div>
                </div>

                {/* 4 Colored Metric Dashboard Cards */}
                <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                  {/* Card 1: Today's Bookings */}
                  <div className="bg-[#7978e9] text-white rounded-3xl p-5 shadow-lg flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 min-h-[105px]">
                    <div>
                      <p className="text-[9px] font-black text-indigo-100/90 uppercase tracking-wider">Today's Bookings</p>
                      <h4 className="text-lg font-black mt-1">₹{todayRevenue?.toLocaleString() || "0"}</h4>
                    </div>
                    <span className="text-[9px] text-indigo-100/80 font-bold">10.00% (30 days)</span>
                  </div>

                  {/* Card 2: Total Bookings */}
                  <div className="bg-[#4b49ac] text-white rounded-3xl p-5 shadow-lg flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 min-h-[105px]">
                    <div>
                      <p className="text-[9px] font-black text-indigo-100/90 uppercase tracking-wider">Total Bookings</p>
                      <h4 className="text-lg font-black mt-1">₹{totalRevenueAllTime?.toLocaleString() || "0"}</h4>
                    </div>
                    <span className="text-[9px] text-indigo-100/80 font-bold">22.00% (30 days)</span>
                  </div>

                  {/* Card 3: Meetings */}
                  <div className="bg-[#7da0fa] text-white rounded-3xl p-5 shadow-lg flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 min-h-[105px]">
                    <div>
                      <p className="text-[9px] font-black text-blue-50/90 uppercase tracking-wider">Total Customers</p>
                      <h4 className="text-lg font-black mt-1">{totalUsersCount || "0"}</h4>
                    </div>
                    <span className="text-[9px] text-blue-50/80 font-bold">2.00% (30 days)</span>
                  </div>

                  {/* Card 4: Clients count representation */}
                  <div className="bg-[#f3797e] text-white rounded-3xl p-5 shadow-lg flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 min-h-[105px]">
                    <div>
                      <p className="text-[9px] font-black text-red-50/90 uppercase tracking-wider">Monthly Sales</p>
                      <h4 className="text-lg font-black mt-1">₹{currentMonthSales?.toLocaleString() || "0"}</h4>
                    </div>
                    <span className="text-[9px] text-red-50/80 font-bold">0.22% (30 days)</span>
                  </div>
                </div>
              </div>

              {/* Data Visualization Row: Order Details vs Sales Report */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
                {/* Left Card: Order Details with statistics list & graph */}
                <div className="lg:col-span-8 bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-800">Order Details</h3>
                  <p className="text-xs text-slate-400 font-semibold mt-1 mb-6 leading-relaxed">
                    The total number of sessions within the date range. It is the period time a user is actively engaged with your website, page or app, etc
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 border-b border-slate-100 pb-5">
                    <div>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Order Value</p>
                      <p className="text-sm font-black text-slate-800 mt-1">₹{todayRevenue?.toLocaleString() || "0"}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Orders</p>
                      <p className="text-sm font-black text-slate-800 mt-1">{totalOrders}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Users Ratio</p>
                      <p className="text-sm font-black text-[#7978e9] mt-1">71.56%</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Downloads</p>
                      <p className="text-sm font-black text-slate-800 mt-1">34,040</p>
                    </div>
                  </div>

                  <div className="w-full h-64">
                    {monthlySales && monthlySales.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={monthlySales} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#7978e9" stopOpacity={0.2} />
                              <stop offset="95%" stopColor="#7978e9" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                          <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                          <Tooltip
                            contentStyle={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', color: '#1e293b' }}
                            labelStyle={{ fontWeight: 'bold' }}
                          />
                          <Area type="monotone" dataKey="totalsales" stroke="#7978e9" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSales)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex items-center justify-center text-slate-400 text-sm font-semibold">
                        No sales data recorded yet
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Card: Sales Report status pie chart */}
                <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between min-h-[400px]">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">Sales Report</h3>
                    <p className="text-xs text-slate-400 font-semibold mt-1 mb-4 leading-relaxed">
                      Fulfillment logs and active order tracking status distribution.
                    </p>

                    <div className="w-full h-48 relative flex items-center justify-center">
                      {pieData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              innerRadius={50}
                              outerRadius={70}
                              paddingAngle={4}
                              dataKey="value"
                            >
                              {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[entry.name] || "#e2e8f0"} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0', background: '#ffffff', color: '#1e293b' }} />
                          </PieChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="text-slate-400 text-xs font-semibold text-center">
                          No paid receipts available
                        </div>
                      )}

                      {totalOrders > 0 && (
                        <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none mt-[-5px]">
                          <span className="text-xl font-black text-slate-800">{totalOrders}</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Orders</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status Legend Indicators bar */}
                  <div className="grid grid-cols-2 gap-3 mt-4 border-t border-slate-100 pt-4">
                    {Object.entries(COLORS).map(([status, color]) => (
                      <div key={status} className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }}></span>
                        <div className="truncate">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{status}</p>
                          <p className="text-xs font-bold text-slate-600">{orderStatusCounts?.[status] || 0} unit(s)</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Best Sellers items lists */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-8 mx-4">
                <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded bg-[#7978e9]"></span>
                  Top 5 Selling Store Products
                </h3>

                {topSellingProducts && topSellingProducts.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[500px]">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                          <th className="pb-3 pl-2">Product Info</th>
                          <th className="pb-3">Category</th>
                          <th className="pb-3">Quality Score</th>
                          <th className="pb-3 pr-2 text-right">Items Sold</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                        {topSellingProducts.map((prod, index) => (
                          <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                            <td className="py-3 pl-2">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0 flex items-center justify-center">
                                  {prod.image ? (
                                    <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                                  ) : (
                                    <Package size={16} className="text-slate-400" />
                                  )}
                                </div>
                                <span className="font-bold text-slate-800 truncate max-w-[200px]" title={prod.name}>
                                  {prod.name}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 text-slate-500 font-medium">{prod.category}</td>
                            <td className="py-3 text-amber-500 font-bold text-xs">⭐ {prod.ratings || "No scores"}</td>
                            <td className="py-3 pr-2 text-right text-slate-800 font-black">{prod.total_sold} item(s)</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="py-10 text-center text-slate-400 text-sm font-semibold">
                    No sell records registered.
                  </div>
                )}
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
};

export default Dashboard;
