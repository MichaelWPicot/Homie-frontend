import { Task } from "@/models/task";
import { ModelProps } from "@/models/modelProps";

export function TaskValidation({
  taskName,
  taskDescription,
  completeByDate,
  createdUserId,
  assignedUserId,
}: ModelProps.TaskValidationProps) {
  if (taskName.length <= 5) {
    throw new Error("Task name should be more than 5 characters");
  }
  if (taskDescription.length <= 5) {
    throw new Error("Task description should be more than 5 characters");
  }
  const completeByDateObj = new Date(completeByDate);
  const now = new Date();
  if (completeByDateObj <= now) {
    throw new Error("Complete By Date must be in the future");
  }
  if (typeof createdUserId !== "number") {
    throw new Error("createdUserId must be a number");
  }
  if (typeof assignedUserId !== "number") {
    throw new Error(`assignedUserId must be a number ${assignedUserId}`);
  }
}
