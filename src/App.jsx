// App.jsx
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import TaskList from "./components/TaskList";
import TaskDetails from "./components/TaskDetails";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "./redux/slices/themeSlice";
import { deleteTask } from "./redux/slices/taskSlice";
import Form from "./components/Form";

function App() {
  const [isGrid, setIsGrid] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    const demoUsers = [
      {
        name: "Aarav Sharma",
        email: "aarav.sharma@example.com",
        password: "password123",
        gender: "Male",
        profileImage: "https://via.placeholder.com/150",
      },
      {
        name: "Ananya Gupta",
        email: "ananya.gupta@example.com",
        password: "password123",
        gender: "Female",
        profileImage: "https://via.placeholder.com/150",
      },
      {
        name: "Vivaan Verma",
        email: "vivaan.verma@example.com",
        password: "password123",
        gender: "Male",
        profileImage: "https://via.placeholder.com/150",
      },
      {
        name: "Diya Iyer",
        email: "diya.iyer@example.com",
        password: "password123",
        gender: "Female",
        profileImage: "https://via.placeholder.com/150",
      },
      {
        name: "Aditya Kapoor",
        email: "aditya.kapoor@example.com",
        password: "password123",
        gender: "Male",
        profileImage: "https://via.placeholder.com/150",
      },
      {
        name: "Ishika Malhotra",
        email: "ishika.malhotra@example.com",
        password: "password123",
        gender: "Female",
        profileImage: "https://via.placeholder.com/150",
      },
      {
        name: "Rohan Deshmukh",
        email: "rohan.deshmukh@example.com",
        password: "password123",
        gender: "Male",
        profileImage: "https://via.placeholder.com/150",
      },
      {
        name: "Meera Chatterjee",
        email: "meera.chatterjee@example.com",
        password: "password123",
        gender: "Female",
        profileImage: "https://via.placeholder.com/150",
      },
      {
        name: "Kabir Mehta",
        email: "kabir.mehta@example.com",
        password: "password123",
        gender: "Male",
        profileImage: "https://via.placeholder.com/150",
      },
      {
        name: "Priya Joshi",
        email: "priya.joshi@example.com",
        password: "password123",
        gender: "Female",
        profileImage: "https://via.placeholder.com/150",
      },
    ];
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify(demoUsers));
    }
    const user = localStorage.getItem("user");
    setIsAuthenticated(!!user);
  }, []);

  const toggleThemeAction = () => {
    dispatch(toggleTheme());
  };

  const handleDeleteTask = (taskId) => {
    setSelectedTask(null);
    setShowTaskDetails(false);
    dispatch(deleteTask(taskId));
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowTaskDetails(true);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      {isAuthenticated ? (
        <div
          className={`h-dvh overflow-x-hidden flex flex-col ${
            theme === "dark" ? "bg-dark-50" : "bg-[#fff]"
          } `}
        >
          <Navbar
            toggleTheme={toggleThemeAction}
            theme={theme}
            toggleGrid={() => setIsGrid(!isGrid)}
            toggleSidebar={() => setIsSidebarVisible(!isSidebarVisible)}
          />
          <div className="flex gap-x-1 px-8 flex-1">
            {isSidebarVisible && (
              <Sidebar
                theme={theme}
                selectedTask={selectedTask}
                setSelectedTask={setSelectedTask}
              />
            )}
            <TaskList
              isGrid={isGrid}
              theme={theme}
              onTaskClick={handleTaskClick}
            />
            {showTaskDetails && (
              <TaskDetails
                theme={theme}
                task={selectedTask}
                onDelete={handleDeleteTask}
                onClose={() => setShowTaskDetails(false)}
              />
            )}
          </div>
        </div>
      ) : (
        <Form onLogin={() => setIsAuthenticated(true)} />
      )}
    </>
  );
}

export default App;
