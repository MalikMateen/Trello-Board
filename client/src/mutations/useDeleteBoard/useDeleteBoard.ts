import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "libs";
import { Board } from "types";
import { QueryKey } from "../../constants";

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();

  const mutationFn = async ({
    boardName,
  }: {
    boardName: string;
  }): Promise<Board> => {
    const { data } = await axios.delete(`/board/delete/${boardName}`);

    return data;
  };

  return useMutation({
    mutationFn: mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.GetAllBoards] });
    },
  });
};
