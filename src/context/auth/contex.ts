import type { User } from "@/types";
import React from "react";


export interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    accessToken: string | null;
    user: User | null
}


export interface AuthContextType extends AuthState{
    methods: AuthMethods;
}

export interface AuthMethods{
    login(email: string, password: string) : void;
    logout(): void;
}

export const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);