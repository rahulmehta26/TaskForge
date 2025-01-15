/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";

function Form({ onLogin }) {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.email && userData.password) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (u) => u.email === userData.email && u.password === userData.password
      );
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(login(userData));
        onLogin();
      } else {
        alert("Invalid credentials");
      }
    } else {
      alert("Please enter both email and password.");
    }
  };

  return (
    <form
      className="w-full h-[100vh] flex items-center justify-center border"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center justify-center flex-col space-y-4 w-1/3 mx-auto">
        <h1 className="text-2xl font-bold">Please log in to continue</h1>
        <input
          className="border-2 border-gray-300 p-2 w-full rounded-md focus:outline-none"
          type="text"
          placeholder="Enter your email"
          onChange={handleChange}
          name="email"
          value={userData.email}
        />
        <input
          className="border-2 border-gray-300 p-2 w-full rounded-md focus:outline-none"
          type="password"
          placeholder="Enter your password"
          onChange={handleChange}
          name="password"
          value={userData.password}
        />
        <button
          type="submit"
          className="text-white bg-blue-500 hover:bg-blue-700 p-2 rounded-md w-full"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default Form;
