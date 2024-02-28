import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";
import {
  VACCINATION_STATUS,
  statusOptions,
  vaccineTypeOptions,
} from "@/constants/vaccination";
import { IEmployee } from "@/types/definitions";
import { EmployeeModal } from "./EmployeeModal";
import { deleteEmployee, fetchEmployees } from "@/service/employee";
import { AppContext } from "@/context/AppContext";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { TableFilter } from "./TableFilter";

export const EmployeeTable = () => {
  const ROWS_PER_PAGE = 10;
  const queryClient = useQueryClient();
  const { setOpenModal, setSelectedEmployee } = useContext(AppContext);
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  const deleteEmployeeMt = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["getEmployees"] });
    },
  });

  const { isLoading, error, data } = useQuery({
    queryKey: ["getEmployees"],
    queryFn: fetchEmployees,
  });

  const [filters, setFilters] = useState<DataTableFilterMeta>({
    vaccinationStatus: { value: null, matchMode: "equals" },
    vaccineType: { value: null, matchMode: "equals" },
    vaccinationDate: { value: null, matchMode: "equals" },
  });

  const confirmDelete = (id: number) => {
    confirmDialog({
      message: "¿Está seguro de eliminar este registro?",
      header: "Eliminar empleado",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      acceptLabel: "Si",
      accept: async () => {
        try {
          await deleteEmployeeMt.mutateAsync(id);
        } catch (error) {
          console.error({ error });
          alert("Error al eliminar el empleado");
        }
      },
    });
  };

  // console.log({ data });
  if (error) return "An error has occurred: " + error.message;

  const actionBodyTemplate = (employeeData: IEmployee) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => {
            setOpenModal(true);
            setSelectedEmployee(employeeData);
          }}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDelete(employeeData.id)}
        />
      </>
    );
  };

  const StatusFilter = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <Dropdown
        value={{ code: options.value, name: options.value }}
        optionLabel="code"
        placeholder="Seleccione un estado"
        options={statusOptions}
        onChange={(e: DropdownChangeEvent) => {
          options.filterApplyCallback(e.value?.name);
        }}
        className="p-inputtext-sm"
        showClear
      />
    );
  };

  const VaccineTypeFilter = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <Dropdown
        value={{ code: options.value, name: options.value }}
        optionLabel="code"
        placeholder="Seleccione un tipo"
        options={vaccineTypeOptions}
        onChange={(e: DropdownChangeEvent) => {
          options.filterApplyCallback(e.value?.name);
        }}
        className="p-inputtext-sm"
        showClear
      />
    );
  };

  const VaccineDateFilter = (options: ColumnFilterElementTemplateOptions) => {
    // console.log({ options });

    return (
      <Calendar
        value={options.value ? new Date(options.value) : null}
        onChange={(e: DropdownChangeEvent) => {
          // setFilters((prev) => ({
          //   ...prev,
          //   vaccinationDate: { value: "2024-02-02", matchMode: "equals" },
          // }));
          options.filterApplyCallback(e.value);
        }}
        dateFormat="yy-mm-dd"
        className="p-inputtext-sm"
      />
    );
  };

  useEffect(() => {
    if (!data) return;
    setEmployees(data);
  }, [data]);

  return (
    <>
      <DataTable
        value={employees}
        paginator
        rows={ROWS_PER_PAGE}
        tableStyle={{ minWidth: "50rem" }}
        stripedRows
        className="text-sm"
        loading={isLoading}
        emptyMessage="No hay información para mostrar"
        filterDisplay="row"
        filters={filters}
        header={
          <div className="flex justify-between items-center">
            <EmployeeModal />
            {/* <TableFilter employees={employees} setEmployees={setEmployees} /> */}
          </div>
        }
      >
        <Column field="identificationNumber" header="Cédula" />
        <Column
          field="firstName"
          header="Nombres"
          body={(data: IEmployee) => (
            <>{data.firstName + " " + data.lastName}</>
          )}
        />
        <Column field="email" header="Correo" />
        <Column
          field="vaccinationStatus"
          header="Estado"
          sortable
          filter
          showFilterMenu={false}
          filterElement={StatusFilter}
          filterHeaderStyle={{ maxWidth: "14rem" }}
          body={(data: IEmployee) => (
            <>
              {data.vaccinationStatus === VACCINATION_STATUS.VACUNADO ? (
                <Badge value={data.vaccinationStatus} severity="success" />
              ) : (
                <Badge value={data.vaccinationStatus} severity="warning" />
              )}
            </>
          )}
        />
        <Column
          field="vaccineType"
          sortable
          header="Tipo"
          filter
          showFilterMenu={false}
          filterElement={VaccineTypeFilter}
          filterHeaderStyle={{ maxWidth: "14rem" }}
        />
        <Column
          field="vaccinationDate"
          filter
          showFilterMenu={false}
          filterElement={VaccineDateFilter}
          filterHeaderStyle={{ maxWidth: "14rem" }}
          header="Fecha vacunación"
        />
        <Column field="doseNumber" header="Dosis" />
        <Column
          header="Acciones"
          body={actionBodyTemplate}
          style={{ textAlign: "center", width: "8rem" }}
        />
      </DataTable>
    </>
  );
};
