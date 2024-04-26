import React from "react";
import FormSigup from "./FormSignup";

export default function SignupPage() {
  return (
    <div className="container flex">
      <div className="w-2/3">
        <img alt="" src="https://picsum.photos/500" style={{ width: "100%", height: '100%'}} />
      </div>
      <FormSigup />
    </div>
  );
}
