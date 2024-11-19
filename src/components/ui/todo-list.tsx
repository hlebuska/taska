import { Droppable } from "@hello-pangea/dnd";
import { Button } from "./button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ToDoTask from "./todo-task";
import { ITask } from "@/types";

interface IProps {
  listID: string;
  listName: string;
  listTasks: ITask[];
  onUpdate: (id: string, text: string) => void;
}

export default function ToDoList({
  listID,
  listName,
  listTasks,
  onUpdate,
}: IProps) {
  return (
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
            className="flex min-h-10 min-w-10 flex-col rounded-md bg-gray-300 bg-opacity-30 border border-opacity-20 border-white p-2"
            ref={dropProvided.innerRef}
          >
            <div className="p-2 flex gap-7 rounded-md items-center justify-between border-white bg-white bg-opacity-90 border">
              <h4 className="text-black drop-shadow-2xl text-md">{listName}</h4>
              <Button size={"xxs"} variant={"ghost"} className="px-0.5">
                <MoreVertIcon />
              </Button>
            </div>

            {listTasks.map((task: ITask, index) => {
              return (
                <ToDoTask
                  id={task.id}
                  text={task.text}
                  key={index}
                  index={index}
                  onUpdate={onUpdate}
                />
              );
            })}
            {dropProvided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}
