import { DraggableLocation } from "react-beautiful-dnd";
import { IListTaskMap, TaskMap } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const reorder = (
  list: any[],
  startIndex: number,
  endIndex: number,
): any[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const reorderTasks = (
  taskMap: IListTaskMap,
  source: DraggableLocation,
  destination: DraggableLocation,
): IListTaskMap => {
  const current = [...taskMap[source.droppableId].tasks];
  const next = [...taskMap[destination.droppableId].tasks];
  const target = current[source.index];

  //same list
  if (source.droppableId === destination.droppableId) {
    const reordered = reorder(current, source.index, destination.index);

    return {
      ...taskMap,
      [source.droppableId]: {
        ...taskMap[source.droppableId],
        tasks: reordered,
      },
    };
  }

  // moving to different list

  // remove from original
  current.splice(source.index, 1);
  // insert into next
  next.splice(destination.index, 0, target);

  return {
    ...taskMap,
    [source.droppableId]: {
      ...taskMap[source.droppableId],
      tasks: current,
    },
    [destination.droppableId]: {
      ...taskMap[destination.droppableId],
      tasks: next,
    },
  };
};
