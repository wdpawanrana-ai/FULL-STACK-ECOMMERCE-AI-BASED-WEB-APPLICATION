"use client"
import { useState, useEffect } from 'react';
import { Filter, Package, Truck, CheckCircle, XCircle, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { fetchMyOrders } from '../store/slices/orderSlice';
const Orders = () => {
    const router = useRouter();
    const [statusFilter, setStatusFilter] = useState("All");
    const [openOrders, setOpenOrders] = useState([]);
    const { myOrders, fetchingOrders } = useSelector((state) => state.order);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchMyOrders());
    }, [dispatch])

    const filterOrders = myOrders.filter((order) => statusFilter === "all" || order.status === statusFilter);

    const getStatusIcon = (status) => {
        switch (status) {
            case "Processing":
                return <Package className="text-yellow-500" />;
            case "Shipped":
                return <Truck className="text-blue-500" />;
            case "Delivered":
                return <CheckCircle className="text-green-500" />;
            case "Cancelled":
                return <XCircle className="text-red-500" />;
            default:
                return <Package className="text-gray-500" />;
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "Processing":
                return "text-yellow-500";
            case "Shipped":
                return "text-blue-500";
            case "Delivered":
                return "text-green-500";
            case "Cancelled":
                return "text-red-500";
            default:
                return "text-gray-500";
        }
    }

    const { authUser } = useSelector(state => state.auth);
    if (!authUser) {
        router.push("/products");
        return null;
    }

    return <>
        <div className="min-h-screen pt-20">
            <div className="container mx-auto px- py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        My Orders
                    </h1>
                    <p className="text-muted-foreground mb-8">
                        Track and manage your orders history.  </p>
                </div>
                {/* Status Filter */}
                <div className="glass-card p-4 mb-8">
                    <div className="flex items-center space-x-4 flex-wrap">
                        <div className="flex items-center space-x-2">
                            <Filter size={20} className="text-primary" />
                            <span className="font-bold text-foreground">Filter by Status:</span>
                        </div>
                        <button
                            onClick={() => setStatusFilter("All")}
                            className={`px-4 py-2 rounded-lg transition-colors ${statusFilter === "All" ? "bg-primary text-white" : "bg-secondary text-foreground"}`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setStatusFilter("Processing")}
                            className={`px-4 py-2 rounded-lg transition-colors ${statusFilter === "Processing" ? "bg-primary text-white" : "bg-secondary text-foreground"}`}
                        >
                            Processing
                        </button>
                        <button
                            onClick={() => setStatusFilter("Shipped")}
                            className={`px-4 py-2 rounded-lg transition-colors ${statusFilter === "Shipped" ? "bg-primary text-white" : "bg-secondary text-foreground"}`}
                        >
                            Shipped
                        </button>
                        <button
                            onClick={() => setStatusFilter("Delivered")}
                            className={`px-4 py-2 rounded-lg transition-colors ${statusFilter === "Delivered" ? "bg-primary text-white" : "bg-secondary text-foreground"}`}
                        >
                            Delivered
                        </button>
                        <button
                            onClick={() => setStatusFilter("Cancelled")}
                            className={`px-4 py-2 rounded-lg transition-colors ${statusFilter === "Cancelled" ? "bg-primary text-white" : "bg-secondary text-foreground"}`}
                        >
                            Cancelled
                        </button>
                    </div>
                </div>

                {/*   List */}
                <div className="space-y-6">
                    {filterOrders.length === 0 ? (
                        <div className="glass-card p-8 text-center">
                            <Package size={48} className="text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-foreground mb-2">No orders found</h3>
                            <p className="text-muted-foreground mb-6">{statusFilter === "All" ? "You haven't placed any orders yet." : `No ${statusFilter.toLowerCase()} orders found.`}</p>
                            <button
                                onClick={() => router.push("/products")}
                                className="px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        filterOrders.map((order) => (
                            <div key={order.id} className="glass-card p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-4">
                                        {getStatusIcon(order.status)}
                                        <div>
                                            <h3 className="text-lg font-bold text-foreground">Order #{order.id}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                                    {order?.order_items.map((item) => (
                                        <div key={item.product_id} className="flex items-center space-x-3">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-12 h-12 rounded-lg object-cover"
                                            />
                                            <div>
                                                <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
                                                <p className="text-xs text-muted-foreground">
                                                    {item.quantity} x ₹{item.price}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm text-muted-foreground">
                                            Total: <span className="font-bold text-foreground">₹{order.totalAmount}</span>
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => toggleOrder(order.id)}
                                        className="px-4 py-2 rounded-lg bg-secondary text-foreground font-bold hover:bg-secondary/80 transition-colors"
                                    >
                                        {openOrders.includes(order.id) ? "Hide Details" : "Show Details"}
                                    </button>
                                </div>
                                {openOrders.includes(order.id) && (
                                    <div className="mt-4 border-t border-border pt-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <h4 className="text-sm font-bold text-foreground mb-2">Shipping Address</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    {order.shippingAddress.addressLine1}<br />
                                                    {order.shippingAddress.addressLine2}<br />
                                                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                                                    {order.shippingAddress.country}
                                                </p>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-foreground mb-2">Payment Information</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Method: {order.paymentMethod}<br />
                                                    Status: {order.paymentStatus}<br />
                                                    Transaction ID: {order.transactionId}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/*order action */}
                                <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-[hsla(var(--glass-border))]">
                                    <button className="px-4 py-2 glass-card hover:glow-on-hover animate-smooth text-sm">
                                        View Details
                                    </button>
                                    <button className="px-4 py-2 glass-card hover:glow-on-hover animate-smooth text-sm">
                                        Track Order
                                    </button>
                                    {order.status === "Delivered" && (
                                        <>
                                            <button className="px-4 py-2 glass-card hover:glow-on-hover animate-smooth text-sm">
                                                Write Review
                                            </button>
                                            <button className="px-4 py-2 glass-card hover:glow-on-hover animate-smooth text-sm">
                                                Reorder
                                            </button>
                                        </>
                                    )}


                                    {order.status === "Processing" && (
                                        <button className="px-4 py-2 glass-card hover:glow-on-hover animate-smooth text-sm text-destructive">
                                            Cancel Order
                                        </button>
                                    )}
                                </div>



                            </div>

                        ))
                    )}
                </div>
            </div>

        </div>
    </>
};

export default Orders;