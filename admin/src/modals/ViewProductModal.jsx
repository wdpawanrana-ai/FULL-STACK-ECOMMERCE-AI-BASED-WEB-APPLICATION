import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleViewProductModal } from "../store/slices/extraSlice";
import { X, Calendar, Shield, ShoppingBag, Award, Eye } from "lucide-react";

/**
 * ViewProductModal Component
 * Modal dashboard overlay for viewing details of selected products.
 */
const ViewProductModal = ({ selectedProduct }) => {
  const dispatch = useDispatch();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!selectedProduct) return null;

  const images = selectedProduct.images || [];
  const mainImage = images[activeImageIndex]?.url || "";

  return (
    <>
      <div className="fixed inset-0 z-50 bg-[#090910]/40 backdrop-blur-sm flex justify-center items-center p-4">
        <div className="bg-white rounded-3xl w-full max-w-3xl p-6 md:p-8 overflow-y-auto max-h-[90vh] relative shadow-2xl border border-slate-100 animate-slide-in">
          {/* Close button */}
          <button
            onClick={() => dispatch(toggleViewProductModal())}
            className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-55 transition-all text-xl"
          >
            <X size={20} />
          </button>

          <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 rounded bg-[#7978e9]"></span>
            Inspect Product details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Visuals Gallery */}
            <div className="flex flex-col gap-4">
              <div className="w-full h-72 rounded-3xl overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center relative shadow-sm">
                {mainImage ? (
                  <img
                    src={mainImage}
                    alt={selectedProduct?.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <p className="text-slate-350 font-semibold text-sm">No photo available</p>
                )}
              </div>

              {/* Thumbnail row */}
              {images.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto py-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-14 h-14 rounded-xl overflow-hidden shadow-inner border transition-all ${activeImageIndex === idx
                        ? "ring-2 ring-[#7978e9] border-transparent"
                        : "border-slate-200 hover:border-[#7978e9]/55"
                        }`}
                    >
                      <img
                        src={img?.url}
                        alt={`Thumbnail ${idx}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Information specifications details */}
            <div className="flex flex-col justify-between py-1">
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#7978e9] px-2 py-0.5 bg-indigo-50 border border-[#7978e9]/10 rounded-full">
                    {selectedProduct.category}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-800 mt-2 select-all leading-tight">{selectedProduct.name}</h3>
                  <span className="text-[10px] text-slate-400 font-mono select-all block mt-1">{selectedProduct.id}</span>
                </div>

                <div className="border-t border-slate-100 pt-3">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Description</p>
                  <p className="text-sm text-slate-505 leading-relaxed font-normal">{selectedProduct.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Price</label>
                    <span className="text-xl font-black text-slate-800">₹{Number(selectedProduct.price).toLocaleString()}</span>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-405 uppercase tracking-widest block mb-0.5">Rating Index</label>
                    <div className="flex items-center gap-1 mt-0.5 text-amber-505 font-bold text-sm">
                      <span>⭐</span>
                      <span>{selectedProduct.ratings || "No ratings"}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-3 pb-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Stock Count</label>
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border mt-0.5 ${selectedProduct.stock > 0
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                        : "bg-rose-50 text-rose-700 border-rose-100"
                        }`}
                    >
                      {selectedProduct.stock > 0 ? `In Stock (${selectedProduct.stock})` : "Out of Stock"}
                    </span>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Catalog Entry</label>
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 mt-1">
                      <Calendar size={14} className="text-slate-400" />
                      {new Date(selectedProduct.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4">
                <button
                  onClick={() => dispatch(toggleViewProductModal())}
                  className="w-full py-3.5 bg-[#7978e9] hover:bg-[#4b49ac] text-white rounded-2xl text-sm font-semibold transition-colors duration-200"
                >
                  Close Inspection
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProductModal;