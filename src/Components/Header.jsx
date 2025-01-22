import React from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <>
      <nav className="flex justify-between bg-gray-800 p-4 fixed top-0 w-full">
        <ol className="flex space-x-8 text-lg">
          <li className="underline font-bold text-xl bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent ">
            Personal Job Application Tracker
          </li>
          <NavLink
            to="/"
            className={(isActive) =>
              isActive ? "text-blue-400 underline" : "text-white"
            }
          >
            <li>Home</li>
          </NavLink>
          <li>About</li>
        </ol>
        <div>
          <div className="bg-white min-w-3 rounded-full"></div>
          <h1>Profile</h1>
        </div>
      </nav>
    </>
  );
}

export default Header;
