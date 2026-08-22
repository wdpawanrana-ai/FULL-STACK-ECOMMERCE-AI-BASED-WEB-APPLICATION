import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../lib/axios";
import { toast } from "react-toastify";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loading: false,
    totalUsers: 0,
    users: [],
    totalRevenueAllTime: 0,
    todayRevenue: 0,
    yesterdayRevenue: 0,
    totalUsersCount: 0,
    monthlySales: [],
    orderStatusCounts: {},
    topSellingProducts: [],
    lowStockProducts: 0,
    revenueGrowth: "",
    newUsersThisMonth: 0,
    currentMonthSales: 0,
  },
  reducers: {
    getAllUsersRequest(state) {
      state.loading = true;
    },
    getAllUsersSuccess(state, action) {
      state.loading = false;
      state.users = action.payload.users;
      state.totalUsers = action.payload.totalUsers;
    },
    getAllUsersFail(state, action) {
      state.loading = false;
    },
    deleteUserRequest(state) {
      state.loading = true;
    },
    deleteUserSuccess(state, action) {
      state.loading = false;
      state.users = state.users.filter((user) => user.id !== action.payload);
      state.totalUsers = Math.max(0, state.totalUsers - 1);
      state.totalUsersCount = Math.max(0, state.totalUsersCount - 1);
    },
    deleteUserFail(state, action) {
      state.loading = false;
    },
    getStatsRequest(state, action) {
      state.loading = true;
    },
    getStatsSuccess(state, action) {
      state.loading = false;
      state.totalRevenueAllTime = action.payload.totalRevenueAllTime;
      state.todayRevenue = action.payload.todayRevenue;
      state.yesterdayRevenue = action.payload.yesterdayRevenue;
      state.totalUsersCount = action.payload.totalUsersCount;
      state.monthlySales = action.payload.monthlySales;
      state.orderStatusCounts = action.payload.orderStatusCounts;
      state.topSellingProducts = action.payload.topSellingProducts;
      state.lowStockProducts = action.payload.lowStockProducts?.length;
      state.revenueGrowth = action.payload.revenueGrowth;
      state.newUsersThisMonth = action.payload.newUsersThisMonth;
      state.currentMonthSales = action.payload.currentMonthSales;
    },
    getStatsFailed(state, action) {
      state.loading = false;
    }
  },
});

export const fetchAllUsers = (page) => async (dispatch) => {
  dispatch(adminSlice.actions.getAllUsersRequest());
  await axiosInstance.get(`/admin/getallusers?page=${page || 1}`).then(res => {
    dispatch(adminSlice.actions.getAllUsersSuccess(res.data));
  }).catch(err => {
    dispatch(adminSlice.actions.getAllUsersFail());
  });
};

export const deleteUser = (id, page) => async (dispatch, getState) => {
  dispatch(adminSlice.actions.deleteUserRequest());
  await axiosInstance.delete(`/admin/delete/${id}`).then(res => {
    dispatch(adminSlice.actions.deleteUserSuccess(id));
    toast.success(res.data.message || "User deleted successfully");
    const state = getState();
    const updateTotal = state.admin.totalUsers;
    const updatedMaxPage = Math.ceil(updateTotal / 10 || 1);
    const validPage = Math.min(page, updatedMaxPage);
    dispatch(fetchAllUsers(validPage));
  }).catch(err => {
    dispatch(adminSlice.actions.deleteUserFail());
    toast.error(err.response?.data?.message || "Failed to delete user");
  });
};

export const getDashbordStats = () => async (dispatch) => {
  dispatch(adminSlice.actions.getStatsRequest());
  await axiosInstance.get(`/admin/fetch/dashboard-stats`).then(res => {
    dispatch(adminSlice.actions.getStatsSuccess(res.data));
  }).catch(err => {
    dispatch(adminSlice.actions.getStatsFailed());
  });
};

export default adminSlice.reducer;
