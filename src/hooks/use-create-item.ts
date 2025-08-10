import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "@/services";
import type { Item } from "@/types";
import { useContext } from "react";
import { AuthContext } from "@/context";

export const useCreateItem = () => {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  return useMutation({
    mutationFn: async (newItem: Omit<Item, "id" | "createdAt">) => {
      if (!user?.id) throw new Error("User is not logged in");
      const itemWithUser = { ...newItem, userId: user.id };
      const response = await http.post("/items", itemWithUser);
      return response.data as Item;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};
