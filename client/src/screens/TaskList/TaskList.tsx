"use client";
import moment from "moment-timezone";
import { useGetAllBoards, useGetAllTasks } from "queries";
import React, { useMemo, useState } from "react";

export const TaskList = React.memo(function TaskList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBoard, setSelectedBoard] = useState("All");

  const { data: tasks = [] } = useGetAllTasks();
  const { data: boards = [] } = useGetAllBoards();

  const boardNames = useMemo(
    () => ["All", ...boards.map(({ name }) => name)],
    [boards]
  );

  const filteredTasks = useMemo(() => {
    const boardFilteredTasks =
      selectedBoard === "All"
        ? tasks
        : tasks.filter(
            ({ boardName }) =>
              boardName.toLowerCase() === selectedBoard.toLowerCase()
          );

    return boardFilteredTasks.filter(
      ({ title, description }) =>
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, selectedBoard, tasks]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-4 mt-5">Tasks List</h1>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-md"
        />

        <select
          value={selectedBoard}
          onChange={(e) => setSelectedBoard(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          {boardNames.map((boardName) => (
            <option key={boardName} value={boardName}>
              {boardName}
            </option>
          ))}
        </select>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Board Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Due Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredTasks.map((task, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {task.description || ""}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{task.boardName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{`${
                task.dueDate ? moment(task.dueDate).format("LLL") : ""
              }`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
