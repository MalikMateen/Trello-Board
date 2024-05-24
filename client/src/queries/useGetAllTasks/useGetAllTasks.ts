import { axios } from "libs";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../constants";
import { Task } from "types";

export const useGetAllTasks = () => {
  const queryKey = [QueryKey.GetAllTasks];

  const queryFn = async () => {
    const { data } = await axios.get<Task[]>("/task/getAll");

    return data;
  };

  return useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
  });
};
