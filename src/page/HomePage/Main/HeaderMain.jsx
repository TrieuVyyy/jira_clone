import React from "react";
import { Breadcrumb } from "antd";

export default function HeaderMain() {
  return (
    <Breadcrumb
      style={{
        margin: "16px 0",
      }}
    >
      <Breadcrumb.Item>Project</Breadcrumb.Item>
      <Breadcrumb.Item>Cyber Learn</Breadcrumb.Item>
      <Breadcrumb.Item>Cyber Board</Breadcrumb.Item>
    </Breadcrumb>
  );
}
