import { ListMapType } from "@/types";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

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
    setLists: (state, action: PayloadAction<ListMapType>) => {
      return action.payload;
    },
    updateList: (
      state,
      action: PayloadAction<{ id: string; name: string }>,
    ) => {
      const { id, name } = action.payload;
      state[id].name = name;
    },
    addList: (state, action: PayloadAction<{ listID: string }>) => {
      const { listID } = action.payload;
      state[listID] = {
        id: listID,
        name: "New List",
        taskIDs: [],
      };
    },
    removeList: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      delete state[id];
    },
    addTaskToList: (
      state,
      action: PayloadAction<{ taskID: string; listID: string }>,
    ) => {
      const { taskID, listID } = action.payload;
      state[listID].taskIDs.unshift(taskID);
    },
  },
});

export const { setLists, updateList, addList, removeList, addTaskToList } =
  listsSlice.actions;
export default listsSlice.reducer;
