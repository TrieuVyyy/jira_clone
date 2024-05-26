import React from "react";
import FormSigup from "./FormSignup";
import Lottie from "lottie-react";
import animateSrc from "../../assets/images/bgAnimate.json";

export default function SignupPage() {
  return (
    <div className="container flex justify-between items-center">
      <div className="w-2/3">
        <Lottie animationData={animateSrc} loop={true} />
      </div>
      <FormSigup />
    </div>
  );
}
