"use client";
import { TaskCard, TaskForm } from "containers";
import { useUpdateBoard } from "mutations";
import { useGetAllBoards } from "queries";
import React, { useCallback, useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Board, Task } from "types";

export const TaskManagement = React.memo(function TaskManagement() {
  const [isModalOpen, toggleModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task>();
  const [boardList, setBoardList] = useState<Board[]>([]);

  const { data: boards = [] } = useGetAllBoards();

  const { mutateAsync: updateBoard } = useUpdateBoard();

  useEffect(() => {
    boards.length && setBoardList(boards);
  }, [boards]);

  const onClickCreateTask = useCallback(() => {
    setSelectedTask(undefined);
    toggleModal(true);
  }, []);

  const onDragEnd = useCallback(
    async (result: any) => {
      const { source, destination } = result;

      if (!destination) return;

      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      ) {
        return;
      }

      const sourceBoardIndex = boardList.findIndex(
        (board) => board.name === source.droppableId
      );
      const destinationBoardIndex = boardList.findIndex(
        (board) => board.name === destination.droppableId
      );

      const updatedBoardList = [...boardList];

      if (source.droppableId === destination.droppableId) {
        const board = updatedBoardList[sourceBoardIndex];
        const [removedTask] = board.tasks.splice(source.index, 1);
        board.tasks.splice(destination.index, 0, removedTask);
      } else {
        const taskToMove =
          updatedBoardList[sourceBoardIndex].tasks[source.index];
        updatedBoardList[sourceBoardIndex].tasks.splice(source.index, 1);
        updatedBoardList[destinationBoardIndex].tasks.splice(
          destination.index,
          0,
          taskToMove
        );

        taskToMove.boardName = destination.droppableId;

        await updateBoard({
          sourceBoardName: source.droppableId,
          destinationBoardName: destination.droppableId,
          taskTitle: taskToMove.title,
        });
      }
    },
    [boardList, updateBoard]
  );

  const onTaskEditClick = useCallback((task: Task) => {
    setSelectedTask(task);
    toggleModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setSelectedTask(undefined);
    toggleModal(false);
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8 mt-5">
        <h1 className="text-3xl font-bold">Task Management</h1>
        <button
          onClick={onClickCreateTask}
          className={`px-4 py-2 rounded-md text-white ${
            !boards.length
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
          disabled={!boards.length}
        >
          Create Task
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4">
          {boardList.map((board) => (
            <div
              key={board.name}
              className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
            >
              <h2 className="text-xl font-semibold mb-4">{board.name}</h2>
              <Droppable droppableId={board.name} type="TASK">
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {board.tasks.map((task, taskIndex) => (
                      <TaskCard
                        key={task.title}
                        task={task}
                        index={taskIndex}
                        onEditClick={onTaskEditClick}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
      {isModalOpen && <TaskForm task={selectedTask} onClose={onCloseModal} />}
    </div>
  );
});
