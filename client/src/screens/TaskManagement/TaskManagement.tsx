"use client";
import { TaskCard, TaskForm } from "containers";
import { useGetAllBoards } from "queries";
import React, { useCallback, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Task } from "types";

export const TaskManagement = React.memo(function TaskManagement() {
  const [isModalOpen, toggleModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task>();

  const { data: boards = [] } = useGetAllBoards();

  const onClickCreateTask = useCallback(() => {
    setSelectedTask(undefined);
    toggleModal(true);
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8 mt-5">
        <h1 className="text-3xl font-bold">Task Management</h1>
        <button
          onClick={onClickCreateTask}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Create Task
        </button>
      </div>
      <DragDropContext onDragEnd={() => {}}>
        <div className="flex space-x-4">
          {boards.map((board, index) => (
            <div
              key={board.name}
              className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
            >
              <h2 className="text-xl font-semibold mb-4">{board.name}</h2>
              <Droppable droppableId={`board-${index}`} type="TASK">
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {board.tasks.map((task, taskIndex) => (
                      <TaskCard key={taskIndex} task={task} index={taskIndex} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
      {isModalOpen && (
        <TaskForm task={selectedTask} onClose={() => toggleModal(false)} />
      )}
    </div>
  );
});
