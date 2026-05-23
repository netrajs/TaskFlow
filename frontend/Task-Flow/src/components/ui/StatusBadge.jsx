import React from "react";

const StatusBadge = ({ status }) => {
  let classes = "text-xs font-medium px-2.5 py-0.5 rounded-full capitalize ";

  if (status === "pending") {
    classes += "bg-purple-100 text-purple-800";
  } else if (status === "in-progress") {
    classes += "bg-blue-100 text-blue-800";
  } else if (status === "completed") {
    classes += "bg-green-100 text-green-800";
  }

  return <span className={classes}>{status ? status.replace("-", " ") : ""}</span>;
};

export default StatusBadge;
