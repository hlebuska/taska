"use client";
import { Draggable } from "@hello-pangea/dnd";
import ActivatedInput from "@/components/ui/activated-input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useEditMode } from "@/lib/hooks";
import { updateTask, setTaskCompletion } from "@/redux/slices/tasksSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";

interface IProps {
  text: string;
  id: string;
  index: number;
  isCompleted: boolean;
  isDraggable: boolean;
}

export default function ToDoTask({
  text,
  id,
  index,
  isCompleted,
  isDraggable,
}: IProps) {
  const dispatch = useAppDispatch();

  const { textValue, setTextValue, isEdit, turnOnEdit, wrapperRef, inputRef } =
    useEditMode({
      text,
      onSave: (newValue) => {
        dispatch(updateTask({ id, text: newValue }));
      },
    });

  const TaskContent = (
    <div
      elevation={3}
      onClick={() => turnOnEdit()}
      ref={wrapperRef}
      className={`flex justify-between items-start border mt-3 rounded-md border-white  backdrop-blur-sm bg px-2 py-3 text-gray-900 shadow-inner shadow-white/10 font-normal ${isCompleted ? "border-gray-200 mx-2 bg-opacity-40 bg-gray-100" : "bg-white mt-3  bg-opacity-90"}`}
    >
      <div
        className={`flex flex-col gap-1 w-10/12 ${isCompleted ? "line-through" : ""}`}
      >
        {
          <ActivatedInput
            ref={inputRef}
            value={textValue}
            active={isEdit}
            onChange={(event) => setTextValue(event.target.value)}
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
        onCheckedChange={(checked) =>
          dispatch(
            setTaskCompletion({ taskID: id, isCompleted: checked as boolean }),
          )
        }
      />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertIcon fontSize="small" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="flex gap-1 items-center leading-none">
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem className="flex gap-1 items-center leading-none">
            Duplicate
          </DropdownMenuItem>

          <DropdownMenuItem className="flex gap-1 items-center leading-none">
            Move to another list
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
  );

  return isDraggable ? (
    <Draggable key={id} draggableId={id} index={index}>
      {(dragProvided) => (
        <div
          {...dragProvided.dragHandleProps}
          {...dragProvided.draggableProps}
          ref={dragProvided.innerRef}
        >
          {TaskContent}
        </div>
      )}
    </Draggable>
  ) : (
    <div>{TaskContent}</div>
  );
}
