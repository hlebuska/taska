import { Droppable } from "@hello-pangea/dnd";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ToDoTask from "@/app/dashboard/components/todo-task";
import { ITask } from "@/types";
import ActivatedInput from "@/components/ui/activated-input";
import { useEditMode } from "@/lib/hooks";
import ToDoCreator from "@/app/dashboard/components/todo-creator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChangeEvent, useState } from "react";
import { deleteList, updateListName } from "@/lib/utils";

interface IProps {
  listID: string;
  listName: string;
  listTasks: ITask[];
}

export default function ToDoList({ listID, listName, listTasks }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { textValue, setTextValue, isEdit, turnOnEdit, wrapperRef, inputRef } =
    useEditMode({
      text: listName,
      onClickOutside: () => {
        updateListName(listID, textValue);
      },
      onEnter: () => {
        updateListName(listID, textValue);
      },
    });

  const openDialog = () => {
    setIsOpen(true);
  };
  const closeDialog = () => {
    setIsOpen(false);
  };
  const completedTasksCount = listTasks.reduce((counter, task) => {
    if (task.isCompleted) {
      counter += 1;
    }
    return counter;
  }, 0);

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(event.target.value);
  };
  const handleDeleteTask = () => {
    deleteList(listID);
  };

  return (
    <div className="flex flex-col">
      <Droppable
        droppableId={listID}
        type={"tasks"}
        direction="vertical"
        isCombineEnabled={false}
        key={listID}
      >
        {(dropProvided) => (
          <div {...dropProvided.droppableProps} style={{}}>
            <div
              className="flex w-56 flex-col rounded-md bg-gray-300 bg-opacity-30 border border-opacity-20 border-white p-2"
              ref={dropProvided.innerRef}
            >
              <div
                ref={wrapperRef}
                onClick={() => turnOnEdit()}
                className="p-2 flex rounded-md items-center justify-between border-white bg-white bg-opacity-90 border text-lg"
              >
                <ActivatedInput
                  ref={inputRef}
                  value={textValue}
                  active={isEdit}
                  onChange={(event) => handleTextChange(event)}
                ></ActivatedInput>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertIcon fontSize="small" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem className="flex gap-1 items-center leading-none">
                      <WestIcon fontSize="small" />
                      Move left
                    </DropdownMenuItem>

                    <DropdownMenuItem className="flex gap-1 items-center leading-none">
                      <EastIcon fontSize="small" />
                      Move right
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="flex gap-1 items-center leading-none"
                      onClick={() => openDialog()}
                    >
                      <div>
                        <DeleteIcon fontSize="small" />
                      </div>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <ToDoCreator listID={listID} />

              {listTasks.map((task: ITask, index) => {
                return (
                  !task.isCompleted && (
                    <ToDoTask
                      taskID={task.id}
                      listID={listID}
                      text={task.text}
                      key={index}
                      index={index}
                      isCompleted={task.isCompleted}
                      isDraggable={true}
                    />
                  )
                );
              })}
              {dropProvided.placeholder}
            </div>
          </div>
        )}
      </Droppable>

      <Collapsible className="bg-white bg-opacity-50 border border-opacity-20 border-white py-1 text-xs  w-full mt-3 rounded-md font-medium">
        <CollapsibleTrigger className="flex gap-1 items-center leading-none px-4">
          <KeyboardArrowDownIcon fontSize="small" /> Completed{" "}
          {`(${completedTasksCount})`}
        </CollapsibleTrigger>
        <CollapsibleContent>
          {listTasks.map((task: ITask, index) => {
            return (
              task.isCompleted && (
                <ToDoTask
                  listID={listID}
                  taskID={task.id}
                  text={task.text}
                  key={index}
                  index={index}
                  isCompleted={task.isCompleted}
                  isDraggable={false}
                />
              )
            );
          })}
        </CollapsibleContent>
      </Collapsible>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure to delete this list?
            </AlertDialogTitle>
            <AlertDialogDescription>
              All tasks in this list will also be deleted. This action cannot be
              reverted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => closeDialog()}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-400 hover:bg-red-500"
              onClick={() => handleDeleteTask()}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
