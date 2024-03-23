import React, { useState } from "react";
import CardTask from "./CardTask.jsx/CardTask";

const gridStyle = {
  width: "100%",
};

export default function ContentMain() {
  return (
    <div className="content">
      <CardTask />
    </div>
  );
}
