import React from "react";
import HeaderMain from '../ProjectDetail/HeaderMain'
import InfoMain from "../ProjectDetail/InfoMain";
import ContentMain from "../ProjectDetail/ContentMain";

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
