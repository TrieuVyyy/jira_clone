import React from "react";
import {
  PlusCircleOutlined,
  ProductOutlined,
  TruckOutlined,
  FilterOutlined,
  FileTextOutlined,
  LineChartOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import logo from "../../assets/images/jiralogo.png";
import { NavLink } from "react-router-dom";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem(
    <NavLink to={'/'} activeClassname="active">
      Cyber Board
    </NavLink>,
    "sub 1",
    <ProductOutlined />,
    []
  ),
  getItem(
    <NavLink to={"project"} activeClassname="active">
      Project Manager
    </NavLink>,
    "sub 2",
    <PlusCircleOutlined />,
    []
  ),
  getItem(
    <NavLink to={"create"} activeClassname="active">
      Create Project
    </NavLink>,
    "sub 2",
    <PlusCircleOutlined />,
    []
  ),
  
  getItem("Releases", "sub 3", <TruckOutlined />, []),
  getItem("Issue and filters", "sub 4", <FilterOutlined />, []),
  getItem("Pages", "sub 5", <FileTextOutlined />, []),
  getItem("Report", "sub 6", <LineChartOutlined />, []),
  getItem("Component", "sub 7", <InboxOutlined />, []),
];
const onClick = (e) => {
  console.log("click", e);
};
const MenuCyberBug = () => (
  <div className="bg-white">
    <div className="m-10">
      <img src={logo} alt="" style={{ width: "120px" }} />
    </div>
    <Menu
      onClick={onClick}
      style={{
        width: 250,
      }}
      mode="vertical"
      items={items}
    />
  </div>
);
export default MenuCyberBug;
