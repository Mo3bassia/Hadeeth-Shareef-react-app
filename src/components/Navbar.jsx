import React from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="backdrop-blur-md bg-gradient-to-b from-gray-900/90 to-transparent border-b border-white/10">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="relative group"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <img
              src="/logo-white-and-blue.png"
              className="w-32 sm:w-36 md:w-40 lg:w-44 relative"
              alt="حديث شريف"
            />
          </Link>

          <div className="hidden md:flex gap-4">
            {[
              { to: "/", label: "الرئيسية" },
              { to: "/hadiths", label: "الأحاديث" },
              { to: "/saved", label: "المحفوظات" }  // إضافة رابط المحفوظات
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm
                  ${isActive 
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25" 
                    : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="md:hidden">
            <div className="dropdown dropdown-end">
              <button
                className="p-2 rounded-lg backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h8"
                  />
                </svg>
              </button>
              <ul className="dropdown-content menu mt-2 p-2 rounded-lg backdrop-blur-md bg-gray-900/90 border border-white/10 w-52">
                {[
                  { to: "/", label: "الرئيسية" },
                  { to: "/hadiths", label: "الأحاديث" },
                  { to: "/saved", label: "المحفوظات" }  // إضافة رابط المحفوظات في القائمة المنسدلة
                ].map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `block px-4 py-2 rounded-lg transition-colors
                        ${isActive ? "text-blue-400" : "text-gray-300 hover:text-blue-400"}`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
