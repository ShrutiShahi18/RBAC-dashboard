import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import officeBg from "./officebg.png";
import Analytics from "./Analytics";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const rolesPermissions = {
  admin: [
    "Manage Users",
    "Manage Roles",
    "Assign Permissions",
    "App Settings",
    "View Analytics",
    "View User Stats",
  ],
  user: ["View Insights", "Explore Features", "Get Started"],
};

const userStatsData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Users Growth",
      data: [0, 5, 10, 15, 20, 25, 30],
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      fill: true,
    },
  ],
};

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [role, setRole] = useState("user");
  const chartRef = useRef(null);

  const hasPermission = (permission) => rolesPermissions[role]?.includes(permission);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update();
    }
  }, [chartRef, userStatsData]);

  return (
    <div
      className="min-h-screen flex flex-col text-black"
      style={{
        backgroundImage: `url(${officeBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#f7fafc",
      }}
    >
      {/* Navbar */}
      <header className="w-full bg-opacity-70 backdrop-blur-md bg-white shadow-md z-40">
        <div className="container mx-auto flex justify-between items-center p-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-full bg-gray-200 text-black"
          >
            ☰
          </button>
          <h1 className="text-lg font-bold text-gray-700">Dashboard</h1>
          <select
            className="border rounded p-2"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 w-64 z-50`}
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={() => setIsSidebarOpen(false)}
        >
          ✖
        </button>
        <nav className="p-4 space-y-4">
          <ul>
            {rolesPermissions[role]?.map((permission, index) => (
              <li key={index} className="hover:text-gray-300">
                {permission}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col md:flex-row md:space-x-6 p-6 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {role === "admin" ? (
          <>
            {/* Admin Dashboard */}
            <div className="backdrop-blur-md bg-white/30 p-6 rounded-lg shadow-lg w-full md:w-1/3 min-w-[300px] mb-6 md:mb-0">
              <h1 className="text-2xl font-semibold text-center mb-6">
                Admin Dashboard
              </h1>
              <div className="space-y-4">
                {hasPermission("Manage Users") && (
                  <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                    Manage Users
                  </button>
                )}
                {hasPermission("Manage Roles") && (
                  <button className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                    Manage Roles
                  </button>
                )}
                {hasPermission("Assign Permissions") && (
                  <button className="w-full py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">
                    Assign Permissions
                  </button>
                )}
                {hasPermission("App Settings") && (
                  <button className="w-full py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
                    App Settings
                  </button>
                )}
              </div>
            </div>

            {/* Analytics and User Stats */}
            <div className="flex flex-col space-y-6 w-full md:w-2/3">
              {hasPermission("View Analytics") && (
                <div className="backdrop-blur-md bg-white/30 p-6 rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
                  <h2 className="text-xl font-semibold text-center mb-4">
                    User Analytics
                  </h2>
                  <div className="w-full max-h-64 overflow-auto flex items-center justify-center">
                    <Analytics />
                  </div>
                </div>
              )}

              {hasPermission("View User Stats") && (
                <div className="backdrop-blur-md bg-white/30 p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold text-center mb-4">
                    User Growth
                  </h2>
                  <div className="w-full">
                    <Line
                      ref={chartRef}
                      data={{
                        ...userStatsData,
                        datasets: [
                          {
                            ...userStatsData.datasets[0],
                            borderColor: "rgba(0, 0, 0, 1)",
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: { labels: { color: "black" } },
                        },
                        scales: {
                          x: { ticks: { color: "black" } },
                          y: { ticks: { color: "black" } },
                        },
                      }}
                      style={{ height: "300px" }}
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="backdrop-blur-md bg-white/30 p-8 rounded-lg shadow-lg w-full max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center mb-6">
              Welcome to Your Dashboard!
            </h1>
            <p className="text-center mb-4">
              Explore insights, track progress, and stay updated with your personalized dashboard.
            </p>
            <div className="space-y-4">
              <button className="w-full py-2 px-4 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition">
                View Insights
              </button>
              <button className="w-full py-2 px-4 bg-green-400 text-white rounded-lg hover:bg-green-500 transition">
                Explore Features
              </button>
              <button className="w-full py-2 px-4 bg-purple-400 text-white rounded-lg hover:bg-purple-500 transition">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
