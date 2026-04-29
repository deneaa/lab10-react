import { createContext } from "react";
import type { IState, Action } from "./docsReducer";

export const DocsStateContext = createContext<IState | null>(null);
export const DocsDispatchContext = createContext<React.Dispatch<Action> | null>(
  null,
);
