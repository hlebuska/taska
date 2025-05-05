"use client";
import ToDoList from "../dashboard/components/todo-list";
import { useAppSelector } from "../../lib/hooks";
import { reorderTasks } from "../../lib/utils";
import { DragDropContext } from "@hello-pangea/dnd";
import ToDoListCreator from "./components/to-do-list-creator";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function DashboardPage() {
  const tasks = useAppSelector((state) => state.tasks);
  const lists = useAppSelector((state) => state.lists);

  return (
    <div className="h-screen mt-[54px]">
      <DragDropContext
        onDragEnd={({ destination, source }) => {
          console.log(destination);
          if (!destination) {
            return;
          }
          if (destination.droppableId != "calendar")
            reorderTasks(lists, source, destination);
        }}
      >
        <ResizablePanelGroup
          direction="horizontal"
          className="h-screen  w-full rounded-lg border "
        >
          <ResizablePanel defaultSize={50} minSize={50}>
            <div className="flex h-screen flex-col overflow-scroll bg-gradient-to-tr from-red-300 to-indigo-300">
              <div className="bg-white w-full h-24 border-b border-gray-300">
                <h6>Project Name</h6>
              </div>
              <div className="h-full w-full p-2">
                <div className="flex h-full gap-3">
                  {Object.entries(lists).map(([listID, listBody], index) => (
                    <ToDoList
                      listID={listID}
                      listName={listBody.name}
                      listTasks={listBody.taskIDs.map(
                        (taskId) => tasks[taskId],
                      )}
                      key={index}
                    />
                  ))}

                  <ToDoListCreator />
                </div>
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel
            defaultSize={50}
            minSize={35}
            onResize={() => console.log("resize")}
          >
            <div className="h-full w-full"></div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </DragDropContext>
    </div>
  );
}
