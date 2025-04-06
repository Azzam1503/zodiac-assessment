import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-evenly items-center space-x-4 bg-gray-800 p-4 bg:teal-900 text-white">
      <NavLink className="hover:underline text-lg" to={"/"}>
        Line
      </NavLink>
      <NavLink className="hover:underline text-lg" to={"/bar"}>
        Bar
      </NavLink>
      <NavLink className="hover:underline text-lg" to={"/pie"}>
        Pie
      </NavLink>
    </div>
  );
};

export default Navbar;
