import { FC, ReactNode } from "react";
import { Provider } from "effector-react";

import { scope } from "../store/store";

export const AppStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <Provider value={scope}>{children}</Provider>;
};
