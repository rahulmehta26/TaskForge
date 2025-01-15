import React from "react";

const CustomCheckbox = ({ checked, onChange }) => {
  const handleCheckboxChange = () => {
    onChange(!checked); 
  };

  return (
    <label className="flex items-center space-x-3 cursor-pointer">
      <input
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <span
        className={`w-4 h-4 border-2 rounded-sm transition-all duration-200 ${
          checked 
            ? "bg-green-200 border-green-200"
            : "bg-white border-gray-400"
        } flex justify-center items-center`}
      >
        {checked && ( 
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </span>
    </label>
  );
};

export default CustomCheckbox;
