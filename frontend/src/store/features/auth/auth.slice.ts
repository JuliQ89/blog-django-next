import { UserI } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface initialStateI {
  isAuthenticated: boolean;
  user: null | UserI;
}

const initialState: initialStateI = {
  isAuthenticated: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { user }: { user: UserI } = jwtDecode(action.payload);
      state.user = user;
      state.isAuthenticated = true;
    },
    logoutSuccess: () => {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      return initialState;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
