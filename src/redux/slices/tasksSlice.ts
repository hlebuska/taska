import { TaskMapType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TaskMapType = {
  task1: {
    id: "task1",
    listId: "list1",
    text: "task1",
    isCompleted: false,
  },
  task2: {
    id: "task2",
    listId: "list1",
    text: "task2",
    isCompleted: false,
  },
  task3: {
    id: "task3",
    listId: "list2",
    text: "task3",
    isCompleted: false,
  },
  task4: {
    id: "task4",
    listId: "list1",
    text: "task4",
    isCompleted: false,
  },
};

const tasksSlice = createSlice({
  name: "tasksSlice",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<TaskMapType>) => {
      return action.payload;
    },
  },
});

export const { setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
