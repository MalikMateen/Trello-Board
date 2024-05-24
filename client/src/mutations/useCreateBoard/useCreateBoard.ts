import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "libs";
import { Board } from "types";
import { QueryKey } from "../../constants";

export const useCreateBoard = () => {
  const queryClient = useQueryClient();

  const mutationFn = async ({
    boardName,
  }: {
    boardName: string;
  }): Promise<Board> => {
    const { data } = await axios.post("/board/create", {
      boardName,
    });

    return data;
  };

  return useMutation({
    mutationFn: mutationFn,
    onSuccess: (createdBoard: Board) => {
      queryClient.setQueryData(
        [QueryKey.GetAllBoards],
        (allBoards: Board[]) => {
          return [...allBoards, createdBoard];
        }
      );
    },
  });
};
