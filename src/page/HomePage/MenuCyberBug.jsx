import React from "react";
import {
  PlusCircleOutlined,
  ProductOutlined,
  DatabaseOutlined,
  ContainerOutlined,
  FilterOutlined,
  FileTextOutlined,
  LineChartOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { Menu, theme } from "antd";
import logo from "../../assets/images/jiralogo.png";
import { Link } from "react-router-dom";

const items = [
  {
    key: "board",
    icon: <ProductOutlined />,
    label: <Link to="/" className="text-decoration-none">Cyber Board</Link>,
  },
  {
    key: "project",
    icon: <DatabaseOutlined />,
    label: <Link to="/project" className="text-decoration-none">Project Manager</Link>,
  },
  {
    key: "create",
    icon: <PlusCircleOutlined />,
    label: <Link to="/createproject" className="text-decoration-none">Create Project</Link>,
  },
  {
    key: "user",
    icon: <ContainerOutlined />,
    label: <Link to='/usermanager' className="text-decoration-none">User Manager</Link>,
  },
  {
    key: "issue",
    icon: <FilterOutlined />,
    label: "Issue and filters",
  },
  {
    key: "pages",
    icon: <FileTextOutlined />,
    label: "Pages",
  },
  {
    key: "report",
    icon: <LineChartOutlined />,
    label: "Report",
  },
  {
    key: "component",
    icon: <InboxOutlined />,
    label: "Component",
  },
];

const MenuCyberBug = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <div
      width={200}
      style={{
        background: colorBgContainer,
      }}
    >
      <div className="m-10">
        <img src={logo} alt="" style={{ width: "120px" }} />
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={["user"]}
        defaultOpenKeys={["files"]}
        style={{
          height: "100%",
          borderRight: 0,
        }}
        items={items}
      />
    </div>
  );
};
export default MenuCyberBug;
