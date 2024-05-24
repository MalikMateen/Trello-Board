"use client";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Task } from "types";

type TaskCardProps = {
  task: Task;
  index: number;
};

export const TaskCard = React.memo<TaskCardProps>(function TaskCard({
  task,
  index,
}) {
  return (
    <Draggable draggableId={`task-${index}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white shadow-md rounded-lg p-4 mb-4"
        >
          <h3 className="text-lg font-semibold">{task.title}</h3>
          {task.description && (
            <p className="text-gray-600">{task.description}</p>
          )}
          {task.dueDate && (
            <p className="text-gray-600">
              Due Date: {task.dueDate.format("LLL")}
            </p>
          )}
          <p className="text-gray-600">Due Date: {task.boardName}</p>
        </div>
      )}
    </Draggable>
  );
});
