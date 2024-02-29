import React from "react";
import HeaderMain from "./Main/HeaderMain";
import InfoMain from "./Main/InfoMain";
import ContentMain from "./Main/ContentMain";

export default function CyberBugs() {
  return (
    <div className="container p-3">
      <h1 className="text-2xl font-bold">Cyber Board</h1>
      <HeaderMain />
      <InfoMain />
      <ContentMain />
    </div>
  );
}
