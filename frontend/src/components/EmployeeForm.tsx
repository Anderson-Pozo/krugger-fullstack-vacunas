import { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { classNames } from "primereact/utils";
import { statusOptions, vaccineTypeOptions } from "@/constants/vaccination";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEmployee, updateEmployee } from "@/service/employee";
import { getErrorMessage } from "@/helpers/ErrorHelper";
import { AppContext } from "@/context/AppContext";
import { IFormFields } from "@/types/definitions";
import { USER_ROLES } from "@/constants/user";
import { toast } from "sonner";

export const EmployeeForm = () => {
  const queryClient = useQueryClient();
  const { selectedEmployee, setOpenModal, setSelectedEmployee, user } =
    useContext(AppContext);
  const isEmployee = user?.role === USER_ROLES.EMPLOYEE;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IFormFields>({ defaultValues: {} });

  useEffect(() => {
    if (selectedEmployee) {
      const { user, ...restEmployee } = selectedEmployee;
      reset({
        ...restEmployee,
        dateOfBirth: selectedEmployee.dateOfBirth
          ? new Date(selectedEmployee.dateOfBirth!)
          : null,
        vaccinationDate: selectedEmployee.vaccinationDate
          ? new Date(selectedEmployee.vaccinationDate!)
          : null,
        vaccinationStatus: statusOptions.find(
          (status) => status.name === selectedEmployee.vaccinationStatus
        ),
        vaccineType: vaccineTypeOptions.find(
          (vaccine) => vaccine.code === selectedEmployee.vaccineType
        ),
      });
    }
  }, [selectedEmployee]);

  const createEmployeeMt = useMutation({ mutationFn: createEmployee });
  const updateEmployeeMt = useMutation({ mutationFn: updateEmployee });

  const onSubmit = async (data: IFormFields) => {
    try {
      const formatData = {
        ...data,
        dateOfBirth: data.dateOfBirth?.toISOString(),
        vaccinationDate: data.vaccinationDate?.toISOString(),
        vaccineType: data.vaccineType?.name,
        vaccinationStatus: data.vaccinationStatus?.name,
      };

      if (selectedEmployee) {
        await updateEmployeeMt.mutateAsync({
          id: selectedEmployee.id,
          ...formatData,
        });
      } else {
        await createEmployeeMt.mutateAsync(formatData);
        reset({});
      }
      toast.info("Información guardada correctamente");
    } catch (error) {
      console.error({ error });
      toast.error("Error al guardar el empleado");
    } finally {
      resetForm();
    }
  };

  const resetForm = () => {
    setOpenModal(false);
    setSelectedEmployee(null);
    queryClient.invalidateQueries({ queryKey: ["getEmployees"] });
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="firstName" className="font-medium">
            Nombres
          </label>
          <InputText
            {...register("firstName", {
              required: "Este campo es requerido",
              pattern: {
                value: /^[A-Za-z\s]+$/i,
                message: "Solo se permiten letras",
              },
            })}
            className={classNames(
              { "p-invalid": errors.firstName },
              "p-inputtext-sm"
            )}
          />
          {getErrorMessage("firstName", errors)}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="lastName" className="font-medium">
            Apellidos
          </label>
          <InputText
            {...register("lastName", {
              required: "Este campo es requerido",
              pattern: {
                value: /^[A-Za-z\s]+$/i,
                message: "Solo se permiten letras",
              },
            })}
            className={classNames(
              { "p-invalid": errors.lastName },
              "p-inputtext-sm"
            )}
          />
          {getErrorMessage("lastName", errors)}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="identificationNumber" className="font-medium">
            Cédula
          </label>
          <InputText
            {...register("identificationNumber", {
              required: "Este campo es requerido",
              minLength: {
                value: 10,
                message: "Debe tener 10 dígitos",
              },
            })}
            className={classNames(
              { "p-invalid": errors.identificationNumber },
              "p-inputtext-sm"
            )}
            maxLength={10}
            keyfilter="int"
          />
          {getErrorMessage("identificationNumber", errors)}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-medium">
            Correo
          </label>
          <InputText
            {...register("email", {
              required: "Este campo es requerido",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Correo inválido",
              },
            })}
            className={classNames(
              { "p-invalid": errors.email },
              "p-inputtext-sm"
            )}
          />
          {getErrorMessage("email", errors)}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="dateOfBirth" className="font-medium">
            Fecha de nacimiento
          </label>
          <Controller
            name="dateOfBirth"
            control={control}
            rules={{ required: false }}
            render={({ field, fieldState }) => (
              <>
                <Calendar
                  inputId={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  dateFormat="dd/mm/yy"
                  className={classNames(
                    { "p-invalid": fieldState.error },
                    "p-inputtext-sm"
                  )}
                />
              </>
            )}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="address" className="font-medium">
            Dirección
          </label>
          <InputText {...register("address")} className="p-inputtext-sm" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="mobilePhone" className="font-medium">
            Teléfono
          </label>
          <InputText
            {...register("mobilePhone")}
            className="p-inputtext-sm"
            keyfilter="int"
          />
        </div>
        {isEmployee && (
          <>
            <div className="col-span-3">
              <hr className="my-1" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="vaccinationStatus" className="font-medium">
                Estado
              </label>
              <Controller
                name="vaccinationStatus"
                control={control}
                rules={{ required: false }}
                render={({ field, fieldState }) => (
                  <Dropdown
                    id={field.name}
                    value={field.value}
                    optionLabel="code"
                    placeholder="Seleccione un estado"
                    options={statusOptions}
                    focusInputRef={field.ref}
                    onChange={(e) => field.onChange(e.value)}
                    className={classNames(
                      { "p-invalid": fieldState.error },
                      "p-inputtext-sm w-full md:w-14rem"
                    )}
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="vaccineType" className="font-medium">
                Tipo de vacuna
              </label>
              <Controller
                name="vaccineType"
                control={control}
                rules={{ required: false }}
                render={({ field, fieldState }) => (
                  <Dropdown
                    id={field.name}
                    value={field.value}
                    optionLabel="code"
                    placeholder="Seleccione un tipo"
                    options={vaccineTypeOptions}
                    focusInputRef={field.ref}
                    onChange={(e) => field.onChange(e.value)}
                    className={classNames(
                      { "p-invalid": fieldState.error },
                      "p-inputtext-sm w-full md:w-14rem"
                    )}
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="vaccinationDate" className="font-medium">
                Fecha de vacunación
              </label>
              <Controller
                name="vaccinationDate"
                control={control}
                rules={{ required: false }}
                render={({ field, fieldState }) => (
                  <>
                    <Calendar
                      inputId={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      dateFormat="dd/mm/yy"
                      className={classNames(
                        { "p-invalid": fieldState.error },
                        "p-inputtext-sm"
                      )}
                    />
                  </>
                )}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="doseNumber" className="font-medium">
                Número de dosis
              </label>
              <Controller
                name="doseNumber"
                control={control}
                rules={{ required: false }}
                render={({ field, fieldState }) => (
                  <InputNumber
                    id={field.name}
                    inputRef={field.ref}
                    value={field.value}
                    onBlur={field.onBlur}
                    onValueChange={(e: any) => field.onChange(e)}
                    useGrouping={false}
                    inputClassName={classNames(
                      { "p-invalid": fieldState.error },
                      "p-inputtext-sm"
                    )}
                  />
                )}
              />
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col gap-1 mt-3">
        <Button
          label={selectedEmployee ? "Actualizar" : "Guardar"}
          loading={createEmployeeMt.isPending || updateEmployeeMt.isPending}
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </>
  );
};
