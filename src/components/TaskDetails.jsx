/* eslint-disable react/prop-types */
import { RiCalendarLine } from "@remixicon/react";
import CustomCheckbox from "./CustomCheckbox";
import { FaRegBell, FaRegStar, FaStar } from "react-icons/fa";
import { useState } from "react";
import { BsPlusLg, BsRepeat } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { RiDeleteBin6Fill } from "react-icons/ri";

const TaskDetails = ({ theme, task, onDelete, onClose }) => {
  const items = [
    { Icon: BsPlusLg, text: "Add Step" },
    { Icon: FaRegBell, text: "Set Reminder" },
    { Icon: RiCalendarLine, text: "Add Due Date" },
    { Icon: BsRepeat, text: "Repeat" },
  ];

  const starStyle = `cursor-pointer size-5 text-[#000] ${
    theme === "dark" ? "text-[#fff]" : "text-[#000]"
  }`;

  const [isToggled, setIsToggled] = useState(false);

  if (!task) {
    return (
      <div
        className={`w-[20rem] ${
          theme === "dark" ? "bg-dark-200 text-[#fff] " : "bg-[#eef6ef]"
        } p-6 flex flex-col justify-between h-full`}
      >
        <p className={theme === "dark" ? "text-white" : "text-gray-800"}>
          Select a task to view details.
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className={`w-[20rem] ${
          theme === "dark" ? "bg-dark-200 text-[#fff] " : "bg-[#eef6ef]"
        } p-6 flex flex-col justify-between h-full`}
      >
        <div>
          <hr
            className={` border-${
              theme === "dark" ? "gray-700" : "gray-100"
            } border my-4 mt-8 `}
          />
          <div className=" flex items-center justify-between my-4 ">
            <div className=" flex items-center gap-x-4 ">
              <CustomCheckbox checked={task.completed} />
              <h3
                className={`font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                {task.text}
              </h3>
            </div>

            {isToggled ? (
              <FaStar
                onClick={() => setIsToggled(!isToggled)}
                className={starStyle}
              />
            ) : (
              <FaRegStar
                onClick={() => setIsToggled(!isToggled)}
                className={starStyle}
              />
            )}
          </div>

          <hr
            className={` border-${
              theme === "dark" ? "gray-700" : "gray-100"
            } border my-4 `}
          />

          <ul className="space-y-3">
            {items.map((item, index) => (
              <div key={index}>
                <li className="flex items-center cursor-pointer space-x-2">
                  <item.Icon size={20} />
                  <span
                    className={`font-normal text-sm ${
                      theme === "dark" ? "text-white" : ""
                    }`}
                  >
                    {item.text}
                  </span>
                </li>

                <hr
                  className={` border-${
                    theme === "dark" ? "gray-700" : "gray-100"
                  } border my-4 `}
                />
              </div>
            ))}
          </ul>

          <span
            className={
              " font-normal ml-7 text-sm " +
              (theme === "dark" ? "text-[#fff]" : "text-gray-200")
            }
          >
            Add Notes
          </span>
        </div>

        <div className=" mt-auto">
          <hr
            className={` border-${
              theme === "dark" ? "gray-700" : "gray-100"
            } border my-4 `}
          />

          <div className="  flex justify-between items-center ">
            <RxCross2
              className=" cursor-pointer "
              onClick={onClose}
              size={18}
            />

            <h3
              className={
                " font-medium text-sm " +
                (theme === "dark" ? "text-[#fff]" : "text-gray-200")
              }
            >
              Created Today
            </h3>

            <RiDeleteBin6Fill
              size={18}
              onClick={() => onDelete(task.id)}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskDetails;
