import React, { useState } from "react";
import {
  QuestionCircleOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Flex } from "antd";
import { SiJirasoftware } from "react-icons/si";


const { Sider } = Layout;

const SidebarCyberBugs = () => {
  const [collapsed, setCollapsed] = useState(false);

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
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <SearchOutlined />,
              label: "SEARCH ISSUE",
            },
            {
              key: "2",
              icon: <PlusCircleOutlined />,
              label: "CREATE ISSUE",
            },
            {
              key: "3",
              icon: <QuestionCircleOutlined />,
              label: "ABOUT",
            },
          ]}
        />
      </Sider>
    </Layout>
  );
};
export default SidebarCyberBugs;
