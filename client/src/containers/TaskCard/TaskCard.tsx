import React, { useCallback } from "react";
import moment from "moment-timezone";
import { Draggable } from "react-beautiful-dnd";
import { Task } from "types";
import { Edit, Trash } from "lucide-react";
import { useDeleteTask } from "mutations";

type TaskCardProps = {
  task: Task;
  index: number;
  onEditClick: (task: Task) => void;
};

export const TaskCard = React.memo<TaskCardProps>(function TaskCard({
  task,
  index,
  onEditClick,
}) {
  const { mutateAsync: deleteTask } = useDeleteTask();

  const handleDeleteClick = useCallback(
    async (title: string) => {
      await deleteTask({ title });
    },
    [deleteTask]
  );

  return (
    <Draggable draggableId={task.title} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white shadow-md rounded-lg p-4 mb-4 relative"
        >
          <h3 className="text-lg font-semibold">{task.title}</h3>
          {task.description && (
            <p className="text-gray-600">Description: {task.description}</p>
          )}
          {task.dueDate && (
            <p className="text-gray-600">
              Due Date: {moment(task.dueDate).format("LLL")}
            </p>
          )}
          <p className="text-gray-600">Board Name: {task.boardName}</p>
          <div className="absolute top-2 right-2 flex space-x-2">
            <Edit color="green" size={20} onClick={() => onEditClick(task)} />
            <Trash
              color="red"
              size={20}
              onClick={() => handleDeleteClick(task.title)}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
});
