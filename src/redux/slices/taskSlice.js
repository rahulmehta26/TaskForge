import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    items: JSON.parse(localStorage.getItem("tasks")) || [],
    completedTasks: JSON.parse(localStorage.getItem("completedTasks")) || [],
    status: "idle",
    error: null,
  },
  reducers: {
    addTask: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.items));
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter((task) => task.id !== action.payload);
      state.completedTasks = state.completedTasks.filter(
        (task) => task.id !== action.payload
      );
      localStorage.setItem("tasks", JSON.stringify(state.items));
      localStorage.setItem(
        "completedTasks",
        JSON.stringify(state.completedTasks)
      );
    },
    updateTask: (state, action) => {
      const { id, completed } = action.payload;
      const taskIndex = state.items.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.items[taskIndex].completed = completed;
        localStorage.setItem("tasks", JSON.stringify(state.items));
      }
    },
    addTaskToCompleted: (state, action) => {
      const task = action.payload;
      state.completedTasks.push(task);
      state.items = state.items.filter((t) => t.id !== task.id);
      localStorage.setItem("completedTasks", JSON.stringify(state.completedTasks));
      localStorage.setItem("tasks", JSON.stringify(state.items));
    },
    deleteTaskFromCompleted: (state, action) => {
      const taskId = action.payload;
      const taskIndex = state.completedTasks.findIndex(
        (task) => task.id === taskId
      );
      if (taskIndex !== -1) {
        const task = state.completedTasks[taskIndex];
        state.items.push(task);
        state.completedTasks = state.completedTasks.filter(
          (task) => task.id !== taskId
        );
        localStorage.setItem("completedTasks", JSON.stringify(state.completedTasks));
        localStorage.setItem("tasks", JSON.stringify(state.items));
      }
    },
  },
});

export const { addTask, deleteTask, updateTask, addTaskToCompleted, deleteTaskFromCompleted } = taskSlice.actions;
export default taskSlice.reducer;
