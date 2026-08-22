"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../components/PaymentForm";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import { CreditCard, Truck, MapPin, Map, Flag, Hash, Phone, User, Package, ShieldCheck, CheckCircle2, ChevronRight, Lock } from "lucide-react";

// The publishable key could be undefined if env var is missing, but Next handles this.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder");

const Payment = () => {
    const { authUser, isCheckingAuth } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);
    const router = useRouter();
    const dispatch = useDispatch();

    const [clientSecret, setClientSecret] = useState("");
    const [isProcessingOrder, setIsProcessingOrder] = useState(false);

    // UI state
    const [step, setStep] = useState(1); // 1 for Shipping, 2 for Payment

    const [shippingDetails, setShippingDetails] = useState({
        full_name: authUser?.name || "",
        address: "",
        city: "",
        state: "Haryana",
        pincode: "",
        country: "India",
        phone: authUser?.phone || "",
    });

    useEffect(() => {
        if (isCheckingAuth === false && !authUser) {
            toast.error("Please login to proceed to checkout.");
            router.push("/");
        }
    }, [isCheckingAuth, authUser, router]);

    // Update form when authUser finally loads
    useEffect(() => {
        if (authUser) {
            setShippingDetails(prev => ({
                ...prev,
                full_name: prev.full_name || authUser.name || "",
                phone: prev.phone || authUser.phone || ""
            }));
        }
    }, [authUser]);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const taxPrice = total * 0.18;
    const shippingPrice = total >= 50 ? 0 : 2;
    const totalWithTax = total + taxPrice + shippingPrice;

    const handleShippingChange = (e) => {
        setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
    };

    const handleProceedToPayment = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!shippingDetails.full_name || !shippingDetails.address || !shippingDetails.city || !shippingDetails.pincode || !shippingDetails.phone) {
            toast.error("Please fill out all required shipping fields.");
            return;
        }

        if (cart.length === 0) {
            toast.error("Your cart is empty.");
            return;
        }

        try {
            setIsProcessingOrder(true);
            const orderedItems = cart.map(item => ({
                product: { id: item.id || item.product_id, images: [{ url: item.image || "" }] },
                quantity: item.quantity
            }));

            const payload = {
                ...shippingDetails,
                orderedItems
            };

            const response = await axiosInstance.post("/order/new", payload);

            if (response.data.success) {
                setClientSecret(response.data.paymentIntent);
                setStep(2); // Move to payment step
                toast.success("Order confirmed. Please complete the payment.");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to proceed to payment.");
        } finally {
            setIsProcessingOrder(false);
        }
    };

    const appearance = {
        theme: 'night',
        variables: {
            colorPrimary: '#8b5cf6',
            colorBackground: '#09090b',
            colorText: '#f4f4f5',
            colorDanger: '#ef4444',
            fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
            borderRadius: '12px',
            spacingUnit: '4px',
            gridColumnSpacing: '24px',
            gridRowSpacing: '24px'
        },
        rules: {
            '.Input': {
                backgroundColor: '#18181b',
                border: '1px solid #27272a',
                boxShadow: 'none',
                padding: '12px 16px',
            },
            '.Input:focus': {
                border: '1px solid #8b5cf6',
                boxShadow: '0 0 0 1px #8b5cf6',
            },
            '.Label': {
                color: '#a1a1aa',
                fontWeight: '500',
                marginBottom: '8px',
            }
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-24 bg-background selection:bg-primary/30 flex justify-center">
            <div className="max-w-[1440px] w-full mx-auto px-4 md:px-8">

                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="h-1.5 w-8 bg-primary rounded-full" />
                        <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs">Secure Checkout</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-foreground">
                        Complete Your Order
                    </h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Column: Form & Stepper */}
                    <div className="w-full lg:w-2/3 flex flex-col gap-8">

                        {/* Stepper */}
                        <div className="flex items-center w-full bg-secondary/10 border border-border/40 rounded-3xl p-4 backdrop-blur-xl">
                            <div className={`flex items-center flex-1 ${step >= 1 ? 'text-primary' : 'text-foreground/40'}`}>
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step > 1 ? 'bg-primary/20 border-2 border-primary' : 'bg-primary text-white shadow-lg'}`}>
                                    {step > 1 ? <CheckCircle2 size={20} className="text-primary" /> : "1"}
                                </div>
                                <span className={`ml-3 font-bold tracking-wide ${step === 1 ? 'text-foreground' : ''}`}>Shipping Details</span>
                            </div>
                            <div className="flex-1 max-w-[50px] mx-4 h-[2px] bg-border/50 rounded-full" />
                            <div className={`flex items-center flex-1 ${step >= 2 ? 'text-primary' : 'text-foreground/40'}`}>
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 2 ? 'bg-primary text-white shadow-lg' : 'bg-secondary/50 border-2 border-border/50'}`}>
                                    2
                                </div>
                                <span className={`ml-3 font-bold tracking-wide ${step === 2 ? 'text-foreground' : ''}`}>Payment Info</span>
                            </div>
                        </div>

                        {/* Step Form Wrapper */}
                        <div className="bg-secondary/5 ring-1 ring-border/50 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
                            {/* Decorative gradients */}
                            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
                            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

                            {step === 1 && (
                                <form onSubmit={handleProceedToPayment} className="relative z-10 flex flex-col gap-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Truck className="w-6 h-6 text-primary" />
                                        <h2 className="text-2xl font-black text-foreground">Where should we deliver?</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Full Name */}
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs font-bold text-foreground/50 uppercase tracking-widest pl-1">Full Name</label>
                                            <div className="relative group">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30 group-focus-within:text-primary transition-colors" />
                                                <input
                                                    type="text" name="full_name" required
                                                    value={shippingDetails.full_name} onChange={handleShippingChange}
                                                    placeholder="John Doe"
                                                    className="w-full pl-12 pr-4 py-4 bg-background border border-border/50 rounded-2xl text-sm font-medium focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-foreground"
                                                />
                                            </div>
                                        </div>
                                        {/* Phone */}
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs font-bold text-foreground/50 uppercase tracking-widest pl-1">Phone Number</label>
                                            <div className="relative group">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30 group-focus-within:text-primary transition-colors" />
                                                <input
                                                    type="text" name="phone" required
                                                    value={shippingDetails.phone} onChange={handleShippingChange}
                                                    placeholder="+91 9876543210"
                                                    className="w-full pl-12 pr-4 py-4 bg-background border border-border/50 rounded-2xl text-sm font-medium focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-foreground"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold text-foreground/50 uppercase tracking-widest pl-1">Street Address</label>
                                        <div className="relative group">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30 group-focus-within:text-primary transition-colors" />
                                            <input
                                                type="text" name="address" required
                                                value={shippingDetails.address} onChange={handleShippingChange}
                                                placeholder="123 EV Park Ave, Block C"
                                                className="w-full pl-12 pr-4 py-4 bg-background border border-border/50 rounded-2xl text-sm font-medium focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-foreground"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {/* City */}
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs font-bold text-foreground/50 uppercase tracking-widest pl-1">City</label>
                                            <div className="relative group">
                                                <input
                                                    type="text" name="city" required
                                                    value={shippingDetails.city} onChange={handleShippingChange}
                                                    placeholder="Gurugram"
                                                    className="w-full px-4 py-4 bg-background border border-border/50 rounded-2xl text-sm font-medium focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-foreground"
                                                />
                                            </div>
                                        </div>
                                        {/* State */}
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs font-bold text-foreground/50 uppercase tracking-widest pl-1">State</label>
                                            <div className="relative group">
                                                <input
                                                    type="text" name="state" required
                                                    value={shippingDetails.state} onChange={handleShippingChange}
                                                    className="w-full px-4 py-4 bg-background border border-border/50 rounded-2xl text-sm font-medium focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-foreground"
                                                />
                                            </div>
                                        </div>
                                        {/* Pincode */}
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs font-bold text-foreground/50 uppercase tracking-widest pl-1">Pincode</label>
                                            <div className="relative group">
                                                <input
                                                    type="text" name="pincode" required
                                                    value={shippingDetails.pincode} onChange={handleShippingChange}
                                                    placeholder="122001"
                                                    className="w-full px-4 py-4 bg-background border border-border/50 rounded-2xl text-sm font-medium focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-foreground"
                                                />
                                            </div>
                                        </div>
                                        {/* Country */}
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs font-bold text-foreground/50 uppercase tracking-widest pl-1">Country</label>
                                            <div className="relative group">
                                                <input
                                                    type="text" name="country" disabled
                                                    value={shippingDetails.country}
                                                    className="w-full px-4 py-4 bg-secondary/30 border border-border/50 rounded-2xl text-sm font-medium text-foreground/60 cursor-not-allowed"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isProcessingOrder}
                                        className="mt-6 flex items-center justify-center gap-3 w-full py-5 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all shadow-[0_0_40px_rgba(139,92,246,0.3)] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                                    >
                                        {isProcessingOrder ? "Processing..." : "Continue to Payment"}
                                        {!isProcessingOrder && <ChevronRight className="w-5 h-5" />}
                                    </button>
                                </form>
                            )}

                            {step === 2 && clientSecret && (
                                <div className="relative z-10 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <CreditCard className="w-6 h-6 text-primary" />
                                            <h2 className="text-2xl font-black text-foreground">Secure Payment</h2>
                                        </div>
                                        <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-3 py-1.5 rounded-full text-xs font-bold">
                                            <Lock className="w-3.5 h-3.5" />
                                            256-bit Encrypted
                                        </div>
                                    </div>

                                    <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
                                        <PaymentForm />
                                    </Elements>

                                    <div className="flex items-center justify-center gap-2 text-foreground/40 text-sm font-medium mt-4">
                                        <ShieldCheck className="w-4 h-4" />
                                        Guaranteed safe & secure checkout
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-secondary/5 ring-1 ring-border/50 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-xl sticky top-32">
                            <h2 className="text-xl font-black text-foreground mb-6 flex items-center gap-2">
                                <Package className="w-5 h-5 text-primary" />
                                Order Summary
                            </h2>

                            {/* Products List */}
                            <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar mb-6 flex flex-col gap-4">
                                {cart.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4 bg-background/50 p-3 rounded-2xl border border-border/30">
                                        <div className="w-16 h-16 rounded-xl bg-secondary/50 overflow-hidden flex-shrink-0">
                                            <img src={item.image || "/placeholder.png"} alt={item.title || "Product"} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-bold text-foreground truncate">{item.title || "Unnamed Item"}</h4>
                                            <p className="text-xs text-foreground/50 font-medium mt-1">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="text-sm font-black text-primary">
                                            ₹{item.price * item.quantity}
                                        </div>
                                    </div>
                                ))}
                                {cart.length === 0 && (
                                    <div className="text-center py-6 text-foreground/40 font-medium">
                                        Your cart is empty.
                                    </div>
                                )}
                            </div>

                            <div className="h-[1px] w-full bg-border/50 mb-6" />

                            <div className="flex flex-col gap-4 text-sm">
                                <div className="flex justify-between font-bold text-foreground/70">
                                    <span>Subtotal</span>
                                    <span>₹{total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-foreground/70">
                                    <span>Tax (18%)</span>
                                    <span>₹{taxPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-foreground/70">
                                    <span>Shipping</span>
                                    {total >= 50 ? (
                                        <span className="text-green-500">Free</span>
                                    ) : (
                                        <span>₹{shippingPrice.toFixed(2)}</span>
                                    )}
                                </div>
                            </div>

                            <div className="h-[1px] w-full bg-border/50 my-6" />

                            <div className="flex justify-between items-center text-xl">
                                <span className="font-black text-foreground">Total</span>
                                <span className="font-black text-primary">₹{totalWithTax.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;