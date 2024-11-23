// import { IListTaskMap, ListMapType } from "@/types";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface IState {
//   lists: ListMapType;
//   tasks: TaskMapType;
// }

// const initialState: IListTaskMap = {
//   list1: {
//     name: "list 1 yooo",
//     tasks: [{ id: "1", text: "some texts idk", isCompleted: false }],
//   },
//   list2: {
//     name: "list 21 yooo",
//     tasks: [
//       { id: "2", text: "312313 texts idk", isCompleted: false },
//       { id: "3", text: "313 texts idk", isCompleted: false },
//     ],
//   },
// };

// const OLDtasksSlice = createSlice({
//   name: "tasks",
//   initialState,
//   reducers: {
//     setTasks: (state, action: PayloadAction<IListTaskMap>) => {
//       return action.payload;
//     },
//   },
// });

// export const { setTasks } = OLDtasksSlice.actions;
// export default OLDtasksSlice.reducer;
