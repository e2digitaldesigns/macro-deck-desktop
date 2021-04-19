import { createContext } from "react";
import { IntGlobalContextStateInterface } from "../../types";

export const GlobalContext = createContext<IntGlobalContextStateInterface | null>(
  null
);
