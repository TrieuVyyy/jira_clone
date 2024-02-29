import React from 'react'
import { useSelector } from "react-redux";
import { RingLoader } from "react-spinners";

export default function Spinner() {
    let {isLoading} = useSelector((state) => state.spinnerSlice);
  return isLoading ? (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#f0ead2",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        {/* coolors  */}
        <RingLoader color="#36d7b7" />
    </div>
  ) : (
    <></>
  );
}
