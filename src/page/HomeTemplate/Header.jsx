import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Header() {
  const user = useSelector((state) => state.userSlice);
  let handleLogout = () => {
    //xoá localStorage
    localStorage.removeItem("USER_INFOR");
    window.location.reload();
  };
  let renderMenu = () => {
    let cssBtn = "rounded px-3 py-1 border-2 border-black";
    if (user) {
      // đã đăng nhập
      return (
        <>
          <span className="text-white">
            Hello <span className="uppercase">{user.name}</span> !
          </span>
          <button className={cssBtn} onClick={handleLogout}>
            1 Logout
          </button>
        </>
      );
    } else {
      return (
        <>
          <button
            onClick={() => {
              window.location.href = "/login";
            }}
            className={cssBtn}
          >
            Login
          </button>
          <NavLink to="/register" className={cssBtn}>
            Sign up
          </NavLink>
        </>
      );
    }
  };
  return (
    <header className=" w-full bg-white shadow-xl z-10">
      <div className="container mx-auto px-4 py-2 flex justify-end items-center">
        <div className="flex items-center space-x-2">{renderMenu()}</div>
      </div>
    </header>
  );
}
