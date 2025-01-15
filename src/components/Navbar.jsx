/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { RiMenu2Line, RiMoonClearLine, RiSearch2Line } from "@remixicon/react";
import { useState } from "react";
import { BsGrid } from "react-icons/bs";
import { IoIosMenu } from "react-icons/io";
import { LuSun } from "react-icons/lu";
import { TfiMenuAlt } from "react-icons/tfi";

const NavBar = ({toggleTheme, theme, toggleSidebar, toggleGrid }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isToggled, setIsToggled] = useState(false);

  const handleToggleGrid = () => {
         setIsToggled(!isToggled);
         toggleGrid();
  }

  const iconStyle = ` ${ theme === "dark" ? "text-[#fff]" : "text-[#1b281b]" } `

  const currentTheme = document.documentElement.getAttribute("data-theme");

  return (
    <nav className={` ${ theme === 'dark' ? " bg-dark-300 " : "bg-[#fff] " } `}>
      <div className="w-dvw mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              className="text-green-700 md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <RiMenu2Line size={24} /> : <RiMenu2Line size={24} />}
            </button>

            <button
            onClick={ () => toggleSidebar()}
            >
              <IoIosMenu size={28} className={ iconStyle} />
            </button>

            <span className="ml-4 text-green-100 text-lg font-bold flex items-center">
              <span className="text-2xl">
                <img
                  src="/logo.png"
                  className=" w-8 h-8 object-cover object-center"
                />
              </span>{" "}
              DoIt
            </span>
          </div>

          <div className="hidden md:flex space-x-6">
            <button className={ iconStyle}>
              <RiSearch2Line size={20} />
            </button>

            {isToggled ? (
              <button
                onClick={handleToggleGrid}
                className={ iconStyle}
              >
                <BsGrid size={20} />
              </button>
            ) : (
              <button
                onClick={handleToggleGrid}
                className={ iconStyle}
              >
                <TfiMenuAlt size={20} />
              </button>
            )}

            <button onClick={toggleTheme} className={ iconStyle}>
              {currentTheme === "light" ? (
                <RiMoonClearLine size={24} />
              ) : (
                <LuSun size={24} />
              )}
            </button>
          </div>

          {isOpen && (
            <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden">
              <ul className="flex flex-col items-center py-4 space-y-4">
                <li>
                  <button className="text-gray-700  flex items-center">
                    <RiSearch2Line size={20} className="mr-2" /> Search
                  </button>
                </li>
                <li>
                  <button className="text-gray-700  flex items-center">
                    <BsGrid size={20} className="mr-2" /> Dashboard
                  </button>
                </li>
                <li>
                  <button className="text-gray-700 flex items-center">
                    <RiMoonClearLine size={20} className="mr-2" /> History
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
