import React from "react";

const getInitials = (name) => {
  if (!name) return "";
  const parts = name.split(" ");
  if (parts.length > 1) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name[0].toUpperCase();
};

const AvatarGroup = ({ users = [] }) => {
  const displayUsers = users.slice(0, 3);
  const extraCount = users.length - 3;

  return (
    <div className="flex items-center -space-x-2">
      {displayUsers.map((user, idx) => {
        if (user.profileImageUrl) {
          return (
            <img
              key={idx}
              src={user.profileImageUrl}
              alt={user.name || "User"}
              className="w-8 h-8 rounded-full border-2 border-white object-cover"
            />
          );
        }
        return (
          <div
            key={idx}
            className="w-8 h-8 rounded-full border-2 border-white bg-blue-500 text-white flex items-center justify-center text-xs font-bold"
          >
            {getInitials(user.name)}
          </div>
        );
      })}
      {extraCount > 0 && (
        <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-bold">
          +{extraCount}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
