import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "@/types";
import axios from "axios";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newUser: Omit<User, "id">) => {
      const response = await axios.post("https://6888f7a9adf0e59551bc1260.mockapi.io/api/v1/users", newUser);
      return response.data as User;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] }); 
    },
  });
};
