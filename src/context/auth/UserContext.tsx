import { createContext } from "react";

import { UserContextProps } from "@/interfaces";

export const UserContext = createContext<UserContextProps>({
  user: null,
  userRole: null,
  userInformation: null,
});
