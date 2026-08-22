import { createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import axiosInstance from "../../lib/axios";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    loginFailed: (state, action) => {
      state.loading = false;

    },
    getUserRequest: (state) => {
      state.loading = true;
    },
    getUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    getUserFailed: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;

    },
    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state, action) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },
    logoutFailed: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;

    },
    forgotPasswordRequest: (state) => {
      state.loading = true;
    },
    forgotPasswordSuccess: (state, action) => {
      state.loading = false;

    },
    forgotPasswordFailed: (state, action) => {
      state.loading = false;

    },
    resetPasswordRequest: (state) => {
      state.loading = true;
    },
    resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    resetPasswordFailed: (state, action) => {
      state.loading = false;

    },
    updateProfileRequest: (state) => {
      state.loading = true;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    updateProfileFailed: (state, action) => {
      state.loading = false;

    },
    updatePasswordRequest: (state) => {
      state.loading = true;
    },
    updatePasswordSuccess: (state, action) => {
      state.loading = false;
    },
    updatePasswordFailed: (state, action) => {
      state.loading = false;

    },
    resetAuthSlice: (state) => {
      state.loading = false;
      state.user = state.user;
      state.isAuthenticated = state.isAuthenticated;
    }
  },
});

export const login = (data) => async (dispatch) => {
  dispatch(authSlice.actions.loginRequest());
  try {
    await axiosInstance.post("/auth/login", data).then(res => {
      if (res.data.user.role === "Admin") {
        dispatch(authSlice.actions.loginSuccess(res.data.user));

        toast.success(res.data.message);

      }
      else {
        dispatch(authSlice.actions.loginFailed(res.data.message));
        toast.error(res.data.message);
      }



    })
  }
  catch (error) {
    dispatch(authSlice.actions.loginFailed());
    toast.error(error.response.data.message || "Login failed");
  }


};
export const getUser = () => async (dispatch) => {
  dispatch(authSlice.actions.getUserRequest());
  try {
    await axiosInstance.get("/auth/me").then(res => {
      dispatch(authSlice.actions.getUserSuccess(res.data.user));
      toast.success(res.data.message);
    })
  }
  catch (error) {
    dispatch(authSlice.actions.getUserFailed());
    toast.error(error.response.data.message || "Failed to get user");
  }



};
export const logout = () => async (dispatch) => {

  dispatch(authSlice.actions.logoutRequest());
  try {
    await axiosInstance.get("/auth/logout").then(res => {
      dispatch(authSlice.actions.logoutSuccess(res.data.user));
      toast.success(res.data.message);
    })
  }
  catch (error) {
    dispatch(authSlice.actions.logoutFailed());
    toast.error(error.response.data.message || "Failed to logout");
    dispatch(authSlice.actions.resetAuthSlice());

  }


};



export const forgotPassword = (email) => async (dispatch) => {
  dispatch(authSlice.actions.forgotPasswordRequest());
  try {
    await axiosInstance.post("/auth/password/forgot?frontendUrl=http://localhost:5173", { email }).then(res => {
      dispatch(authSlice.actions.forgotPasswordSuccess(res.data.user));
      toast.success(res.data.message);



    })
  }
  catch (error) {
    dispatch(authSlice.actions.forgotPasswordFailed());
    toast.error(error.response.data.message || "Cannot request for reset password");
  }


};

export const resetPassword = (token, newdata) => async (dispatch) => {
  dispatch(authSlice.actions.resetPasswordRequest());
  try {
    await axiosInstance.put(`/auth/password/reset/${token}`, newdata).then(res => {
      dispatch(authSlice.actions.resetPasswordSuccess(res.data.user));
      toast.success(res.data.message);
    })
  }
  catch (error) {
    dispatch(authSlice.actions.resetPasswordFailed());
    toast.error(error.response.data.message || "Failed to reset password");
  }


};

export const updateAdminProfile = (data) => async (dispatch) => {
  dispatch(authSlice.actions.updateProfileRequest());
  try {
    await axiosInstance.put("/auth/profile/update", data).then(res => {
      dispatch(authSlice.actions.updateProfileSuccess(res.data.user));
      toast.success(res.data.message);
    })
  }
  catch (error) {
    dispatch(authSlice.actions.updateProfileFailed());
    toast.error(error.response.data.message || "Failed to update profile");
  }


};
export const updateAdminPassword = (data) => async (dispatch) => {
  dispatch(authSlice.actions.updatePasswordRequest());
  try {
    await axiosInstance.put("/auth/password/update", data).then(res => {
      dispatch(authSlice.actions.updatePasswordSuccess(res.data.user));
      toast.success(res.data.message);
    })
  }
  catch (error) {
    dispatch(authSlice.actions.updatePasswordFailed());
    toast.error(error.response.data.message || "Failed to update password");
  }


};

export const resetAuthSlices = () => (dispatch) => {
  dispatch(authSlice.actions.resetAuthSlice());
};

// export const {
//   loginRequest,
//   loginSuccess,
//   loginFailed,
//   getUserRequest,
//   getUserSuccess,
//   getUserFailed,
//   logoutRequest,
//   logoutSuccess,
//   logoutFailed,
//   forgotPasswordRequest,
//   forgotPasswordSuccess,
//   forgotPasswordFailed,
//   resetPasswordRequest,
//   resetPasswordSuccess,
//   resetPasswordFailed,
//   updateProfileRequest,
//   updateProfileSuccess,
//   updateProfileFailed,
//   updatePasswordRequest,
//   updatePasswordSuccess,
//   updatePasswordFailed,
//   resetAuthSlice
// } = authSlice.actions;




export default authSlice.reducer;
