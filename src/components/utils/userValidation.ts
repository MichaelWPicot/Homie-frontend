
import { ModelProps } from "@/models/modelProps";

export function UserValidation({
  firstName,
  lastName,
  }: ModelProps.UserValidationProps) {
  if (firstName.length <= 5) {
    throw new Error("First name should be more than 5 characters");
  }
  if (lastName.length <= 5) {
    throw new Error("Last name should be more than 5 characters");
  }
  if (firstName.length >= 20) {
    throw new Error("First name should be less than 20 characters");
  }
  if (lastName.length >= 20) {
    throw new Error("Last name should be less than 20 characters");
  }
}
