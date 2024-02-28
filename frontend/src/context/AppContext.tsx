import { IEmployee } from "@/types/definitions";
import { Dispatch, SetStateAction, createContext } from "react";

interface ContextProps {
  selectedEmployee: IEmployee | null;
  setSelectedEmployee: Dispatch<SetStateAction<IEmployee | null>>;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

export const AppContext = createContext({} as ContextProps);
