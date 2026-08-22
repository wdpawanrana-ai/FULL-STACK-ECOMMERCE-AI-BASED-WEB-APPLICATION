import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateProductModal from "../modals/CreateProductModal";
import UpdateProductModal from "../modals/UpdateProductModal";
import ViewProductModal from "../modals/ViewProductModal";
import {
  fetchAllProducts,
  deleteProduct
} from "../store/slices/productsSlice";
import {
  toggleCreateProductModal,
  toggleUpdateProductModal,
  toggleViewProductModal
} from "../store/slices/extraSlice";
import {
  Plus,
  Trash2,
  Edit3,
  Eye,
  Package,
  ShieldAlert,
  Loader2,
  ChevronLeft,
  ChevronRight,
  AlertTriangle
} from "lucide-react";

/**
 * Products Component
 * Lists catalog records in a paginated grid. Handles deletions and triggers update/creation modals.
 */
const Products = () => {
  const dispatch = useDispatch();
  const { products, totalProducts, loading } = useSelector((state) => state.product);
  const {
    isCreateProductModalOpened,
    isUpdateProductModalOpened,
    isViewProductModalOpened
  } = useSelector((state) => state.extra);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });

  useEffect(() => {
    dispatch(fetchAllProducts(currentPage));
  }, [dispatch, currentPage]);

  const handleDelete = () => {
    dispatch(deleteProduct(deleteConfirm.id));
    setDeleteConfirm({ open: false, id: null });
  };

  const handleOpenViewModal = (product) => {
    setSelectedProduct(product);
    dispatch(toggleViewProductModal());
  };

  const handleOpenUpdateModal = (product) => {
    setSelectedProduct(product);
    dispatch(toggleUpdateProductModal());
  };

  const totalPages = Math.ceil((totalProducts || 0) / 10) || 1;

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Mini calculations
  const outOfStockCount = products?.filter((p) => Number(p.stock) === 0).length || 0;
  const lowStockCount = products?.filter((p) => Number(p.stock) > 0 && Number(p.stock) <= 5).length || 0;

  return (
    <>
      <div className="w-full p-4 md:p-8">
        <div>

          {/* Upper Hero Section */}
          <div className="relative h-32 rounded-3xl bg-white overflow-hidden shadow-sm border border-slate-100 mb-8 animate-fade-in flex items-center px-6 md:px-8">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#7978e9]/15 via-transparent to-transparent"></div>
            <div className="flex justify-between items-center w-full">
              <div>
                <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">Products Catalog</h1>
                <p className="text-xs md:text-sm text-slate-400 font-semibold mt-1">
                  Manage inventory stocks, update details, descriptions, ratings and categories
                </p>
              </div>
              <button
                onClick={() => dispatch(toggleCreateProductModal())}
                className="px-4 py-2.5 bg-[#7978e9] hover:bg-[#4b49ac] text-white font-black rounded-2xl text-xs flex items-center gap-1.5 shadow transition-all duration-200 mt-1 flex-shrink-0"
              >
                <Plus size={15} className="stroke-[3]" />
                Add Product
              </button>
            </div>
          </div>

          {/* Quick Stats overview cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 mt-6 relative z-10">
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 hover:border-[#7978e9]/30 transition-all duration-300 hover:scale-[1.02]">
              <div className="p-3.5 rounded-2xl bg-indigo-50 text-[#7978e9] border border-[#7978e9]/20">
                <Package size={22} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Catalog Items</p>
                <p className="text-xl font-black text-slate-800">{totalProducts || 0} products</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 hover:border-orange-500/30 transition-all duration-300 hover:scale-[1.02]">
              <div className="p-3.5 rounded-2xl bg-orange-50 text-orange-605 border border-orange-105">
                <AlertTriangle size={22} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Low Inventory</p>
                <p className="text-xl font-black text-slate-800">{lowStockCount} items</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 hover:border-rose-500/30 transition-all duration-300 hover:scale-[1.02]">
              <div className="p-3.5 rounded-2xl bg-rose-50 text-rose-650 border border-rose-105">
                <ShieldAlert size={22} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Out of Stock</p>
                <p className="text-xl font-black text-slate-800">{outOfStockCount} items</p>
              </div>
            </div>
          </div>

          {/* Products List Table Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <span className="w-1.5 h-6 rounded bg-[#7978e9]"></span>
                Product Records
              </h3>
            </div>

            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-3">
                <div className="w-10 h-10 border-4 border-slate-205 border-t-[#7978e9] rounded-full animate-spin"></div>
                <p className="text-sm font-semibold text-slate-400">Loading catalog items...</p>
              </div>
            ) : !products || products.length === 0 ? (
              <div className="py-20 text-center text-slate-400">
                <p className="font-semibold">No products currently listed</p>
                <button
                  onClick={() => dispatch(toggleCreateProductModal())}
                  className="mt-4 px-4 py-2 bg-[#7978e9] hover:bg-[#4b49ac] text-white hover:text-white font-bold rounded-2xl text-xs flex items-center gap-1.5 mx-auto transition-colors"
                >
                  <Plus size={14} /> Add First Product
                </button>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[650px]">
                    <thead>
                      <tr className="border-b border-slate-105 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                        <th className="pb-3 pl-2">Product name / ID</th>
                        <th className="pb-3">Category</th>
                        <th className="pb-3">Price</th>
                        <th className="pb-3">Stock level</th>
                        <th className="pb-3">Ratings</th>
                        <th className="pb-3 pr-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                      {products.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 pl-2">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 flex items-center justify-center">
                                {item.images?.[0]?.url ? (
                                  <img
                                    src={item.images[0].url}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <span className="text-[9px] text-slate-400 font-bold uppercase">No image</span>
                                )}
                              </div>
                              <div className="flex flex-col min-w-0 max-w-[180px]">
                                <span className="font-bold text-slate-800 truncate">{item.name}</span>
                                <span className="text-[9px] text-slate-400 font-mono truncate">{item.id}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 font-semibold text-slate-500">{item.category}</td>
                          <td className="py-4 font-black text-slate-800">₹{Number(item.price).toLocaleString()}</td>
                          <td className="py-4">
                            <span
                              className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold border ${item.stock > 5
                                ? "bg-emerald-50 text-emerald-700 border-emerald-250"
                                : item.stock > 0
                                  ? "bg-orange-50 text-orange-700 border-orange-250"
                                  : "bg-red-50 text-red-700 border-red-250"
                                }`}
                            >
                              {item.stock > 0 ? `${item.stock} in stock` : "Out of stock"}
                            </span>
                          </td>
                          <td className="py-4 text-amber-500 font-bold text-xs">⭐ {item.ratings || "No index"}</td>
                          <td className="py-4 pr-2 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleOpenViewModal(item)}
                                className="p-2 text-slate-500 hover:text-indigo-500 hover:bg-slate-50 rounded-xl transition-all"
                                title="Inspect Details"
                              >
                                <Eye size={16} />
                              </button>
                              <button
                                onClick={() => handleOpenUpdateModal(item)}
                                className="p-2 text-slate-505 hover:text-emerald-600 hover:bg-slate-50 rounded-xl transition-all"
                                title="Edit Details"
                              >
                                <Edit3 size={16} />
                              </button>
                              <button
                                onClick={() => setDeleteConfirm({ open: true, id: item.id })}
                                className="p-2 text-slate-450 hover:text-red-500 hover:bg-red-55 rounded-xl transition-all"
                                title="Delete"
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

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-between items-center pt-6 mt-6 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-400">
                      Page {currentPage} of {totalPages}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="p-2 border border-slate-205 rounded-xl hover:bg-slate-50 text-slate-505 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="p-2 border border-slate-205 rounded-xl hover:bg-slate-50 text-slate-505 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Conditional Modals */}
      {isCreateProductModalOpened && <CreateProductModal />}
      {isUpdateProductModalOpened && <UpdateProductModal selectedProduct={selectedProduct} />}
      {isViewProductModalOpened && <ViewProductModal selectedProduct={selectedProduct} />}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-xl border border-slate-150 flex flex-col items-center text-center">
            <div className="p-3.5 rounded-full bg-red-50 text-red-500 mb-4 animate-bounce">
              <ShieldAlert size={28} />
            </div>
            <h4 className="text-lg font-black text-slate-800 mb-2">Delete product entry?</h4>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              This action is destructive and database records will be permanently wiped. Product images will be destroyed from file hosts.
            </p>
            <div className="flex gap-4 w-full">
              <button
                onClick={() => setDeleteConfirm({ open: false, id: null })}
                className="flex-1 py-3 border border-slate-205 hover:bg-slate-50 text-slate-500 rounded-2xl text-sm font-semibold transition-all duration-200"
              >
                No, cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-3 bg-red-550 hover:bg-red-600 text-white rounded-2xl text-sm font-black shadow-md shadow-red-200/50 border border-red-500/20 transition-all duration-200"
              >
                Delete catalog
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
