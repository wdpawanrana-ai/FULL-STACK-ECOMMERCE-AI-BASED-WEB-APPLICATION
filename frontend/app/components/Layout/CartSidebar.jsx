"use client";
import { X, Plus, Minus, Trash2, ShoppingCart, Zap } from "lucide-react";
import { toggleSidebar, toggleCart } from "@/app/store/slices/popupSlice";
import { removeFromCart, updateCartQuantity } from "@/app/store/slices/cartSlice";


import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

const CartSidebar = () => {
  const dispatch = useDispatch();
  const { isCartOpen } = useSelector((state) => state.popup);
  const { cart } = useSelector((state) => state.cart);

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateCartQuantity({ id, quantity }));
    }
  }
  let total = 0;
  if (cart) {
    total = cart.reduce((sum, item) => {
      if (!item?.product?.price) return sum;
      return sum + (item.product.price * item.quantity);
    }, 0);
  }
  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-md z-40 transition-opacity duration-300"
        onClick={() => dispatch(toggleCart())}
      />

      {/* Cart Sidebar */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-background border-l border-border z-50 shadow-2xl animate-slide-in-right overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Shopping Cart</h2>
            {cart?.length > 0 && (
              <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full">
                {cart.length}
              </span>
            )}
          </div>
          <button
            className="p-2 rounded-full hover:bg-secondary text-foreground/60 hover:text-foreground transition-all active:scale-95"
            onClick={() => dispatch(toggleCart())}
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {!cart || cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                <ShoppingCart className="w-8 h-8 text-foreground/20" />
              </div>
              <div>
                <p className="text-foreground/60 font-medium">Your cart is empty</p>
                <Link
                  href="/products"
                  onClick={() => dispatch(toggleCart())}
                  className="text-primary hover:underline text-sm font-semibold mt-2 inline-block"
                >
                  Browse Products
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => {
                if (!item?.product?.id) return null;
                return (
                  <div key={item.product.id} className="group flex items-center gap-4 bg-secondary/30 p-3 rounded-2xl border border-transparent hover:border-border transition-all">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-secondary">
                      {item.product.images?.[0]?.url || item.product.image ? (
                        <img
                          src={item.product.images?.[0]?.url || item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-secondary/20 text-foreground/20 transition-transform duration-300 group-hover:scale-110 group-hover:text-primary/40">
                          <Zap size={20} className="opacity-50" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{item.product.name}</h3>
                      <p className="text-primary font-bold mt-1">₹{item.product.price.toLocaleString()}</p>

                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center bg-background border border-border rounded-lg px-2 py-1">
                          <button
                            className="p-1 text-foreground/60 hover:text-primary transition-colors disabled:opacity-30"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-foreground">{item.quantity}</span>
                          <button
                            className="p-1 text-foreground/60 hover:text-primary transition-colors"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      className="p-2 text-foreground/30 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                      onClick={() => dispatch(removeFromCart({ id: item.product.id }))}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer/Checkout */}
        {cart && cart.length > 0 && (
          <div className="p-6 border-t border-border bg-secondary/10">
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-foreground/60 text-sm">
                <span>Subtotal</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-foreground font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">₹{total.toLocaleString()}</span>
              </div>
            </div>

            <Link href="/cart">
              <button
                className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all text-lg"
                onClick={() => dispatch(toggleCart())}
              >
                View Full Cart
              </button>
            </Link>
            <p className="text-[10px] text-foreground/30 text-center mt-4 uppercase tracking-widest">
              Secure Checkout • Fast Delivery
            </p>
          </div>
        )}
      </div>
    </>
  );
};


export default CartSidebar;
