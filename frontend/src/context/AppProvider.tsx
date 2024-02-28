import { ReactElement, useState } from "react";
import { AppContext } from "./AppContext";
import { IEmployee } from "@/types/definitions";

interface Props {
  children: ReactElement | ReactElement[];
}

export const AppProvider = ({ children }: Props) => {
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(
    null
  );
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        selectedEmployee,
        setSelectedEmployee,
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
