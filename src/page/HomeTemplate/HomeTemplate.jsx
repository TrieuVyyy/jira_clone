import React, { useEffect, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import {
  QuestionCircleOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { SiJirasoftware } from "react-icons/si";
import { useSelector } from "react-redux";
import MenuCyberBug from "../HomePage/MenuCyberBug";
import Header from "./Header";
const { Content, Sider } = Layout;

const items = [
  {
    key: "search",
    icon: <SearchOutlined />,
    label: <Link className="text-decoration-none">SEARCH TASK</Link>,
  },
  {
    key: "create",
    icon: <PlusCircleOutlined />,
    label: (
      <Link to="/creattask" className="text-decoration-none">
        CREATE TASK
      </Link>
    ),
  },
  {
    key: "showtimes",
    icon: <QuestionCircleOutlined />,
    label: "ABOUT",
  },
];

export default function HomeTemplate() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const navgigate = useNavigate();
  const user = useSelector((state) => state.userSlice);

  useEffect(() => {
    if (user) {
      navgigate("/login");
    }
  }, []);

  return (
    <Layout>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <a href="/">
            <SiJirasoftware size={"40px"} className="m-6 text-blue-600 block" />
          </a>
          <div>

          <Menu
            mode="inline"
            defaultSelectedKeys={["user"]}
            defaultOpenKeys={["files"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            theme="dark"
            items={items}
          />
          </div>
        </Sider>
        <MenuCyberBug />
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Header />
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
            items={[
              {
                title: "Home",
              },
              {
                title: "List",
              },

              {
                title: "App",
              },
            ]}
          />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
