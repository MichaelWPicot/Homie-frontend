import React, { useEffect, useState } from 'react';
import {Task} from '@/models/task';
import {User} from '@/models/user';
import { ModelProps } from '@/models/modelProps';

export const TaskDetails: React.FC<ModelProps.TaskProps> = ({user,tasks,users})=> {
    return (
        <div>
        {tasks.map(task=> {
            const assignedUser = users.find(user=>user.id===task.assignedUserId);
            const createdUser = users.find(user=> user.id===task.assignedUserId);
        return (
            <div key={task.id} className="bg-white p-4 mt-4 rounded-lg shadow-md">
                <div className="text-blue-600 font-bold">{task.taskName}</div>
                <div className="text-gray-700 mt-2">{task.taskDescription}</div>
                <div className="text-gray-500 mt-2">Created by: {assignedUser?.firstName} {assignedUser?.lastName}</div>
                <div className="text-gray-500">Assigned to: {createdUser?.firstName} {createdUser?.lastName}</div>
            </div>
        )})}
        </div>
    )
}