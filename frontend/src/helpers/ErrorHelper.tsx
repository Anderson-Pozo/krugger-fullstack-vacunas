import { IFormFields } from "@/types/definitions";
import { FieldErrors } from "react-hook-form";

export const getErrorMessage = (
  name: keyof IFormFields,
  errors: FieldErrors<IFormFields>
) => {
  return (
    errors[name] && <small className="p-error">{errors[name]?.message}</small>
  );
};
