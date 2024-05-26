import React from 'react'
import { useSelector } from "react-redux";
import { PropagateLoader } from "react-spinners";

export default function Spinner() {
  const  isLoading = useSelector(state => state.spinnerReducer.isLoading);
  return isLoading ? (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#708F96",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        <PropagateLoader color="#E0D8CC" />
    </div>
  ) : (
    <></>
  );
}
