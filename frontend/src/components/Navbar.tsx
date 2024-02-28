import { AppContext } from "@/context/AppContext";
import { confirmDialog } from "primereact/confirmdialog";
import { useContext } from "react";

export const Navbar = () => {
  const { logout, user } = useContext(AppContext);

  const confirmDelete = () => {
    confirmDialog({
      message: "¿Desea cerrar sesión?",
      header: "Cerrar sesión",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      acceptLabel: "Si",
      accept: () => {
        logout();
      },
    });
  };

  return (
    <div className="h-12 border-b-2 w-full">
      <div className="flex justify-between items-center h-full px-4">
        <h1 className="text-2xl font-semibold text-orange-400">
          Kruger Vacunas
        </h1>
        <div className="flex gap-x-4 items-center">
          <span className="text-gray-500 text-sm">
            {user?.fullname} - {user?.role}
          </span>
          <a
            className="text-red-500 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              confirmDelete();
            }}
          >
            Cerrar sesión
          </a>
        </div>
      </div>
    </div>
  );
};
