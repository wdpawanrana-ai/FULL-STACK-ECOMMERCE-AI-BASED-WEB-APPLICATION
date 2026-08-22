import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewProduct } from "../store/slices/productsSlice";
import { toggleCreateProductModal } from "../store/slices/extraSlice";
import { Loader2, Plus, X, Upload } from "lucide-react";

/**
 * CreateProductModal Component
 * Modal dashboard overlay for adding new electric vehicle goods and spares parameters.
 */
const CreateProductModal = () => {
  const { loading } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Electric Scooters",
    stock: "",
    images: [],
  });

  const [previewImages, setPreviewImages] = useState([]);

  // EV-specific categorizations
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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      images: files,
    });

    // Create preview URLs
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price * 283); // Multiply by 283 because the backend divides it by 283 to convert prices.
    data.append("category", formData.category);
    data.append("stock", formData.stock);

    for (let i = 0; i < formData.images.length; i++) {
      data.append("images", formData.images[i]);
    }

    dispatch(createNewProduct(data)).then((action) => {
      // Toggle modal close if success
      if (action) {
        dispatch(toggleCreateProductModal());
      }
    });
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-[#090910]/40 backdrop-blur-sm flex justify-center items-center p-4">
        <div className="bg-white rounded-3xl w-full max-w-2xl p-6 md:p-8 relative shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
          {/* Close button */}
          <button
            onClick={() => dispatch(toggleCreateProductModal())}
            className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all text-xl"
          >
            <X size={20} />
          </button>

          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 rounded bg-[#7978e9]"></span>
            Add Product Entry
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Product Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Product Name</label>
                <input
                  type="text"
                  placeholder="e.g. Mechanical Keyboard"
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
                <label className="text-xs font-bold text-slate-405 uppercase tracking-wider">Initial Stock</label>
                <input
                  type="number"
                  placeholder="Stock count"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-205 focus:border-[#7978e9] focus:ring-2 focus:ring-[#7978e9]/10 outline-none text-sm transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Images Upload */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Product Visuals</label>
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-[#7978e9] rounded-2xl p-6 cursor-pointer hover:bg-slate-50/50 transition-all duration-200 group">
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 rounded-xl bg-slate-50 group-hover:bg-[#7978e9]/10 text-slate-400 group-hover:text-[#7978e9] transition-colors">
                    <Upload size={22} />
                  </div>
                  <span className="text-sm font-semibold text-slate-500 group-hover:text-[#7978e9]">Select product photos...</span>
                  <span className="text-[10px] text-slate-400">Supports PNG, JPG, JPEG</span>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  required
                />
              </label>
            </div>

            {/* Preview Thumbnails */}
            {previewImages.length > 0 && (
              <div className="flex flex-wrap gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                {previewImages.map((src, index) => (
                  <div key={index} className="relative w-16 h-16 rounded-xl overflow-hidden shadow-inner border border-slate-100 ring-2 ring-white">
                    <img src={src} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Product Description</label>
              <textarea
                placeholder="Describe key parameters, specifications, features, sizes..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border border-slate-205 focus:border-[#7978e9] focus:ring-2 focus:ring-[#7978e9]/10 outline-none text-sm transition-all duration-200"
                rows={4}
                required
              />
            </div>

            {/* Submit buttons */}
            <div className="flex justify-end gap-4 mt-2">
              <button
                type="button"
                onClick={() => dispatch(toggleCreateProductModal())}
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
                    Saving...
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    Create Entry
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

export default CreateProductModal;
