import moment, { Moment } from "moment-timezone";
import React, { useCallback, useEffect, useState } from "react";
import { Task } from "types";
import { useGetAllBoards } from "queries";
import { useCreateTask, useUpdateTask } from "mutations";

type TaskFormProps = {
  task: Task | undefined;
  onClose: () => void;
};

export const TaskForm = React.memo<TaskFormProps>(function TaskForm({
  task,
  onClose,
}) {
  const [title, setTitle] = useState<string | undefined>("");
  const [description, setDescription] = useState<string | undefined>("");
  const [dueDate, setDueDate] = useState<Moment | undefined>();
  const [boardName, setBoardName] = useState<string | undefined>("");

  const { data: boards = [] } = useGetAllBoards();

  const { mutateAsync: createTask } = useCreateTask();
  const { mutateAsync: updateTask } = useUpdateTask();

  useEffect(() => {
    const { title, description, dueDate, boardName } = task || {};
    setTitle(title);
    setDescription(description);
    setDueDate(dueDate ?? moment());
    setBoardName(boardName ?? boards?.[0]?.name);
  }, [boards, task]);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (title && boardName) {
        task
          ? await updateTask({
              title,
              description,
              dueDate,
              boardName,
            })
          : await createTask({
              title,
              description,
              dueDate,
              boardName,
            });
        onClose();
      }
    },
    [
      boardName,
      createTask,
      description,
      dueDate,
      onClose,
      task,
      title,
      updateTask,
    ]
  );

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
        <div className="relative bg-white rounded-lg p-8 max-w-md w-full sm:max-w-xl">
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
                disabled={!!task}
                required
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
              <label htmlFor="boardName" className="block text-gray-700">
                Board Name
              </label>
              <select
                id="boardName"
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
              >
                {boards.map((board) => (
                  <option key={board.name} value={board.name}>
                    {board.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                {`${task ? "Update" : "Create"}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});
