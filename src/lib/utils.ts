import { DraggableLocation } from "react-beautiful-dnd";
import { ListMapType } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const reorderTasks = (
  taskMap: ListMapType,
  source: DraggableLocation,
  destination: DraggableLocation,
): ListMapType => {
  const oldIndex = source.index;
  const newIndex = destination.index;
  const draggedTaskID = taskMap[source.droppableId].taskIDs[oldIndex];

  //same list
  if (source.droppableId === destination.droppableId) {
    const newList = Array.from(taskMap[source.droppableId].taskIDs);
    newList.splice(oldIndex, 1);
    newList.splice(newIndex, 0, draggedTaskID);

    return {
      ...taskMap,
      [source.droppableId]: {
        ...taskMap[source.droppableId],
        taskIDs: newList,
      },
    };
  }
  //different list
  const newSourceList = Array.from(taskMap[source.droppableId].taskIDs);
  const newDestinationList = Array.from(
    taskMap[destination.droppableId].taskIDs,
  );

  newSourceList.splice(oldIndex, 1);
  newDestinationList.splice(newIndex, 0, draggedTaskID);

  return {
    ...taskMap,
    [source.droppableId]: {
      ...taskMap[source.droppableId],
      taskIDs: newSourceList,
    },
    [destination.droppableId]: {
      ...taskMap[destination.droppableId],
      taskIDs: newDestinationList,
    },
  };
};
