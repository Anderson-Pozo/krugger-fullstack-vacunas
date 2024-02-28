import { IEmployee, IEmployeeInput } from "@/types/definitions";
import authApi from "@/utils/authApi";

export const fetchEmployees = async () => {
  const response = await authApi.get<IEmployee[]>(`/employee`);
  return response.data;
};

export const getEmployeByDni = async (dni: string) => {
  const response = await authApi.get<IEmployee>(`/employee/${dni}`);
  return response;
}

export const createEmployee = async (employee: IEmployeeInput) => {
  const response = await authApi.post<IEmployee>(`/employee`, employee);
  return response.data;
}

export const updateEmployee = async (employee: IEmployeeInput) => {
  const response = await authApi.put<IEmployee>(`/employee`, employee);
  return response.data;
}

export const deleteEmployee = async (id: number) => {
  const response = await authApi.delete<boolean>(`/employee/${id}`);
  return response.data;
}