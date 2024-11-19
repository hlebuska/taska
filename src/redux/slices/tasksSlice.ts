import { ITaskList } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface IState {
  lists: ITaskList[];
}

const initialState: IState = {
  lists: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    logReducer: () => {
      console.log("log some shit");
    },
  },
});

export default tasksSlice.reducer;
