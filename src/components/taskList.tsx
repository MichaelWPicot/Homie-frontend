import React, { useEffect, useState } from 'react';

import {Task} from '@/models/task';
import {User} from '@/models/user';
import { ModelProps } from '@/models/modelProps';
import { TaskDetails } from './taskDetails';
 
export const TaskList: React.FC<ModelProps.UserProps> =({user,tasks})=> {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:5190/users");
            const result = await response.json();
            setUsers(result);
          } catch (error) {
            console.error('Failed to fetch data:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);
    
      if (loading) {
        return <div>Loading...</div>;
      }
    
    const uniqueUserIds = new Set([...tasks.map(t => t.assignedUserId), ...tasks.map(t => t.createdUserId)]);
    // const userUrls = Array.from(uniqueUserIds).map(userId=> {
    //     return `http://localhost:5190/users/`+userId.toString();
    // })
    // const usersA = await Promise.all(userUrls.map(async url => {
    //     const res = await fetch(url);
    //     return res.text();
    //   }));
    const assignedTasks: Task[] = tasks.filter(task => task.assignedUserId === user.id);
    const createdTasks: Task[] = tasks.filter(task => 
        task.createdUserId === user.id && task.assignedUserId !== user.id
    );
    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Your Assigned Tasks:</h1>
            <TaskDetails user={user} tasks={assignedTasks} users={users}/>
            <h1 className="text-xl font-bold mt-6 mb-4">Your Created Tasks:</h1>
            <TaskDetails user={user}  tasks={createdTasks} users={users}/>     
            {[...uniqueUserIds].map(uniqueId=> (<div key={uniqueId}>Hello : {uniqueId}</div>))}     
            <div>{users.length}</div> 
            {users.map(user=> (<div key={user.id}>Hello : {user.firstName}</div>))}      
        </div>
    );
}