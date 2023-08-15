import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { TaskList } from "@/components/taskList";
import { User } from "@/models/user";
import { Task } from "@/models/task";
import { ModelProps } from "@/models/modelProps";
import CreateButton from "@/components/utils/createTaskButton";
import EditUser from '@/components/utils/editUser'
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const id = Array.isArray(context.params?.id)
      ? context.params!.id[0]
      : context.params?.id || "0";
    const res = await fetch(`${process.env.API_BASE_URL}/users/`);
    const users: User[] = await res.json();

    const foundUser = await users.find((user) => user.id === parseInt(id));
    if (!foundUser) {
      throw new Error("User not found");
    }
    const user: User = foundUser;
    //TODO: update api endpoint for tasks to accept tasks/user/UserId to filter tasks on the backend
    const tasksRes = await fetch(`${process.env.API_BASE_URL}/tasks/`);
    const tasks: Task[] = await tasksRes.json();
    const taskFiltered: Task[] = tasks.filter(
      (task) =>
        task.assignedUserId === parseInt(id) ||
        task.createdUserId === parseInt(id),
    );
    return {
      props: {
        users,
        user,
        tasks: taskFiltered,
      },
    };
  } catch (err) {
    if (err instanceof Error) {
      return { props: { errors: err.message } };
    }
    // Handle other unknown types of errors, or return a generic message
    return { props: { errors: "An error occurred" } };
  }
};

const UserProfile: React.FC<ModelProps.UserProps> = ({
  users: usersProp,
  user:userProp,
  tasks: taskProp,
}) => {
  const [tasks, setTasks] = useState(taskProp);
  const handleTaskChange = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
  };
  const [users, setUsers] = useState(usersProp);
  const [user, setUser] = useState(userProp);
  const handleUserChange = (upsertedUser:User, updatedUsers: User[]) => {
    setUser(upsertedUser);
    setUsers(updatedUsers);
  };
  const [editFormToggle,setEditFormToggle] = useState(true);

  return (
    <div className="p-6 shadow-md text-black">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>

      {user ? (
        <div key={user?.id}>
            {editFormToggle ? (  <p className="text-xl font-medium mb-2">
            Name:{" "}
            <span className="text-gray-600">
              {user.firstName} {user.lastName}
            </span>
          </p>):(null)}
          <EditUser users={users} user={user} onUserChange={handleUserChange}onEditFormToggle={setEditFormToggle}editFormToggle={editFormToggle}/>
          <div className="mt-4">
            <div className="text-lg font-semibold mb-2">Tasks:</div>
            <CreateButton
              users={users}
              user={user}
              tasks={tasks}
              onTaskChange={handleTaskChange}
            />
            <TaskList
              users={users}
              user={user}
              tasks={tasks}
              onTaskChange={handleTaskChange}
            />
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
