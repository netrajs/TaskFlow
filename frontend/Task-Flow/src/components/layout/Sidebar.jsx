import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Zap,
  LayoutDashboard,
  CheckSquare,
  PlusSquare,
  Users,
  LogOut
} from "lucide-react";

const getInitials = (name) => {
  if (!name) return "";
  const parts = name.split(" ");
  if (parts.length > 1) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name[0].toUpperCase();
};

const Sidebar = () => {
  const { user, logout } = useAuth();

  const isAdmin = user?.role === "admin";

  const links = isAdmin
    ? [
        { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Manage Tasks", path: "/admin/tasks", icon: CheckSquare },
        { name: "Create Task", path: "/admin/create-task", icon: PlusSquare },
        { name: "Team Members", path: "/admin/users", icon: Users }
      ]
    : [
        { name: "Dashboard", path: "/user/dashboard", icon: LayoutDashboard },
        { name: "My Tasks", path: "/user/tasks", icon: CheckSquare }
      ];

  return (
    <aside className="w-64 min-h-screen bg-[#0A1929] flex flex-col fixed left-0 top-0 border-r border-white/5">
      <div className="p-4 border-b border-white/10 flex items-center gap-3">
        <Zap className="text-blue-400" fill="currentColor" size={24} />
        <span className="text-white font-bold text-xl">TaskFlow</span>
      </div>

      <div className="p-4 border-b border-white/10 flex items-center gap-3">
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt={user.name}
            className="rounded-full w-10 h-10 object-cover border border-white/10"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
            {getInitials(user?.name)}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-white text-sm font-medium truncate">
              {user?.name || "User"}
            </span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold ${
                isAdmin
                  ? "bg-blue-500/20 text-blue-300"
                  : "bg-gray-500/20 text-gray-300"
              }`}
            >
              {user?.role}
            </span>
          </div>
          <p className="text-gray-400 text-xs truncate">{user?.email}</p>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#1C3A5E] border-l-4 border-[#0065FF] text-white rounded-r-lg"
                  : "text-[#B8C7E0] hover:bg-[#1C3A5E] hover:text-white rounded-lg"
              }`
            }
          >
            <link.icon size={18} />
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={logout}
          className="text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors font-medium"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
