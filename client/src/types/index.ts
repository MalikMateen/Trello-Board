import { Moment } from "moment-timezone";

export type Board = {
  name: string;
  tasks: Task[];
};

export type Task = {
  title: string;
  description: string | undefined;
  dueDate: Moment | undefined;
  boardName: string;
};
