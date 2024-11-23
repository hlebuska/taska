"use client";
import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "@/redux/slices/tasksSlice";
import listsReducer from "@/redux/slices/listsSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    lists: listsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
