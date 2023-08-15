import React, { useEffect, useState } from "react";

import { Task } from "@/models/task";
import { User } from "@/models/user";
import { ModelProps } from "@/models/modelProps";
import { TaskDetails } from "./taskDetails";

export const TaskList: React.FC<ModelProps.TaskProps> = ({
  users,
  user,
  tasks,
  onTaskChange,
}) => {
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([]);
  const [createdTasks, setCreatedTasks] = useState<Task[]>([]);
  const [uniqueUserIds, setUniqueUserIds] = useState(new Set<number>());
  useEffect(() => {
    setAssignedTasks(tasks.filter((task) => task.assignedUserId === user.id));
    setCreatedTasks(tasks.filter((task) => task.createdUserId === user.id && task.assignedUserId!==user.id));
    const updatedUniqueUserIds = new Set([
      ...tasks.map((t) => t.assignedUserId),
      ...tasks.map((t) => t.createdUserId),
    ]);
    setUniqueUserIds(updatedUniqueUserIds);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Assigned Tasks:</h1>
      <TaskDetails
        user={user}
        tasks={assignedTasks}
        users={users}
        onTaskChange={onTaskChange}
      />
      <h1 className="text-xl font-bold mt-6 mb-4">Created Tasks:</h1>
      <TaskDetails
        user={user}
        tasks={createdTasks}
        users={users}
        onTaskChange={onTaskChange}
      />
    </div>
  );
};
