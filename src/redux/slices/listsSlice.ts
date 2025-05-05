import { ListMapType } from "../../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ListMapType = {
  list1: {
    id: "list1",
    name: "List 1",
    taskIDs: ["task2", "task1", "task4"],
  },
  list2: {
    id: "list2",
    name: "List 2",
    taskIDs: ["task3"],
  },
};

const listsSlice = createSlice({
  name: "listsSlice",
  initialState,
  reducers: {
    setListsAction: (state, action: PayloadAction<ListMapType>) => {
      return action.payload;
    },
    updateListNameAction: (
      state,
      action: PayloadAction<{ id: string; name: string }>,
    ) => {
      const { id, name } = action.payload;
      state[id].name = name;
    },
    addListAction: (
      state,
      action: PayloadAction<{ listID: string; textValue: string }>,
    ) => {
      const { listID, textValue } = action.payload;
      state[listID] = {
        id: listID,
        name: textValue,
        taskIDs: [],
      };
    },
    addTaskToListAction: (
      state,
      action: PayloadAction<{ taskID: string; listID: string }>,
    ) => {
      const { taskID, listID } = action.payload;
      state[listID].taskIDs.unshift(taskID);
    },
    deleteListAction: (state, action: PayloadAction<{ listID: string }>) => {
      const { listID } = action.payload;

      delete state[listID];
    },
    deleteTaskFromListAction: (
      state,
      action: PayloadAction<{ taskID: string; listID: string }>,
    ) => {
      const { taskID, listID } = action.payload;

      if (state[listID]) {
        const taskIndex = state[listID].taskIDs.indexOf(taskID);

        if (taskIndex > -1) {
          state[listID].taskIDs.splice(taskIndex, 1);
        }
      } else {
        console.error(`List with id: ${listID} not found.`);
      }
    },
  },
});

export const {
  setListsAction,
  updateListNameAction,
  addListAction,
  deleteListAction,
  addTaskToListAction,
  deleteTaskFromListAction,
} = listsSlice.actions;
export default listsSlice.reducer;
