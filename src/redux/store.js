import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import taskReducer from "./slices/taskSlice";
import authReducer from "./slices/authSlice";
import themeReducer from "./slices/themeSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = {
  tasks: taskReducer,
  auth: authReducer,
  theme: themeReducer,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(rootReducer)
);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
