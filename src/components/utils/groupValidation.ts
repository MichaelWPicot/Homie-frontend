
import { ModelProps } from "@/models/modelProps";

export function GroupValidation({
  groupName,
  groupDescription,
  }: ModelProps.GroupValidationProps) {
  if (groupName.length <= 5) {
    throw new Error("Group Description should be more than 5 characters");
  }
  if (groupName.length <= 5) {
    throw new Error("Group Description should be more than 5 characters");
  }
  if (groupDescription.length >= 20) {
    throw new Error("Group Description should be less than 20 characters");
  }
  if (groupDescription.length >= 20) {
    throw new Error("Group Description should be less than 20 characters");
  }
}
