"use client";
import ActivatedInput from "../../../components/ui/activated-input";
import { Button } from "../../../components/ui/button";
import { Checkbox } from "../../../components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { useEditMode } from "../../../lib/hooks";
import { deleteTask, setTaskCompletion, updateTask } from "../../../lib/utils";
import { Draggable } from "@hello-pangea/dnd";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ChangeEvent } from "react";

interface IProps {
  text: string;
  taskID: string;
  listID: string;
  index: number;
  isCompleted: boolean;
  isDraggable: boolean;
}

export default function ToDoTask({
  text,
  taskID,
  index,
  isCompleted,
  isDraggable,
  listID,
}: IProps) {
  const { textValue, setTextValue, isEdit, turnOnEdit, wrapperRef, inputRef } =
    useEditMode({
      text,
      onClickOutside: () => {
        updateTask(taskID, text);
      },
      onEnter: () => {
        updateTask(taskID, text);
      },
    });

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(event.target.value);
  };
  const handleDeleteTask = () => {
    deleteTask(taskID, listID);
  };
  const handleCompleteTask = (checked: boolean) => {
    setTaskCompletion(taskID, checked);
  };

  const TaskContent = (
    <div
      onClick={() => turnOnEdit()}
      ref={wrapperRef}
      className={` flex justify-between items-start border mt-3 rounded-md border-white  backdrop-blur-sm bg px-2 py-3 text-gray-900 shadow-inner shadow-white/10 font-normal ${isCompleted ? "border-gray-200 mx-2 bg-opacity-40 bg-gray-100" : "bg-white mt-3  bg-opacity-90"}`}
    >
      <div
        className={`flex flex-col gap-1 w-10/12 ${isCompleted ? "line-through" : ""}`}
      >
        {
          <ActivatedInput
            ref={inputRef}
            value={textValue}
            active={isEdit}
            onChange={(event) => handleTextChange(event)}
          ></ActivatedInput>
        }
        <div className="mt-2 flex gap-1">
          <Button variant="outline" size={"xxs"} className="text-xs">
            Tommorow
          </Button>
        </div>
      </div>
      <Checkbox
        checked={isCompleted}
        onCheckedChange={(checked) => handleCompleteTask(checked as boolean)}
      />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertIcon fontSize="small" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex gap-1 items-center leading-none"
            onClick={() => handleDeleteTask()}
          >
            <div>
              <DeleteIcon fontSize="small" />
            </div>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  return isDraggable ? (
    <Draggable key={taskID} draggableId={taskID} index={index}>
      {(dragProvided) => (
        <div
          {...dragProvided.dragHandleProps}
          {...dragProvided.draggableProps}
          ref={dragProvided.innerRef}
          className="gu-mirror fc-event"
        >
          {TaskContent}
        </div>
      )}
    </Draggable>
  ) : (
    <div>{TaskContent}</div>
  );
}
