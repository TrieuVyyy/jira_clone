// axios instance

import axios from "axios";
import { store } from "../index";
import { setLoadingOff, setLoadingOn } from "../redux/spinnerSlice";

const accessToken=JSON.parse(localStorage.getItem("USER_INFOR"))?.accessToken

export let https = axios.create({
  baseURL: "https://jiranew.cybersoft.edu.vn",
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1OCIsIkhldEhhblN0cmluZyI6IjE2LzA2LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxODQ5NjAwMDAwMCIsIm5iZiI6MTY5MDM5MDgwMCwiZXhwIjoxNzE4NjQzNjAwfQ.g1qTwikJUdmDmNIzw2Qe8RjiRNvvnH54uKQRLeOC0RU",
    Authorization: "Bearer " + accessToken,
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
