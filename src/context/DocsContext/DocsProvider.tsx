import { useReducer, type ReactNode } from "react";
import { initialState, reducer } from "./docsReducer";
import { DocsDispatchContext, DocsStateContext } from "./DocsContext";

const DocsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DocsStateContext.Provider value={state}>
      <DocsDispatchContext.Provider value={dispatch}>
        {children}
      </DocsDispatchContext.Provider>
    </DocsStateContext.Provider>
  );
};

export default DocsProvider;
