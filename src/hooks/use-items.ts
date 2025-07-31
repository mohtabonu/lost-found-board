import { useQuery } from "@tanstack/react-query";
import { http } from "@/services";
import type { Item } from "@/types";

export const useItems = () => {
  return useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const response = await http.get("/items");
      return response.data as Item[];
    },
  });
};
