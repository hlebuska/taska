import { DraggableLocation } from 'react-beautiful-dnd';
import { TaskMap } from './types';

// a little function to help us with reordering the result
export const reorder = (list: any[], startIndex: number, endIndex: number): any[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const reorderTasks = (tasks: TaskMap, source: DraggableLocation, destination: DraggableLocation) => {
    const current = [...tasks[source.droppableId]];
    const next = [...tasks[destination.droppableId]];
    const target = current[source.index];
    // console.log('current', current);
    // console.log('next', next);
    // console.log('target', target);

    // moving to same list
    if (source.droppableId === destination.droppableId) {
        const reordered = reorder(current, source.index, destination.index);

        return {
            ...tasks,
            [source.droppableId]: reordered,
        };
    }

    // moving to different list

    // remove from original
    current.splice(source.index, 1);
    // insert into next
    next.splice(destination.index, 0, target);

    return {
        ...tasks,
        [source.droppableId]: current,
        [destination.droppableId]: next,
    };
};
