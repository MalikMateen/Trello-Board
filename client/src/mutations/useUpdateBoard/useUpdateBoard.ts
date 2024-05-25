import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "libs";
import { Board } from "types";
import { QueryKey } from "../../constants";

export const useUpdateBoard = () => {
  const queryClient = useQueryClient();

  const mutationFn = async ({
    sourceBoardName,
    destinationBoardName,
    taskTitle,
  }: {
    sourceBoardName: string;
    destinationBoardName: string;
    taskTitle: string;
  }): Promise<Board[]> => {
    const { data } = await axios.put("/board/update", {
      sourceBoardName,
      destinationBoardName,
      taskTitle,
    });

    return data;
  };

  return useMutation({
    mutationFn: mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.GetAllBoards] });
    },
  });
};
