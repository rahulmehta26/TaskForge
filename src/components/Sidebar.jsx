/* eslint-disable react/prop-types */
import { RiCalendarLine, RiStarLine, RiUserLine } from "@remixicon/react";
import { IoAddOutline } from "react-icons/io5";
import { LuMap } from "react-icons/lu";
import { TbClipboardText } from "react-icons/tb";
import TaskChart from "./TaskChart";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Sidebar = ({ theme }) => {
  const [activeItem, setActiveItem] = useState(1);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const storedName = localStorage.getItem("name") || "User";
    setUserName(storedName);
  }, []);

  const activeBG = (id) =>
    `flex items-center cursor-pointer space-x-3 p-3 rounded ${
      activeItem === id
        ? theme === "dark"
          ? "bg-green-300 text-green-400"
          : "bg-green-50"
        : theme === "dark"
        ? "hover:bg-green-300"
        : "hover:bg-green-50"
    } transition-colors duration-200`;

  const menuItems = [
    { id: 1, icon: TbClipboardText, text: "All Tasks" },
    { id: 2, icon: RiCalendarLine, text: "Today" },
    { id: 3, icon: RiStarLine, text: "Important" },
    { id: 4, icon: LuMap, text: "Planned" },
    { id: 5, icon: RiUserLine, text: "Assigned to me" },
  ];

  const tasks = useSelector((state) => state.tasks.items);
  const completedTasks = useSelector((state) => state.tasks.completedTasks);

  const totalTasks = tasks.length;
  const completedTask = completedTasks.length;

  return (
    <aside
      className={`relative mt-24 w-72 p-6 rounded ${
        theme === "dark" ? "bg-dark-200" : "bg-gray-50"
      }`}
    >
      <div className="flex absolute -top-16 left-20 flex-col items-center">
        <img
          src=" "
          alt="User"
          className="w-32 h-32 object-cover object-center rounded-full mb-3"
          onError={(e) => {
            e.target.src = "/profile.png";
          }}
        />
        <p
          className={`font-bold text-lg ${
            theme === "dark" ? "text-[#fff]" : "text-gray-800"
          }`}
        >
          Hey, {userName}
        </p>
      </div>
      <div
        className={`mt-[5.5rem] py-4 rounded ${
          theme === "dark" ? "bg-dark-50" : "bg-white-50"
        }`}
      >
        <ul className="space-y-4 px-4">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={activeBG(item.id)}
              onClick={() => setActiveItem(item.id)}
            >
              <item.icon
                size={22}
                className={theme === "dark" ? "text-[#fff]" : "text-dark-200"}
              />
              <span
                className={`font-medium ${
                  theme === "dark" ? "text-[#fff]" : ""
                }`}
              >
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`mt-6 flex items-center gap-x-3 px-5 py-4 rounded ${
          theme === "dark" ? " bg-dark-50" : "bg-white-50"
        }`}
      >
        <IoAddOutline size={24} className="text-green-700" />
        <h3 className={` font-medium ${theme === "dark" ? "text-[#fff]" : ""}`}>
          Add list
        </h3>
      </div>
      <div
        className={`mt-6 py-6 px-5 rounded ${
          theme === "dark" ? " bg-dark-50" : "bg-white-50"
        }`}
      >
        <TaskChart
          totalTasks={totalTasks}
          theme={theme}
          completedTasks={completedTask}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
