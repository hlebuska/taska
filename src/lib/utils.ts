import { DraggableLocation } from "react-beautiful-dnd";
import { ListMapType } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { store } from "@/redux/store";
import {
  addTaskAction,
  setTaskCompletionAction,
  updateTaskAction,
} from "@/redux/slices/tasksSlice";
import {
  addTaskToListAction,
  deleteListAction,
  addListAction,
  updateListNameAction,
  setListsAction,
} from "@/redux/slices/listsSlice";
import { nanoid } from "@reduxjs/toolkit";

/**
 * All business logic should be stored here and separated from ui
 */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//Tasks logic

export const reorderTasks = (
  taskMap: ListMapType,
  source: DraggableLocation,
  destination: DraggableLocation,
) => {
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

  store.dispatch(
    setListsAction({
      ...taskMap,
      [source.droppableId]: {
        ...taskMap[source.droppableId],
        taskIDs: newSourceList,
      },
      [destination.droppableId]: {
        ...taskMap[destination.droppableId],
        taskIDs: newDestinationList,
      },
    }),
  );
};

export const addTask = (listID: string, text: string) => {
  const id = "task-" + nanoid(8);
  store.dispatch(addTaskAction({ listID: listID, taskID: id, initText: text }));
  store.dispatch(addTaskToListAction({ listID: listID, taskID: id }));
};

export const updateTask = (taskID: string, text: string) => {
  store.dispatch(updateTaskAction({ id: taskID, text: text }));
};

export const setTaskCompletion = (taskID: string, value: boolean) => {
  store.dispatch(
    setTaskCompletionAction({ taskID: taskID, isCompleted: value }),
  );
};

//List logic

export const addList = () => {
  const id = "list-" + nanoid(8);
  store.dispatch(addListAction({ listID: id }));
};

export const updateListName = (listID: string, text: string) => {
  store.dispatch(updateListNameAction({ id: listID, name: text }));
};

export const deleteList = (listID: string) => {
  store.dispatch(deleteListAction({ listID: listID }));
};
