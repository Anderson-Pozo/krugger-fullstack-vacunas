
export interface IEmployee {
  id: number;
  firstName: string;
  lastName: string;
  identificationNumber: string;
  email: string;
  dateOfBirth: string | null;
  address: string | null;
  mobilePhone: string | null;
  vaccinationStatus: string | null;
  vaccineType: string | null;
  vaccinationDate: string | null;
  doseNumber: number | null;
};

export interface IUser {
  id: number;
  username: string;
  fullname: string;
  email: string;
  password: string;
  role: string;
};

export interface IEmployeeInput extends Partial<IEmployee> { };

export interface IFormFields {
  firstName: string;
  lastName: string;
  identificationNumber: string;
  email: string;
  dateOfBirth: Date | null;
  address: string | null;
  mobilePhone: string | null;
  vaccinationStatus: { code: string; name: string } | null;
  vaccineType: { code: string; name: string } | null;
  vaccinationDate: Date | null;
  doseNumber: number | null;
}
