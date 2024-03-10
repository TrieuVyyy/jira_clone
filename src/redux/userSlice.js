import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userList: [],
  user: JSON.parse(localStorage.getItem("USER_INFOR")),
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserList: (state, action) => {
      state.userList = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUserList, setUser } = userSlice.actions;

export default userSlice.reducer;
