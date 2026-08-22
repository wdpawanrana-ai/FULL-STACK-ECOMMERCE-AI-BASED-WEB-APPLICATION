"use client";

import { useState, useEffect } from "react";
import { Filter, Package, Truck, CheckCircle, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchMyOrders } from "../store/slices/orderSlice";

/**
 * Orders module list.
 * Displays transactional history, delivery tracking states, invoice details and active status filtration.
 */
const Orders = () => {
    const router = useRouter();
    const [statusFilter, setStatusFilter] = useState("All");
    const [openOrders, setOpenOrders] = useState([]);
    const { myOrders = [], fetchingOrders } = useSelector((state) => state.order);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMyOrders());
    }, [dispatch]);

    // Safety guard to filter loaded orders by active status tag
    const filterOrders = (myOrders || []).filter(
        (order) => statusFilter.toLowerCase() === "all" || order.status === statusFilter
    );

    // Toggles the collapse overlay tracking detail views for a single purchase Order ID
    const toggleOrder = (orderId) => {
        setOpenOrders((prev) =>
            prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
        );
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "Processing":
                return <Package className="text-yellow-500 w-5 h-5" />;
            case "Shipped":
                return <Truck className="text-blue-500 w-5 h-5" />;
            case "Delivered":
                return <CheckCircle className="text-green-500 w-5 h-5" />;
            case "Cancelled":
                return <XCircle className="text-red-500 w-5 h-5" />;
            default:
                return <Package className="text-gray-500 w-5 h-5" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Processing":
                return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20";
            case "Shipped":
                return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20";
            case "Delivered":
                return "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20";
            case "Cancelled":
                return "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20";
            default:
                return "bg-secondary text-foreground/50 border border-border";
        }
    };

    const { authUser } = useSelector(state => state.auth);
    if (!authUser) {
        if (typeof window !== "undefined") {
            router.push("/products");
        }
        return null;
    }

    return (
        <div className="min-h-screen pt-32 pb-24 bg-background">
            <div className="container mx-auto max-w-5xl px-6">

                {/* Header Information */}
                <div className="mb-12">
                    <h1 className="text-3xl md:text-5xl font-black text-foreground mb-3">
                        My Orders
                    </h1>
                    <p className="text-base text-foreground/50 font-medium">
                        Track shipping milestones, review invoices, and manage scooter spares history.
                    </p>
                </div>

                {/* Status Filtrations Grid */}
                <div className="bg-secondary/35 border border-border/40 p-5 rounded-3xl mb-8">
                    <div className="flex items-center space-x-3 flex-wrap gap-y-3">
                        <div className="flex items-center space-x-2 mr-4">
                            <Filter size={18} className="text-primary animate-pulse" />
                            <span className="font-bold text-sm tracking-wide text-foreground uppercase">Filter Orders:</span>
                        </div>
                        {["All", "Processing", "Shipped", "Delivered", "Cancelled"].map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${statusFilter === status
                                        ? "bg-primary text-white shadow-md shadow-primary/20"
                                        : "bg-background text-foreground/60 border border-border/40 hover:bg-secondary/40"
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Transactions History List */}
                <div className="space-y-6">
                    {fetchingOrders ? (
                        <div className="py-20 text-center">
                            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                            <p className="text-foreground/45 text-sm uppercase tracking-wider font-bold">Syncing order history...</p>
                        </div>
                    ) : filterOrders.length === 0 ? (
                        <div className="bg-secondary/20 border border-border/45 rounded-3xl p-12 text-center">
                            <Package size={54} className="text-foreground/20 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-foreground mb-2">No transaction records</h3>
                            <p className="text-sm text-foreground/50 max-w-sm mx-auto mb-6">
                                {statusFilter === "All"
                                    ? "Your garage is empty. You haven't made any purchases yet."
                                    : `There are currently no orders flagged as ${statusFilter.toLowerCase()}.`}
                            </p>
                            <button
                                onClick={() => router.push("/products")}
                                className="px-6 py-3.5 bg-primary hover:bg-primary/95 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                            >
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        filterOrders.map((order) => (
                            <div key={order.id} className="bg-background border border-border/50 rounded-3xl p-6 md:p-8 hover:border-primary/20 transition-all duration-300 shadow-sm">

                                {/* Info Panel Header */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/40 mb-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-secondary/50 rounded-2xl flex items-center justify-center flex-shrink-0">
                                            {getStatusIcon(order.status)}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-foreground">Order ID: #{order.id}</h3>
                                            <p className="text-xs text-foreground/45 font-semibold uppercase tracking-wider mt-0.5">
                                                Placed on: {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric"
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </div>

                                {/* Items Container */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                                    {order?.order_items?.map((item) => (
                                        <div key={item.product_id} className="flex items-center space-x-4">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-14 h-14 rounded-2xl object-cover border border-border/30 bg-secondary/20"
                                            />
                                            <div>
                                                <h4 className="text-sm font-bold text-foreground line-clamp-1">{item.title}</h4>
                                                <p className="text-xs text-foreground/50 mt-1 font-semibold">
                                                    Qty: {item.quantity}  •  ₹{item.price?.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Actions & Totals Area */}
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border/40">
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm text-foreground/60 font-semibold uppercase">
                                            Grand Total: <span className="text-lg font-black text-foreground">₹{order.totalAmount?.toLocaleString()}</span>
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3 w-full sm:w-auto">
                                        <button
                                            onClick={() => toggleOrder(order.id)}
                                            className="px-5 py-3 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 flex items-center gap-2 border border-border/30"
                                        >
                                            <span>Details</span>
                                            {openOrders.includes(order.id) ? (
                                                <ChevronUp size={14} />
                                            ) : (
                                                <ChevronDown size={14} />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* In-Depth Collapsed Shipping & Payment Information */}
                                {openOrders.includes(order.id) && (
                                    <div className="mt-6 border-t border-border/45 pt-6 animate-slide-in-bottom">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-secondary/20 p-6 rounded-2xl border border-border/30">
                                            <div>
                                                <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Shipping Address</h4>
                                                <p className="text-sm text-foreground/75 leading-relaxed font-semibold">
                                                    {order.shippingAddress?.addressLine1}
                                                    {order.shippingAddress?.addressLine2 && <><br />{order.shippingAddress.addressLine2}</>}
                                                    <br />
                                                    {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}
                                                    <br />
                                                    {order.shippingAddress?.country}
                                                </p>
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Billing & Payment</h4>
                                                <p className="text-sm text-foreground/75 leading-relaxed font-semibold">
                                                    Method: <span className="text-foreground uppercase text-xs font-black">{order.paymentMethod || "Stripe Checkout"}</span>
                                                    <br />
                                                    Payment: <span className="text-foreground uppercase text-xs font-black">{order.paymentStatus || "Succeeded"}</span>
                                                    {order.transactionId && (
                                                        <><br />Transaction ID: <span className="font-mono text-xs">{order.transactionId}</span></>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Orders;