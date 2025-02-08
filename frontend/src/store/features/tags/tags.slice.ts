import { TagI } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

interface initialStateI {
  tags: TagI[];
}

const initialState: initialStateI = {
  tags: [],
};

export const tagsSlice = createSlice({
  name: "tags",
  initialState: initialState,
  reducers: {
    getTagsSuccess: (state, action) => {
      state.tags = action.payload;
    },
  },
});

export const { getTagsSuccess } = tagsSlice.actions;

export default tagsSlice.reducer;
