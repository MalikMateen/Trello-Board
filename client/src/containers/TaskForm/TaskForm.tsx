import moment from "moment-timezone";
import React, { useCallback, useState } from "react";
import { Task } from "types";

type TaskFormProps = {
  task: Task | undefined;
  onClose: () => void;
};

export const TaskForm = React.memo<TaskFormProps>(function TaskForm({
  task,
  onClose,
}) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(task?.dueDate || moment());

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
        <div className="relative bg-white rounded-lg p-8 max-w-md w-full">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <form onSubmit={onSubmit} className="space-y-4">
            <h2 className="text-2xl font-semibold">{`${
              task ? "Update" : "Create"
            } Task`}</h2>
            <div>
              <label htmlFor="title" className="block text-gray-700">
                Task Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                placeholder="Task Title"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-gray-700">
                Task Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                placeholder="Task Description"
              />
            </div>
            <div>
              <label htmlFor="dueDate" className="block text-gray-700">
                Due Date
              </label>
              <input
                id="dueDate"
                type="date"
                value={moment(dueDate).format("YYYY-MM-DD")}
                onChange={(e) => setDueDate(moment(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});
