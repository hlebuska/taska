export type ListMapType = {
  [listID: string]: IList;
};

export type TaskMapType = {
  [taskID: string]: ITask;
};

export interface IList {
  id: string;
  name: string;
  taskIDs: string[];
}

export interface ITask {
  id: string;
  listId: string;
  text: string;
  isCompleted: boolean;
}
