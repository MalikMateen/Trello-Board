"use client";
import React, { useCallback, useState } from "react";
import { useGetAllBoards } from "queries";
import { useCreateBoard, useDeleteBoard } from "mutations";

export const BoardManagement = React.memo(function BoardManagement() {
  const [newBoardName, setNewBoardName] = useState<string>("");

  const { data: boards = [] } = useGetAllBoards();

  const { mutateAsync: createBoard } = useCreateBoard();
  const { mutateAsync: deleteBoard } = useDeleteBoard();

  const onCreateBoard = useCallback(async () => {
    try {
      const boardName = newBoardName.trim();
      if (boardName) {
        await createBoard({ boardName });
        setNewBoardName("");
      }
    } catch (error: any) {
      console.error(error);
    }
  }, [createBoard, newBoardName]);

  const onDeleteBoard = useCallback(
    async (boardName: string) => {
      try {
        await deleteBoard({ boardName });
      } catch (error: any) {
        console.error(error);
      }
    },
    [deleteBoard]
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 mt-5">Board Management</h1>
      <div className="mb-4">
        <input
          type="text"
          className="border border-gray-300 rounded px-4 py-2 mr-2 w-full sm:w-auto"
          placeholder="Enter board name"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={onCreateBoard}
        >
          Create Board
        </button>
      </div>
      <div>
        {boards.map(({ name }) => (
          <div
            key={name}
            className="border-b border-gray-200 py-4 flex flex-col sm:flex-row items-center justify-between px-4"
          >
            <p className="mr-4 mb-2 sm:mb-0">{name}</p>
            <button
              className="text-red-600"
              onClick={() => onDeleteBoard(name)}
            >
              Delete
            </button>
          </div>
        ))}
        {boards.length === 0 && <p className="px-4">No boards found.</p>}
      </div>
    </div>
  );
});
