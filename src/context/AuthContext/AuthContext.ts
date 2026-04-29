import { createContext } from "react";
import type { AuthState } from "./authReducer";

export type AuthAction = { type: "LOGIN" } | { type: "LOGOUT" };

export type AuthContextType = {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
