export type IListTaskMap = {
  [listId: string]: {
    name: string;
    tasks: ITask[];
  };
};

export interface ITask {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface ITaskList {
  id: string;
  tasks: ITask[];
}
