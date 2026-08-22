import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleUpdateProductModal } from "../store/slices/extraSlice";
import { updateProduct } from "../store/slices/productsSlice";
import { Loader2, X, Check } from "lucide-react";

/**
 * UpdateProductModal Component
 * Modal dashboard overlay for updating existing electric vehicle accessories and spares details.
 */
const UpdateProductModal = ({ selectedProduct }) => {
  const { loading } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  // EV-specific categorizations matching the seed database
  const categoryOptions = [
    "Electric Scooters",
    "Lithium Batteries",
    "Motor & Controllers",
    "Tires & Rims",
    "Braking Systems",
    "Charging Solutions",
    "Lights & Signals",
    "Accessories",
  ];

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name || "",
        description: selectedProduct.description || "",
        // The backend stores prices divided by 283, so we multiply it back to represent original entry
        price: selectedProduct.price ? Math.round(selectedProduct.price * 283) : "",
        category: selectedProduct.category || "Electric Scooters",
        stock: selectedProduct.stock || "0",
      });
    }
  }, [selectedProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: formData.name,
      description: formData.description,
      // Multiply by 283 because the backend divides it when saving database entries
      price: formData.price * 283,
      category: formData.category,
      stock: formData.stock,
    };

    dispatch(updateProduct(data, selectedProduct.id)).then((action) => {
      // Close modal on success
      dispatch(toggleUpdateProductModal());
    });
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-[#090910]/40 backdrop-blur-sm flex justify-center items-center p-4">
        <div className="bg-white rounded-3xl w-full max-w-2xl p-6 md:p-8 relative shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
          {/* Close button */}
          <button
            onClick={() => dispatch(toggleUpdateProductModal())}
            className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all text-xl"
          >
            <X size={20} />
          </button>

          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 rounded bg-[#7978e9]"></span>
            Update Product Entry
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Product Name</label>
                <input
                  type="text"
                  placeholder="Product name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-205 focus:border-[#7978e9] focus:ring-2 focus:ring-[#7978e9]/10 outline-none text-sm transition-all duration-200"
                  required
                />
              </div>

              {/* Category */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-405 uppercase tracking-wider">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 bg-white rounded-2xl border border-slate-205 focus:border-[#7978e9] focus:ring-2 focus:ring-[#7978e9]/10 outline-none text-sm transition-all duration-200 cursor-pointer"
                  required
                >
                  {categoryOptions.map((cat, idx) => (
                    <option key={idx} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-405 uppercase tracking-wider">Price (INR / ₹)</label>
                <input
                  type="number"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-205 focus:border-[#7978e9] focus:ring-2 focus:ring-[#7978e9]/10 outline-none text-sm transition-all duration-200"
                  required
                />
              </div>

              {/* Stock */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-405 uppercase tracking-wider">Available Stock</label>
                <input
                  type="number"
                  placeholder="Stock"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-205 focus:border-[#7978e9] focus:ring-2 focus:ring-[#7978e9]/10 outline-none text-sm transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Product Description</label>
              <textarea
                placeholder="Product description..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border border-slate-205 focus:border-[#7978e9] focus:ring-2 focus:ring-[#7978e9]/10 outline-none text-sm transition-all duration-200"
                rows={4}
                required
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end gap-4 mt-2">
              <button
                type="button"
                onClick={() => dispatch(toggleUpdateProductModal())}
                className="px-6 py-3 border border-slate-205 hover:bg-slate-50 text-slate-500 rounded-2xl text-sm font-semibold transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-[#7978e9] hover:bg-[#4b49ac] text-white rounded-2xl font-bold text-sm shadow-md shadow-indigo-100/50 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Check size={16} className="stroke-[3]" />
                    Update Details
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProductModal;