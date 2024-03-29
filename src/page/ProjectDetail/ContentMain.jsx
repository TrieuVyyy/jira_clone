import React, { useState } from "react";
import TaskList from "./TaskList/TaskList";

const gridStyle = {
  width: "100%",
};

export default function ContentMain() {
  return (
    <div className="content">
      <TaskList />
    </div>
  );
}
