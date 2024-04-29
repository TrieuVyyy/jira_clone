import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: undefined
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      let dataJson = JSON.stringify(action.payload);
      localStorage.setItem("USER_INFOR", dataJson);
    },
    logOut : (state) => {
      state.user = undefined;
      localStorage.setItem("USER_INFOR", undefined);
    }
  },
});

export const { setUser, logOut } = userSlice.actions;

export default userSlice.reducer;
