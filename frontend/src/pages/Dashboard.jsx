import { useEffect, useState } from "react";

import API from "../api/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
  FaTasks,
  FaProjectDiagram,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    pendingTasks: 0,
    completedTasks: 0,
  });

  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    fetchDashboard();

    fetchTasks();
  }, []);

  // FETCH DASHBOARD
  const fetchDashboard = async () => {
    try {
      const { data } = await API.get(
        "/dashboard"
      );

      setStats(data || {});
    } catch (error) {
      console.log(error);

      setError(
        error?.response?.data?.message ||
          "Dashboard API Error"
      );
    }
  };

  // FETCH TASKS
  const fetchTasks = async () => {
    try {
      const { data } = await API.get(
        "/tasks"
      );

      setTasks(data || []);
    } catch (error) {
      console.log(error);

      setError(
        error?.response?.data?.message ||
          "Tasks API Error"
      );
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Projects",
      value:
        stats?.totalProjects || 0,

      icon: <FaProjectDiagram />,

      color: "text-blue-500",

      bg: "bg-blue-100",
    },

    {
      title: "Tasks",
      value:
        stats?.totalTasks || 0,

      icon: <FaTasks />,

      color: "text-green-500",

      bg: "bg-green-100",
    },

    {
      title: "Pending",
      value:
        stats?.pendingTasks || 0,

      icon: <FaClock />,

      color: "text-yellow-500",

      bg: "bg-yellow-100",
    },

    {
      title: "Completed",
      value:
        stats?.completedTasks || 0,

      icon: <FaCheckCircle />,

      color: "text-purple-500",

      bg: "bg-purple-100",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex bg-slate-100 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          {/* ERROR */}
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-2xl mb-6">
              {error}
            </div>
          )}

          {/* HEADER */}
          <div className="mb-10">

            <h1 className="text-4xl font-bold text-slate-800">
              Dashboard Overview
            </h1>

            <p className="text-slate-500 mt-2">
              Manage projects and
              track tasks efficiently
            </p>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

            {cards?.map(
              (card, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-3xl shadow-md hover:shadow-xl transition"
                >

                  <div className="flex justify-between items-center">

                    <div>

                      <h2 className="text-4xl font-bold text-slate-800">
                        {card?.value || 0}
                      </h2>

                      <p className="text-slate-500 mt-2">
                        {card?.title}
                      </p>

                    </div>

                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${card?.bg} ${card?.color}`}
                    >
                      {card?.icon}
                    </div>

                  </div>
                </div>
              )
            )}

          </div>

          {/* TASKS */}
          <div className="bg-white p-6 rounded-3xl shadow-md">

            <div className="flex justify-between items-center mb-8">

              <div>

                <h2 className="text-3xl font-bold text-slate-800">
                  Recent Tasks
                </h2>

                <p className="text-slate-500 mt-1">
                  Track your latest
                  tasks
                </p>

              </div>

              <div className="bg-blue-100 text-blue-700 px-5 py-3 rounded-2xl font-bold">
                {tasks?.length || 0} Tasks
              </div>

            </div>

            {/* TASK GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {tasks?.length > 0 ? (
                tasks?.map((task) => (
                  <div
                    key={task?._id}
                    className="border border-slate-200 rounded-3xl p-6 bg-slate-50 hover:shadow-lg transition"
                  >

                    {/* STATUS */}
                    <div className="flex justify-between items-center mb-5">

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-bold
                        ${
                          task?.status ===
                          "Done"
                            ? "bg-green-100 text-green-700"
                            : task?.status ===
                              "In Progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {task?.status ||
                          "Todo"}
                      </span>

                      <span className="text-sm text-slate-400">

                        {task?.dueDate
                          ? new Date(
                              task?.dueDate
                            ).toLocaleDateString()
                          : "No Due Date"}

                      </span>

                    </div>

                    {/* TITLE */}
                    <h2 className="text-2xl font-bold text-slate-800 mb-3">

                      {task?.title ||
                        "Untitled Task"}

                    </h2>

                    {/* DESCRIPTION */}
                    <p className="text-slate-500">

                      {task?.description ||
                        "No description available"}

                    </p>

                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-10">

                  <h2 className="text-2xl font-bold text-slate-700">
                    No Tasks Found
                  </h2>

                  <p className="text-slate-500 mt-3">
                    Create tasks to see
                    them here
                  </p>

                </div>
              )}

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;