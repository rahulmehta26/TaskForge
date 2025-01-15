/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { MdError } from "react-icons/md";

const TaskChart = ({ totalTasks, completedTasks, theme }) => {
  const pendingTasks = totalTasks - completedTasks;
  const completedPercentage = (completedTasks / totalTasks) * 100 || 0;

  return (
    <div className=" flex flex-col">
      <div className=" flex justify-between">
        <div>
          <p className={" text-sm font-semibold" + (theme === "dark" ? " text-[#fff]" : "") }>Today Tasks</p>
          <h1 className={"text-4xl font-bold" + (theme === "dark" ? " text-[#fff]" : "") }>{totalTasks}</h1>
        </div>

        <MdError size={18} className=" text-gray-100 " />
      </div>

      <hr className=" border-gray-100 border my-4 mt-10 " />

      <div className="relative self-center w-44 h-44 mt-4">
        <svg className="w-full h-full" viewBox="0 0 44 44">
          <circle
            cx="18"
            cy="18"
            r="14"
            fill="none"
            stroke="#3F9142"
            strokeWidth="8"
          />

          <motion.circle
            cx="18"
            cy="18"
            r="14"
            fill="none"
            stroke= "#142e15"
            strokeWidth="8"
            strokeDasharray={`${completedPercentage}, 100`}
            initial={{ strokeDasharray: "0, 100" }}
            animate={{ strokeDasharray: `${completedPercentage}, 100` }}
            transition={{ duration: 1 }}
            transform="rotate(-90 18 18)"
          />
        </svg>
      </div>

      <div className={`flex justify-between items-center gap-x-5 w-32 text-sm ${theme === "dark" ? "text-[#fff]" : ""} `}>
        <div className="flex items-center">
          <span className={"w-3 h-3 rounded-full bg-[#3f9142] mr-1" }></span>{" "}
          Pending
        </div>

        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-[#142e15] mr-1"></span> Done
        </div>
      </div>
    </div>
  );
};

export default TaskChart;
