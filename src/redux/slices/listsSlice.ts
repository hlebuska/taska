import { ListMapType } from "@/types";
import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

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
    addListAction: (state, action: PayloadAction<{ listID: string }>) => {
      const { listID } = action.payload;
      state[listID] = {
        id: listID,
        name: "New List",
        taskIDs: [],
      };
    },
    deleteListAction: (state, action: PayloadAction<{ listID: string }>) => {
      const { listID } = action.payload;

      delete state[listID];
    },
    addTaskToListAction: (
      state,
      action: PayloadAction<{ taskID: string; listID: string }>,
    ) => {
      const { taskID, listID } = action.payload;
      state[listID].taskIDs.unshift(taskID);
    },
  },
});

export const {
  setListsAction,
  updateListNameAction,
  addListAction,
  deleteListAction,
  addTaskToListAction,
} = listsSlice.actions;
export default listsSlice.reducer;
