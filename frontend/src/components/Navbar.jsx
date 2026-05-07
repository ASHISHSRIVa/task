import { useAuth } from "../context/AuthContext";

import {
  FaBell,
  FaSearch,
} from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="h-[90px] bg-[#0f172a]/80 backdrop-blur-lg border-b border-white/10 px-8 flex items-center justify-between">

      <div>

        <h1 className="text-3xl font-black text-white">
          Welcome Back 👋
        </h1>

        <p className="text-slate-400 mt-1">
          Manage your workflow efficiently
        </p>

      </div>

      <div className="flex items-center gap-5">

        <div className="hidden lg:flex items-center bg-white/5 border border-white/10 px-5 py-3 rounded-2xl w-[320px]">

          <FaSearch className="text-slate-400" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-3 text-white w-full"
          />

        </div>

        <button className="relative w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">

          <FaBell className="text-xl" />

          <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full"></span>

        </button>

        <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">

          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
            {user?.name?.charAt(0)}
          </div>

          <div>
            <h2 className="font-bold text-white">
              {user?.name}
            </h2>

            <button
              onClick={logout}
              className="text-sm text-red-400 hover:text-red-500"
            >
              Logout
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Navbar;