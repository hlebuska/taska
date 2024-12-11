"use client";
import { Button } from "@/components/ui/button";
import ToDoList from "@/components/ui/todo-list";
import AddIcon from "@mui/icons-material/Add";
import { DragDropContext } from "@hello-pangea/dnd";
import { reorderTasks } from "@/lib/utils";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setLists, addList } from "@/redux/slices/listsSlice";
import { nanoid } from "@reduxjs/toolkit";

export default function DashboardPage() {
  const tasks = useAppSelector((state) => state.tasks);
  const lists = useAppSelector((state) => state.lists);

  const dispatch = useAppDispatch();

  const handleAddList = () => {
    const id = "list-" + nanoid(8);
    dispatch(addList({ listID: id }));
  };

  return (
    <>
      <div className="mt-[56px] flex h-screen w-4/5 flex-col overflow-scroll bg-gradient-to-tr from-red-300 to-indigo-300">
        <div className="bg-white w-full h-24 border-b border-gray-300">
          <h6>Project Name</h6>
        </div>
        <div className="h-full w-full p-2">
          <DragDropContext
            onDragEnd={({ destination, source }) => {
              if (!destination) {
                return;
              }
              dispatch(setLists(reorderTasks(lists, source, destination)));
            }}
          >
            <div className="flex h-full gap-3">
              {Object.entries(lists).map(([listID, listBody], index) => (
                <ToDoList
                  listID={listID}
                  listName={listBody.name}
                  listTasks={listBody.taskIDs.map((taskId) => tasks[taskId])}
                  key={index}
                />
              ))}

              <Button
                variant={"outline"}
                className="mt-2"
                onClick={() => handleAddList()}
              >
                <AddIcon /> Add list
              </Button>
            </div>
          </DragDropContext>
        </div>
      </div>
    </>
  );
}
