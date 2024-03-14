import React, { useState } from "react";
import {
  QuestionCircleOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { SiJirasoftware } from "react-icons/si";
import { NavLink } from "react-router-dom";

const { Sider } = Layout;

const SidebarCyberBugs = () => {
  const [collapsed, setCollapsed] = useState(false);

  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => {
    setModalShow(false);
  };
  const handleShow = () => {
    setModalShow(true);
  };

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
      <NavLink activeClassname="active">
        SEARCH TASK
      </NavLink>,
      "sub 1",
      <SearchOutlined />,
      []
    ),
    getItem(
      <NavLink to={"creattask"} activeClassname="active">
        CREATE TASK
      </NavLink>,
      "sub 2",
      <PlusCircleOutlined />,
      []
    ),
    getItem(
      <NavLink  activeClassname="active">
        ABOUT
      </NavLink>,
      "sub 2",
      <QuestionCircleOutlined />,
      []
    ),
  ];
  const onClick = (e) => {
    console.log("click", e);
  };

  return (
    <Layout className="h-screen">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <a href="/">
          <SiJirasoftware size={"40px"} className="m-6 text-blue-600 block" />
        </a>
        <Menu
          onClick={onClick}
          theme="dark"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Sider>
    </Layout>
  );
};
export default SidebarCyberBugs;
