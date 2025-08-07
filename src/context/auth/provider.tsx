import type React from "react";
import { AuthContext, type AuthState } from "./contex";
import { useEffect, useState } from "react";
import axios from "axios";
import type { User } from "@/types";

interface ProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>(() => ({
    isAuthenticated: false,
    accessToken: localStorage.getItem("access-token"),
    isLoading: !!localStorage.getItem("access-token"),
    user: null,
  }));

  const login = async (email: string, password: string) => {
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      const { data: users } = await axios.get(
        "https://6888f7a9adf0e59551bc1260.mockapi.io/api/v1/users"
      );

      const foundUser = users.find(
        (user: User) => user.email === email && user.password === password
      );

      if (foundUser) {
        localStorage.setItem("access-token", foundUser.id);
        setState({
          isAuthenticated: true,
          accessToken: foundUser.id,
          isLoading: false,
          user: foundUser,
        });
      } else {
        alert("Login failed: email or password is incorrect");
        setState({
          isAuthenticated: false,
          accessToken: null,
          isLoading: false,
          user: null,
        });
      }
    } catch (error) {
      alert("Login error" + error);
    }
  };
  const logout = () => {
    setState({
      isAuthenticated: false,
      accessToken: null,
      isLoading: false,
      user: null,
    });
  };

  useEffect(() => {
    const accessToken  = localStorage.getItem('access-token');
    if (accessToken) {
      fetch(`https://6888f7a9adf0e59551bc1260.mockapi.io/api/v1/users/${accessToken}`)
        .then((res) => res.json())
        .then((user) => {
          setState({
            isAuthenticated: true,
            accessToken,
            isLoading: false,
            user,
          });
        })
        .catch(() => {
          setState({
            isAuthenticated: false,
            accessToken: null,
            isLoading: false,
            user: null,
          });
        });
    }
  }, []);

  return (
    <AuthContext value={{ ...state, methods: { login, logout } }}>
      {children}
    </AuthContext>
  );
};
