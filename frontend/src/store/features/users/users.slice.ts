import { UserI } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

interface initialStateI {
  users: UserI[];
}

const initialState: initialStateI = {
  users: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    getUsersSuccess: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { getUsersSuccess } = usersSlice.actions;

export default usersSlice.reducer;
