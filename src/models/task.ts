export interface Task {
  id: number;
  taskName: string;
  taskDescription: string;
  completeByDate: Date;
  taskCreatedDate: Date;
  lastModifiedDateTime: Date;
  createdUserId: number;
  assignedUserId: number;
}
