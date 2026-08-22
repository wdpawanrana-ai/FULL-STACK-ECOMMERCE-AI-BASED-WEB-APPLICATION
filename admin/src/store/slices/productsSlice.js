import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../lib/axios";
import { toast } from "react-toastify";

const productsSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    products: [],
    totalProducts: 0,
    error: null,
  },
  reducers: {
    fetchProductsRequest: (state) => {
      state.loading = true;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.totalProducts = action.payload.totalProducts;
    },
    fetchProductsFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createProductRequest: (state) => {
      state.loading = true;
    },
    createProductSuccess: (state, action) => {
      state.loading = false;
      state.products.unshift(action.payload);
      state.totalProducts += 1;
    },
    createProductFailed: (state, action) => {
      state.loading = false;
    },
    updateProductRequest: (state) => {
      state.loading = true;
    },
    updateProductSuccess: (state, action) => {
      state.loading = false;
      const index = state.products.findIndex(
        (p) => p.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    updateProductFailed: (state, action) => {
      state.loading = false;
    },
    deleteProductRequest: (state) => {
      state.loading = true;
    },
    deleteProductSuccess: (state, action) => {
      state.loading = false;
      state.products = state.products.filter((p) => p.id !== action.payload);
      state.totalProducts = Math.max(0, state.totalProducts - 1);
    },
    deleteProductFailed: (state, action) => {
      state.loading = false;
    },
  },
});

export const fetchAllProducts = (page) => async (dispatch) => {
  dispatch(productsSlice.actions.fetchProductsRequest());
  try {
    const res = await axiosInstance.get(`/product?page=${page || 1}`);
    dispatch(productsSlice.actions.fetchProductsSuccess(res.data));
  } catch (error) {
    dispatch(
      productsSlice.actions.fetchProductsFailed(
        error.response?.data?.message || "Failed to fetch products"
      )
    );
  }
};

export const createNewProduct = (formData) => async (dispatch) => {
  dispatch(productsSlice.actions.createProductRequest());
  try {
    const res = await axiosInstance.post("/product/admin/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch(productsSlice.actions.createProductSuccess(res.data.product));
    toast.success(res.data.message || "Product created successfully");
  } catch (error) {
    dispatch(productsSlice.actions.createProductFailed());
    toast.error(error.response?.data?.message || "Failed to create product");
  }
};

export const updateProduct = (data, id) => async (dispatch) => {
  dispatch(productsSlice.actions.updateProductRequest());
  try {
    const res = await axiosInstance.put(`/product/admin/update/${id}`, data);
    dispatch(productsSlice.actions.updateProductSuccess(res.data.updatedProduct));
    toast.success(res.data.message || "Product updated successfully");
  } catch (error) {
    dispatch(productsSlice.actions.updateProductFailed());
    toast.error(error.response?.data?.message || "Failed to update product");
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  dispatch(productsSlice.actions.deleteProductRequest());
  try {
    const res = await axiosInstance.delete(`/product/admin/delete/${id}`);
    dispatch(productsSlice.actions.deleteProductSuccess(id));
    toast.success(res.data.message || "Product deleted successfully");
  } catch (error) {
    dispatch(productsSlice.actions.deleteProductFailed());
    toast.error(error.response?.data?.message || "Failed to delete product");
  }
};

export default productsSlice.reducer;
