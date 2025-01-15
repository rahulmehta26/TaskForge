/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  RiCalendarLine,
  RiNotification3Line,
  RiRepeat2Line,
  RiStarLine,
} from "@remixicon/react";
import { useState } from "react";
import { FaCaretDown, FaRegBell, FaRegStar, FaStar } from "react-icons/fa";
import CustomCheckbox from "./CustomCheckbox";
import { BsRepeat } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  addTaskToCompleted,
  deleteTask,
  deleteTaskFromCompleted,
} from "../redux/slices/taskSlice";

const TaskList = ({ isGrid, theme, selectedTask, onTaskClick }) => {
  const taskList = useSelector((state) => state.tasks.items);
  const completedTasks = useSelector((state) => state.tasks.completedTasks);
  const dispatch = useDispatch();

  const [task, setTask] = useState("");

  const handleAddTask = () => {
    if (task.trim()) {
      dispatch(
        addTask({
          id: Date.now(),
          text: task,
          completed: false,
          important: false,
          dueDate: null,
        })
      );
      setTask("");
    }
  };

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
    if (selectedTask?.id === taskId) {
      onTaskClick(null); 
    }
  };

  const handleCheck = (taskId, checked) => {
    if (checked) {
      const task = taskList.find((task) => task.id === taskId);
      dispatch(addTaskToCompleted(task));
    } else {
      dispatch(deleteTaskFromCompleted(taskId));
    }
  };

  const starStyle = `cursor-pointer size-5 ${
    theme === "dark" ? "text-[#fff]" : "text-[#000]"
  }`;

  return (
    <div
      className={`flex-1 p-6 ${theme === "dark" ? "bg-dark-50 " : "bg-[#fff]"}`}
    >
      <div className=" flex items-center gap-x-2 mb-3 ">
        <h2
          className={`text-lg  font-bold ${
            theme === "dark" ? "text-[#fff]" : "text-gray-400"
          }`}
        >
          To Do
        </h2>

        <FaCaretDown
          className={` ${theme === "dark" ? "text-[#fff]" : "text-gray-400"}  `}
          size={18}
        />
      </div>

      <div
        className={`h-40 flex flex-col justify-between ${
          theme === "dark"
            ? "bg-dark-100"
            : "bg-gradient-to-t from-gray-300 via-white-100 to-white-50"
        } p-4 rounded`}
      >
        <div className="mt-8">
          <input
            value={task}
            placeholder="Add a task"
            style={{
              placeholder: theme === "dark" ? "#fff" : "#000",
            }}
            onChange={(e) => setTask(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleAddTask();
            }}
            className={" bg-transparent w-[50%] p-2 outline-none " + ( theme === "dark" ? "text-[#fff]" : "" ) }
          />
        </div>

        <div className="flex items-center justify-between space-x-4">
          <div className="flex space-x-4">
            <FaRegBell
              size={20}
              className={`${
                theme === "dark" ? "text-[#fff]" : "text-[#1b281b]"
              }`}
            />
            <BsRepeat
              size={20}
              className={`${
                theme === "dark" ? "text-[#fff]" : "text-[#1b281b]"
              }`}
            />
            <RiCalendarLine
              size={20}
              className={`${
                theme === "dark" ? "text-[#fff]" : "text-[#1b281b]"
              }`}
            />
          </div>

          <button
            onClick={handleAddTask}
            className={` ${
              theme === "dark"
                ? "bg-green-500 text-[#fff] "
                : "bg-green-50 text-green-200 "
            }  font-medium  px-4 py-2 rounded`}
          >
            ADD TASK
          </button>
        </div>
      </div>

      <div
        className={`mt-6 grid ${
          isGrid
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            : "gap-2"
        }`}
      >
        {taskList &&
          taskList?.map((task) => (
            <div
              key={task.id}
              onClick={() => onTaskClick(task)}
              className={` ${
                isGrid
                  ? "py-8 px-4 border cursor-pointer border-gray-100 rounded flex justify-between items-center bg-white"
                  : "border rounded-lg cursor-pointer p-4 flex justify-between items-center"
              } `}
            >
              <div className=" flex gap-x-4 ">
                <CustomCheckbox
                  checked={task.completed}
                  onChange={() => handleCheck(task.id, !task.completed)}
                />
                <span
                  className={`${theme === "dark" ? " text-[#fff] " : "  "}`}
                >
                  {task.text}
                </span>
              </div>

              {task.important === "true" ? (
                <FaStar className={starStyle} />
              ) : (
                <FaRegStar className={starStyle} />
              )}
            </div>
          ))}
      </div>

      {completedTasks.length > 0 && (
        <div className="mt-6">
          <h2
            className={`text-lg font-bold ${
              theme === "dark" ? "text-[#fff]" : "text-gray-400"
            }`}
          >
            Completed Tasks
          </h2>
          <ul>
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className={` mt-4 ${
                  isGrid
                    ? "py-8 px-4 border cursor-pointer border-gray-100 rounded flex justify-between items-center bg-white"
                    : "border rounded-lg cursor-pointer p-4 flex justify-between items-center"
                } `}
              >
                <div className=" flex gap-x-4 ">
                  <CustomCheckbox
                    checked={true}
                    onChange={() => handleCheck(task.id, false)}
                  />
                  <span
                    className={`${
                      theme === "dark" ? " text-[#fff] " : "  "
                    } line-through `}
                  >
                    {task.text}
                  </span>
                </div>

                {task.important === "true" ? (
                  <FaStar className={starStyle} />
                ) : (
                  <FaRegStar className={starStyle} />
                )}
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TaskList;
