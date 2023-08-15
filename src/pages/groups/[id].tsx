import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";

import { Group } from "@/models/group";
import { ModelProps } from "@/models/modelProps";
import EditGroup from "@/components/utils/editGroup"
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const id = Array.isArray(context.params?.id)
      ? context.params!.id[0]
      : context.params?.id || "0";
    const res = await fetch(`${process.env.API_BASE_URL}/groups/${id}`);
    const data = await res.json();
    const group: Group = { ...data };

    //TODO: stream in related tasks and users
    // const tasksRes = await fetch(`${process.env.API_BASE_URL}/tasks/`);
    // const tasks: Task[] = await tasksRes.json();
    // const taskFiltered: Task[] = tasks.filter(
    //   (task) =>
    //     task.assignedUserId === parseInt(id) ||
    //     task.createdUserId === parseInt(id),
    // );
    return {
      props: {
        group,
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

const GroupProfile: React.FC<ModelProps.GroupProps> = ({
  group: groupProp,
}) => {
  const [group, setGroup] = useState(groupProp);
  const handleGroupChange = (updatedGroup: Group) => {
    setGroup(updatedGroup);
  };
  //   const [users, setUsers] = useState(usersProp);
  //   const [user, setUser] = useState(userProp);
  //   const handleUserChange = (upsertedUser:User, updatedUsers: User[]) => {
  //     setUser(upsertedUser);
  //     setUsers(updatedUsers);
  //   };
  const [editFormToggle, setEditFormToggle] = useState(true);

  return (
    <div className="p-6 shadow-md text-black">
      <h1 className="text-2xl font-bold mb-4">Group Profile</h1>
      {group ? (
        <div key={group?.id}>
          {editFormToggle ? (
            <div className="text-xl font-medium mb-2">
               <div className="text-gray-600">
               Name: {group.groupName}
               </div>
              <div className="text-gray-600">
                Description: {group.groupDescription}
              </div>
            </div>
          ) : null}
          {<EditGroup group={group} onGroupChange={handleGroupChange}onEditFormToggle={setEditFormToggle}editFormToggle={editFormToggle}/> }
          <div className="mt-4">
            <div className="text-lg font-semibold mb-2">Tasks:</div>
            {/* <CreateButton
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
            /> */}
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default GroupProfile;
