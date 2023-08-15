import React, { useEffect, useState } from "react";
import { Task } from "@/models/task";
import { User } from "@/models/user";
import { ModelProps } from "@/models/modelProps";
import DeleteButton from "@/components/utils/deleteButton";
import EditButton from "./utils/editTaskButton";

export const TaskDetails: React.FC<ModelProps.TaskProps> = ({
  user,
  tasks,
  users,
  onTaskChange,
}) => {
    const [showFormForTaskId, setShowFormForTaskId] = useState<number | null>(null);

  return (
    <div>
      {tasks.map((task) => {
        const taskDueDate = new Date(task.completeByDate);
        const dueDateString = `${
            taskDueDate.getUTCMonth() + 1
        }/${taskDueDate.getUTCDate()}/${taskDueDate.getUTCFullYear()}`;
        const taskCreationDate = new Date(task.taskCreatedDate);
        const creationDateString = `${
            taskCreationDate.getUTCMonth() + 1
        }/${taskCreationDate.getUTCDate()}/${taskCreationDate.getUTCFullYear()}`;
        const assignedUser = users.find(
          (user) => user.id === task.assignedUserId,
        );
        const createdUser = users.find(
          (user) => user.id === task.createdUserId,
        );
        const AssignedUserDiv = () => {
          return (
            <div className="text-gray-500">
              Assigned to: {createdUser?.firstName} {createdUser?.lastName}
            </div>
          );
        };
        const CreatedUserDiv = () => {
          return (
            <div className="text-gray-500 mt-2">
              Created by: {createdUser?.firstName} {createdUser?.lastName}
            </div>
          );
        };
        return (
            <div key={task.id}  className="p-5 mt-1 border rounded-lg shadow-md">
            {showFormForTaskId !== task.id &&( <DeleteButton
            task={task}
            onTaskChange={onTaskChange}
            tasks={tasks}
          >
            <div>
              <div className="text-blue-600 font-bold">{task.taskName}</div>
              <div className="text-gray-700 mt-2">{task.taskDescription}</div>
              <div className="text-gray-700 mt-2">
                Complete by: {dueDateString}
              </div>
              <div className="text-gray-700 mt-2">
                Created on: {creationDateString}
              </div>
              {task.createdUserId !== user.id &&
              task.assignedUserId !== user.id ? (
                <div>
                  <AssignedUserDiv />
                  <CreatedUserDiv />
                </div>
              ) : task.assignedUserId !== user.id ? (
                <AssignedUserDiv />
              ) : (
                <CreatedUserDiv />
              )}
            </div>
          </DeleteButton>)}
 <EditButton key={task.id} tasks={tasks} onTaskChange={onTaskChange} task={task} user={user} users={users} onEditFormToggle={(taskId: number | null) => setShowFormForTaskId(taskId)}/>
          
          </div>
        );
      })}
    </div>
  );
};
