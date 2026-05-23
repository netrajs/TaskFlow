import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import ApiPaths from "../../utils/ApiPaths";
import { Download } from "lucide-react";

const getInitials = (name) => {
  if (!name) return "";
  const parts = name.split(" ");
  if (parts.length > 1) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name[0].toUpperCase();
};

const ManageUser = () => {
  const [data, setData] = useState({ users: [], loading: true });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(ApiPaths.USERS.GET_ALL);
        setData({ users: response.data, loading: false });
      } catch (error) {
        setData({ users: [], loading: false });
      }
    };
    fetchUsers();
  }, []);

  const downloadReport = () => {
    const headers = ["Name", "Email", "Role", "Pending", "In Progress", "Completed"];
    const rows = data.users.map((user) => [
      user.name,
      user.email,
      user.role,
      user.taskStats?.pending || 0,
      user.taskStats?.inProgress || 0,
      user.taskStats?.completed || 0
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\n" +
      rows.map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "team_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (data.loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Team Members</h1>
        <button
          onClick={downloadReport}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-sm"
        >
          <Download size={18} />
          <span>Download Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.users.map((member) => (
          <div
            key={member._id}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col items-center"
          >
            {member.profileImageUrl ? (
              <img
                src={member.profileImageUrl}
                alt={member.name}
                className="w-16 h-16 rounded-full mx-auto mb-3 object-cover border border-gray-100"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl mx-auto mb-3 shadow-sm">
                {getInitials(member.name)}
              </div>
            )}

            <h3 className="font-semibold text-gray-800 text-lg text-center truncate w-full">
              {member.name}
            </h3>
            <p className="text-sm text-gray-500 mb-4 text-center truncate w-full">
              {member.email}
            </p>

            <div className="flex justify-center gap-3 w-full border-t border-gray-55 pt-4 mt-auto">
              <div className="bg-purple-100 text-purple-750 text-xs font-semibold px-3 py-1 rounded-full flex flex-col items-center">
                <span>Pending</span>
                <span className="font-bold text-sm mt-0.5">{member.taskStats?.pending || 0}</span>
              </div>
              <div className="bg-blue-100 text-blue-750 text-xs font-semibold px-3 py-1 rounded-full flex flex-col items-center">
                <span>Active</span>
                <span className="font-bold text-sm mt-0.5">
                  {member.taskStats?.inProgress || 0}
                </span>
              </div>
              <div className="bg-green-100 text-green-755 text-xs font-semibold px-3 py-1 rounded-full flex flex-col items-center">
                <span>Done</span>
                <span className="font-bold text-sm mt-0.5">
                  {member.taskStats?.completed || 0}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUser;
