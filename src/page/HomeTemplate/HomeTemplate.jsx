import React from "react";
import SidebarCyberBugs from "../HomePage/SidebarCyberBugs";
import { Outlet } from "react-router-dom";
import MenuCyberBug from "../HomePage/MenuCyberBug";
import ModalCyberBugs from "../HomePage/Modal/ModalCyberBugs";

export default function HomeTemplate() {
  return (
    <div className="jira">
      <div className="float-left">
        <SidebarCyberBugs />
      </div>
      <div className="float-start mr-5">
        <MenuCyberBug />
      </div>
      <div className="flow-root">
        <Outlet />
      </div>
    </div>
  );
}
