import { axios } from "libs";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../constants";
import { Board } from "types";

export const useGetAllBoards = () => {
  const queryKey = [QueryKey.GetAllBoards];

  const queryFn = async () => {
    const { data } = await axios.get<Board[]>("/board/getAll");

    return data;
  };

  return useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
  });
};
