import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "libs";
import { Task } from "types";
import { QueryKey } from "../../constants";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const mutationFn = async ({ title }: { title: string }): Promise<Task> => {
    const { data } = await axios.delete(`/task/delete/${title}`);

    return data;
  };

  return useMutation({
    mutationFn: mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.GetAllBoards] });
      queryClient.invalidateQueries({ queryKey: [QueryKey.GetAllTasks] });
    },
  });
};
