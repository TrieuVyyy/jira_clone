import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logOut } from "../../redux/userSlice";
export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice.user);
  let handleLogout = () => {
    dispatch(logOut());
  };
  let renderMenu = () => {
    let cssBtn =
      "rounded px-3 py-1 border-2 border-black text-decoration-none text-gray-500";
    if (user) {
      // đã đăng nhập
      return (
        <>
          <span className="text-black">
            Hello <span className="uppercase">{user.name}</span> !
          </span>
          <button className={cssBtn} onClick={handleLogout}>
            Logout
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
          <NavLink to="/signup" className={cssBtn}>
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
