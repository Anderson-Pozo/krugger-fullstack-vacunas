import { useContext } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { EmployeeForm } from "./EmployeeForm";
import { AppContext } from "@/context/AppContext";

export const EmployeeModal = () => {
  const { openModal, setOpenModal, setSelectedEmployee } =
    useContext(AppContext);
  return (
    <>
      <Button
        label="Nuevo"
        icon="pi pi-plus"
        severity="success"
        size="small"
        outlined
        onClick={() => setOpenModal(true)}
      />
      <Dialog
        header="Datos del empleado"
        visible={openModal}
        position="top"
        style={{ width: "50vw" }}
        onHide={() => {
          setOpenModal(false);
          setSelectedEmployee(null);
        }}
        draggable={false}
      >
        <EmployeeForm />
      </Dialog>
    </>
  );
};
