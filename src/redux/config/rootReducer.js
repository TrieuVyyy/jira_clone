import { combineReducers } from "@reduxjs/toolkit";
import spinnerReducer from "../spinnerSlice";
import userReducer from "../userSlice";

export default combineReducers({
    user: userReducer,
    spinner:  spinnerReducer,
  });