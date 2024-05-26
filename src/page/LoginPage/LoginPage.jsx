import React from "react";
import FormLogin from "./FormLogin";
import Lottie from "lottie-react";
import animateSrc from "../../assets/images/bgAnimate.json";

export default function LoginPage(props) {
  return (
    <div className="container flex justify-between items-center">
      <div className="w-2/3">
        <Lottie animationData={animateSrc} loop={true} />
      </div>
      <FormLogin />
    </div>
  );
}
