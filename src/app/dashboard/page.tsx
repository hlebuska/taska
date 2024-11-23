"use client";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import ToDoList from "@/components/ui/todo-list";
import AddIcon from "@mui/icons-material/Add";
import { DragDropContext } from "@hello-pangea/dnd";
import { reorderTasks } from "@/lib/utils";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setTasks } from "@/redux/slices/tasksSlice";
import { setLists } from "@/redux/slices/listsSlice";

export default function DashboardPage() {
  const tasks = useAppSelector((state) => state.tasks);
  const lists = useAppSelector((state) => state.lists);

  const dispatch = useAppDispatch();

  // const updateTaskText = (id: string, newText: string) => {
  //   const newTasksMap = { ...tasksRENAME };

  //   for (const listKey in tasksRENAME) {
  //     const taskIndex = newTasksMap[listKey].tasks.findIndex(
  //       (task: ITask) => task.id === id,
  //     );
  //     if (taskIndex != -1) {
  //       // newTasksMap[listKey].tasks[taskIndex].text = newText;

  //       const newTasks = {
  //         ...tasksRENAME[listKey].tasks,
  //         [taskIndex]: {
  //           ...tasksRENAME[listKey].tasks[taskIndex],
  //           text: newText,
  //         },
  //       };
  //       console.log(newTasks);

  //       // console.log({
  //       //   ...tasksRENAME,
  //       //   [listKey]: {
  //       //     ...tasksRENAME[listKey],
  //       //     tasks: { ...newTasksMap[listKey].tasks ,
  //       //       []
  //       //     },
  //       //   },
  //       // });
  //       // setTasks(newTasksMap);
  //     }
  //   }
  // };

  return (
    <>
      <div className="mt-[56px] flex h-screen w-3/5 flex-col overflow-scroll bg-gradient-to-tr from-red-400 to-indigo-300 ">
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
                  onUpdate={() => console.log("Update task text. TODO")}
                />
              ))}

              <Button
                variant={"outline"}
                className="mt-2"
                // onClick={() => addTaskList("list name test")}
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
