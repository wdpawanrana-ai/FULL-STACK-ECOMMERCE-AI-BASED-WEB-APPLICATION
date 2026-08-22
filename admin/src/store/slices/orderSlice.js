import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../lib/axios";
import { toast } from "react-toastify";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    orders: [],
    error: null,
  },
  reducers: {
    fetchAllOrdersRequest: (state) => {
      state.loading = true;
    },
    fetchAllOrdersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    fetchAllOrdersFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateOrderStatusRequest: (state) => {
      state.loading = true;
    },
    updateOrderStatusSuccess: (state, action) => {
      state.loading = false;
      const index = state.orders.findIndex(
        (order) => order.id === action.payload.id
      );
      if (index !== -1) {
        state.orders[index].order_status = action.payload.order_status;
      }
    },
    updateOrderStatusFailed: (state, action) => {
      state.loading = false;
    },
    deleteOrderRequest: (state) => {
      state.loading = true;
    },
    deleteOrderSuccess: (state, action) => {
      state.loading = false;
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload
      );
    },
    deleteOrderFailed: (state, action) => {
      state.loading = false;
    },
  },
});

export const fetchAllOrders = () => async (dispatch) => {
  dispatch(orderSlice.actions.fetchAllOrdersRequest());
  try {
    const res = await axiosInstance.get("/order/admin/getall");
    dispatch(orderSlice.actions.fetchAllOrdersSuccess(res.data.orders));
  } catch (error) {
    dispatch(
      orderSlice.actions.fetchAllOrdersFailed(
        error.response?.data?.message || "Failed to fetch orders"
      )
    );
  }
};

export const updateOrderStatus = (data) => async (dispatch) => {
  const { orderId, status } = data;
  dispatch(orderSlice.actions.updateOrderStatusRequest());
  try {
    const res = await axiosInstance.put(`/order/admin/update/${orderId}`, {
      status,
    });
    dispatch(orderSlice.actions.updateOrderStatusSuccess(res.data.updatedOrder));
    toast.success(res.data.message || "Order status updated");
  } catch (error) {
    dispatch(orderSlice.actions.updateOrderStatusFailed());
    toast.error(
      error.response?.data?.message || "Failed to update order status"
    );
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  dispatch(orderSlice.actions.deleteOrderRequest());
  try {
    const res = await axiosInstance.delete(`/order/admin/delete/${id}`);
    dispatch(orderSlice.actions.deleteOrderSuccess(id));
    toast.success(res.data.message || "Order deleted successfully");
  } catch (error) {
    dispatch(orderSlice.actions.deleteOrderFailed());
    toast.error(error.response?.data?.message || "Failed to delete order");
  }
};

export default orderSlice.reducer;
