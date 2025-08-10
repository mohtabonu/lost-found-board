import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "@/services";
import type { Item } from "@/types";

export const useCreateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newItem: Omit<Item, "id" | "createdAt">) => {
      const itemWithUser = { ...newItem};
      const response = await http.post("/items", itemWithUser);
      return response.data as Item;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};
