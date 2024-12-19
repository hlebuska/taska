import { TaskMapType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { current } from "immer";

const initialState: TaskMapType = {
  task1: {
    id: "task1",
    listId: "list1",
    text: "task1",
    isCompleted: true,
  },
  task2: {
    id: "task2",
    listId: "list1",
    text: "task2",
    isCompleted: true,
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
    setTasksAction: (state, action: PayloadAction<TaskMapType>) => {
      return action.payload;
    },
    updateTaskAction: (
      state,
      action: PayloadAction<{ id: string; text: string }>,
    ) => {
      const { id, text } = action.payload;
      state[id].text = text;
    },
    addTaskAction: (
      state,
      action: PayloadAction<{
        listID: string;
        taskID: string;
        initText: string;
      }>,
    ) => {
      const { listID, taskID, initText } = action.payload;
      state[taskID] = {
        id: taskID,
        listId: listID,
        text: initText,
        isCompleted: false,
      };
    },
    setTaskCompletionAction: (
      state,
      action: PayloadAction<{ taskID: string; isCompleted: boolean }>,
    ) => {
      const { taskID, isCompleted } = action.payload;

      state[taskID].isCompleted = isCompleted;
    },
  },
});

export const {
  setTasksAction,
  updateTaskAction,
  addTaskAction,
  setTaskCompletionAction,
} = tasksSlice.actions;
export default tasksSlice.reducer;
