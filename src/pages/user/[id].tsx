import React from 'react';
import { GetServerSideProps } from 'next';
import { TaskList } from '@/components/taskList';
import {User} from '@/models/user'
import {Task} from '@/models/task';
import { ModelProps }  from '@/models/modelProps';

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const id = Array.isArray(context.params?.id) ? context.params!.id[0] : context.params?.id || "0";
        const res = await fetch(`http://localhost:5190/users/`+ id);
        const user: User = await res.json();
        //TODO: update api endpoint for tasks to accept tasks/user/UserId to filter tasks on the backend
        const tasksRes = await fetch(`http://localhost:5190/tasks/`)
        const tasks: Task[] = await tasksRes.json();
        const taskFiltered = tasks.filter(task => task.assignedUserId === parseInt(id))
        return {
            props: {
                user,
                tasks:taskFiltered
            }
        }
    }
    catch (err) {
        if (err instanceof Error) {
            return { props: { errors: err.message } };
        }
        // Handle other unknown types of errors, or return a generic message
        return { props: { errors: 'An error occurred' } };
    }
}


const UserProfile: React.FC<ModelProps.UserProps> = ({user, tasks}) => {
    return (
        <div className="p-6 shadow-md text-black">
                <h1 className="text-2xl font-bold mb-4">Your Profile</h1>

                {user ? (
                    <div key={user?.id}>
                        <p className="text-xl font-medium mb-2">
                            Name: <span className="text-gray-600">{user.firstName} {user.lastName}</span>
                        </p>
                        <div className="mt-4">
                            <div className="text-lg font-semibold mb-2">Tasks:</div>
                            <TaskList user={user} tasks={tasks} />
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500">Loading...</p>
                )}
            </div>
    );
}

export default UserProfile;
