import { Link, useLocation } from "react-router-dom";

import {
  FaHome,
  FaTasks,
  FaProjectDiagram,
  FaUsers,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const location = useLocation();

  const { user } = useAuth();

  const menus = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },

    {
      name: "Tasks",
      path: "/tasks",
      icon: <FaTasks />,
    },
  ];

  if (user?.role === "Admin") {
    menus.push(
      {
        name: "Projects",
        path: "/projects",
        icon: <FaProjectDiagram />,
      },

      {
        name: "Team",
        path: "/team",
        icon: <FaUsers />,
      }
    );
  }

  return (
    <div className="w-[280px] min-h-screen bg-[#020617] border-r border-white/10 p-6 flex flex-col">

      <div className="mb-12">

        <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
          TaskFlow
        </h1>

        <p className="text-slate-400 mt-2 text-sm">
          Team Management System
        </p>

      </div>

      <div className="flex flex-col gap-3">

        {menus.map((menu) => (

          <Link
            key={menu.path}
            to={menu.path}
            className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group
            ${
              location.pathname === menu.path
                ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >

            <div className="text-xl">
              {menu.icon}
            </div>

            <span className="font-semibold">
              {menu.name}
            </span>

          </Link>

        ))}

      </div>

      <div className="mt-auto bg-gradient-to-r from-indigo-500 to-purple-600 p-5 rounded-3xl">

        <h2 className="text-xl font-bold text-white">
          Upgrade Pro 🚀
        </h2>

        <p className="text-sm text-white/80 mt-2">
          Unlock advanced analytics & reports
        </p>

        <button className="mt-4 bg-white text-black px-4 py-3 rounded-xl font-bold w-full">
          Upgrade
        </button>

      </div>

    </div>
  );
};

export default Sidebar;