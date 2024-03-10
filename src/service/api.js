// axios instance

import axios from "axios";
import { store } from "../index";
import { setLoadingOff, setLoadingOn } from "../redux/spinnerSlice";

export let https = axios.create({
  baseURL: "https://jiranew.cybersoft.edu.vn",
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJqaXJhY3liZXJAZ21haWwuY29tIiwibmJmIjoxNzA5MTk4NjQ3LCJleHAiOjE3MDkyMDIyNDd9.IzekI-KN2k5kunUgUVVTxa9nEckypFD9vzFFTUuca7Y",
    Authorization: "bearer " + JSON.parse(localStorage.getItem("USER_INFOR"))?.accessToken,
  },
});

// Add a request interceptor
https.interceptors.request.use(
  function (config) {
    store.dispatch(setLoadingOn());
    console.log("request đi");
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
https.interceptors.response.use(
  function (response) {
    store.dispatch(setLoadingOff());
    console.log("request về");
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    store.dispatch(setLoadingOff());
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
