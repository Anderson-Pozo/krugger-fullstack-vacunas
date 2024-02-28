import { IEmployee, IUser } from "@/types/definitions";
import { Dispatch, SetStateAction, createContext } from "react";

interface ContextProps {
  selectedEmployee: IEmployee | null;
  setSelectedEmployee: Dispatch<SetStateAction<IEmployee | null>>;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  loginUser: (username: string, password: string) => Promise<void>;
  logout: () => void;
  user: IUser | undefined;
}

export const AppContext = createContext({} as ContextProps);
