import { combineReducers } from "@reduxjs/toolkit";
import spinnerReducer from "../spinnerSlice";
import userReducer from "../userSlice";

export default combineReducers({
  userSlice: userReducer,
  spinnerReducer:  spinnerReducer,
  });