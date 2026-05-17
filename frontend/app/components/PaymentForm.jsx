"use client";

import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Lock, CreditCard } from "lucide-react";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/orders`,
      },
      redirect: "if_required",
    });

    if (error) {
      toast.error(error.message || "Payment failed");
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      toast.success("Payment successful!");
      router.push("/orders/me"); // Assuming there's a user dashboard or orders page
    } else {
      toast.info("Payment is processing");
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
      <div className="bg-background rounded-2xl p-4 border border-border/50">
        <PaymentElement
          options={{
            layout: "tabs",
          }}
        />
      </div>

      <button
        type="submit"
        disabled={isProcessing || !stripe || !elements}
        className="w-full py-5 bg-gradient-to-r from-primary to-purple-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-primary/90 hover:to-purple-600/90 transition-all shadow-[0_0_40px_rgba(139,92,246,0.4)] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
      >
        <Lock className="w-5 h-5" />
        {isProcessing ? "Processing Payment..." : "Pay Now"}
      </button>
      <p className="text-center text-xs text-foreground/40 font-medium">
        Your payment information is encrypted and secure.
      </p>
    </form>
  );
};

export default PaymentForm;
