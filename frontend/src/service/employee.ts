import { SERVER_URL } from "@/config";
import { IEmployee, IEmployeeInput } from "@/types/definitions";
import axios from "axios";

export const fetchEmployees = async () => {
  const response = await axios.get<IEmployee[]>(`${SERVER_URL}/employee`);
  return response.data;
};

export const createEmployee = async (employee: IEmployeeInput) => {
  const response = await axios.post<IEmployee>(`${SERVER_URL}/employee`, employee);
  return response.data;
}

export const updateEmployee = async (employee: IEmployeeInput) => {
  const response = await axios.put<IEmployee>(`${SERVER_URL}/employee/${employee.id}`, employee);
  return response.data;
}

export const deleteEmployee = async (id: number) => {
  const response = await axios.delete<boolean>(`${SERVER_URL}/employee/${id}`);
  return response.data;
}