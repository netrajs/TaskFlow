import React from "react";

const PriorityBadge = ({ priority }) => {
  let classes = "text-xs font-medium px-2.5 py-0.5 rounded-full capitalize ";

  if (priority === "low") {
    classes += "bg-green-100 text-green-800 border border-green-200";
  } else if (priority === "medium") {
    classes += "bg-yellow-100 text-yellow-800 border border-yellow-200";
  } else if (priority === "high") {
    classes += "bg-red-100 text-red-800 border border-red-200";
  }

  return <span className={classes}>{priority}</span>;
};

export default PriorityBadge;
