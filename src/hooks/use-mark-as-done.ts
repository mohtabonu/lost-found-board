import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "@/services";
import type { Item } from "@/types";


export const useMarkAsDone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id:string) => {
      const response = await http.put(`/items/${id}`, {status: 'Done'});
      return response.data as Item;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};
