import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "libs";
import { Task } from "types";
import { QueryKey } from "../../constants";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  const mutationFn = async (task: Task): Promise<Task> => {
    const { data } = await axios.put("/task/update", task);

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
