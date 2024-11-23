import { ListMapType } from "@/types";
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
    setLists: (state, action: PayloadAction<ListMapType>) => {
      return action.payload;
    },
  },
});

export const { setLists } = listsSlice.actions;
export default listsSlice.reducer;
