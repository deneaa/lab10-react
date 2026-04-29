import { useContext } from "react";
import { DocsDispatchContext, DocsStateContext } from "./DocsContext";

export function useDocsState() {
  const context = useContext(DocsStateContext);

  if (!context) {
    throw new Error("useDocsState must be used inside DocsProvider");
  }

  return context;
}

export function useDocsDispatch() {
  const context = useContext(DocsDispatchContext);

  if (!context) {
    throw new Error("useDocsDispatch must be used inside DocsProvider");
  }

  return context;
}
