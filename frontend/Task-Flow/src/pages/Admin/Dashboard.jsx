import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import ApiPaths from "../../utils/ApiPaths";
import { BarChart2, Clock, Loader, CheckCircle, Calendar } from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import StatusBadge from "../../components/ui/StatusBadge";
import PriorityBadge from "../../components/ui/PriorityBadge";
import AvatarGroup from "../../components/ui/AvatarGroup";

const getFormattedDate = () => {
  const d = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayName = days[d.getDay()];
  const dateNum = d.getDate();
  const monthName = months[d.getMonth()];
  const year = d.getFullYear();

  let suffix = "th";
  if (dateNum === 1 || dateNum === 21 || dateNum === 31) suffix = "st";
  else if (dateNum === 2 || dateNum === 22) suffix = "nd";
  else if (dateNum === 3 || dateNum === 23) suffix = "rd";

  return `${dayName} ${dateNum}${suffix} ${monthName} ${year}`;
};

const getGreeting = () => {
  const hrs = new Date().getHours();
  if (hrs < 12) return "Good Morning";
  if (hrs < 17) return "Good Afternoon";
  return "Good Evening";
};

const Dashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState({ stats: null, loading: true, error: null });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axiosInstance.get(ApiPaths.TASKS.GET_DASHBOARD_DATA);
        setData({ stats: response.data, loading: false, error: null });
      } catch (err) {
        setData({ stats: null, loading: false, error: err.message });
      }
    };
    fetchDashboardData();
  }, []);

  if (data.loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  const { stats } = data;

  const statsConfig = [
    { label: "Total Tasks", value: stats?.totalTasks || 0, icon: BarChart2, border: "border-blue-500", iconColor: "text-blue-500" },
    { label: "Pending", value: stats?.pendingTasks || 0, icon: Clock, border: "border-purple-500", iconColor: "text-purple-500" },
    { label: "In Progress", value: stats?.inProgressTasks || 0, icon: Loader, border: "border-yellow-500", iconColor: "text-yellow-500" },
    { label: "Completed", value: stats?.completedTasks || 0, icon: CheckCircle, border: "border-green-500", iconColor: "text-green-500" }
  ];

  const pieData = [
    { name: "Pending", value: stats?.pendingTasks || 0, color: "#7C3AED" },
    { name: "In Progress", value: stats?.inProgressTasks || 0, color: "#3B82F6" },
    { name: "Completed", value: stats?.completedTasks || 0, color: "#10B981" }
  ];

  const barData = [
    { name: "Low", value: stats?.tasksByPriority?.low || 0, fill: "#10B981" },
    { name: "Medium", value: stats?.tasksByPriority?.medium || 0, fill: "#F59E0B" },
    { name: "High", value: stats?.tasksByPriority?.high || 0, fill: "#EF4444" }
  ];

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {getGreeting()}! {user?.name || "Admin"}
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">{getFormattedDate()}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statsConfig.map((stat, idx) => (
          <div key={idx} className={`bg-white rounded-xl p-5 shadow-sm flex justify-between items-center border-l-4 ${stat.border}`}>
            <div>
              <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
            <stat.icon className={`${stat.iconColor} opacity-70`} size={28} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col h-[350px]">
          <h3 className="font-semibold text-gray-770 mb-4">Task Distribution</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col h-[350px]">
          <h3 className="font-semibold text-gray-770 mb-4">Task Priority Levels</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: "#f3f4f6" }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">Recent Tasks</h3>
          <Link to="/admin/tasks" className="text-blue-600 hover:underline text-sm font-medium">
            See All &rarr;
          </Link>
        </div>

        <div className="divide-y divide-gray-100">
          {stats?.recentTasks && stats.recentTasks.length > 0 ? (
            stats.recentTasks.map((task) => {
              const totalChecklist = task.todoChecklist?.length || 0;
              const completedChecklist = task.todoChecklist?.filter((t) => t.completed).length || 0;
              const percentage = totalChecklist > 0 ? (completedChecklist / totalChecklist) * 100 : 0;

              return (
                <div key={task._id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 first:pt-0 last:pb-0">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-medium text-gray-900 truncate max-w-[300px]">{task.title}</h4>
                      <StatusBadge status={task.status} />
                      <PriorityBadge priority={task.priority} />
                    </div>
                    {task.dueDate && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Calendar size={12} />
                        <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-6">
                    {totalChecklist > 0 && (
                      <div className="w-32 hidden sm:block">
                        <div className="flex justify-between text-[10px] text-gray-500 font-semibold mb-1">
                          <span>Checklist</span>
                          <span>{completedChecklist}/{totalChecklist}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-blue-500 h-full rounded-full transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    )}
                    <AvatarGroup users={task.assignedTo} />
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-sm py-4">No recent tasks found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
