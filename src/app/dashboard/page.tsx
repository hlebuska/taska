"use client";
import { Button } from "@/components/ui/button";
import ToDoList from "@/app/dashboard/components/todo-list";
import AddIcon from "@mui/icons-material/Add";
import { DragDropContext } from "@hello-pangea/dnd";
import { addList, reorderTasks } from "@/lib/utils";
import { useAppSelector } from "@/lib/hooks";
import ToDoListCreator from "./components/to-do-list-creator";
import Calendar from "./components/calendar";

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
      <ResizablePanelGroup
        direction="horizontal"
        className="h-screen  w-full rounded-lg border "
      >
        <ResizablePanel defaultSize={65} minSize={50}>
          <div className="flex h-screen flex-col overflow-scroll bg-gradient-to-tr from-red-300 to-indigo-300">
            <div className="bg-white w-full h-24 border-b border-gray-300">
              <h6>Project Name</h6>
            </div>
            <div className="h-full w-full p-2">
              <DragDropContext
                onDragEnd={({ destination, source }) => {
                  if (!destination) {
                    return;
                  }
                  reorderTasks(lists, source, destination);
                }}
              >
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
              </DragDropContext>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={35} minSize={35}>
          <div className="flex h-full items-center justify-center p-6">
            <Calendar />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
