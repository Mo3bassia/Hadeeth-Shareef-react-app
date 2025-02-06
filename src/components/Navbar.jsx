import React from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-lg p-4">
      <div className="flex-1">
        <Link
          to={"/"}
          className="btn btn-ghost text-xl md:text-2xl lg:text-3xl font-bold hover:bg-blue-500 hover:text-white transition-colors"
        >
          حديث شريف
        </Link>
      </div>

      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal gap-2">
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `px-4 hover:bg-blue-500 hover:text-white transition-colors ${
                  isActive ? "bg-blue-500 text-white" : ""
                }`
              }
            >
              الرئيسية
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/hadiths"}
              className={({ isActive }) =>
                `px-4 hover:bg-blue-500 hover:text-white transition-colors ${
                  isActive ? "bg-blue-500 text-white" : ""
                }`
              }
            >
              الأحاديث
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="md:hidden">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle hover:bg-blue-500 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[999] mt-3 w-52 p-2 shadow-lg"
          >
            <li>
              <NavLink to={"/"}>الرئيسية</NavLink>
            </li>
            <li>
              <NavLink to={"/hadiths"}>الأحاديث</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
