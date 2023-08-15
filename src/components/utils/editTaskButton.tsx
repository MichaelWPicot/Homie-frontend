import React, { ReactNode, useEffect, useState } from "react";
import { Task } from "@/models/task";
import { ModelProps } from "@/models/modelProps";
import { ConfirmationModal } from "./confirmationModal";
import { TaskValidation } from "./taskValidation";
import ErrorAlert from "./errorAlert";
const EditButton: React.FC<ModelProps.EditProps> = ({
  user,
  users,
  onTaskChange,
  tasks,
  task,
  onEditFormToggle
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [assignedUserId, setAssignedUserId] = useState<string>("");
  const [completeState, setCompleteState] = useState<string>("");
  const handleAssignedUserChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setAssignedUserId(e.target.value);
  };
  useEffect(() => {
    if (task) {
     const taskForm = new FormData();       
      taskForm.set("taskName", task.taskName);
      taskForm.set("taskDescription", task.taskDescription);  
      const completeByDate = new Date(task.completeByDate);
      const dateStr = completeByDate.toISOString().substring(0,10);
      setCompleteState(dateStr);
      taskForm.set("completeByDate", completeByDate.toISOString());
      taskForm.set("assignedUserId", task.assignedUserId.toString());
      setFormData(taskForm);
    }
  }, [task]);
  
  const handleEdit = async () => {
    if (formData) {
      const taskBody = {
        id: task.id,
        taskName: formData.get("taskName") as string,
        taskDescription: formData.get("taskDescription") as string,
        completeByDate: new Date(
          formData.get("completeByDate") as string,
        ).toISOString(),
        createdUserId: user.id,
        assignedUserId: Number(formData.get("assignedUserId")),
      };
      try {            
        TaskValidation(taskBody);
        const response = await fetch("/api/task", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskBody),
        });
        if (response.status === 200) {
          setErrorMessage(null);
          const upsertedTask: Task = {
            ...taskBody,
            completeByDate: new Date(taskBody.completeByDate),
            taskCreatedDate: new Date(), 
            lastModifiedDateTime: new Date()  
        };
          const updatedTasks = tasks.map(task => task.id === upsertedTask.id ? upsertedTask : task)
          onTaskChange(updatedTasks);
          setShowForm(false);
          onEditFormToggle(null);
        } else {
          const errorData = await response.json(); 
          throw new Error(errorData.message ||`Failed to update task. Status code: ${response.status}`);
        }
      } catch (error) {
        setErrorMessage((error as Error).message);
      }
    }
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    setFormData(new FormData(form));
    setModalOpen(true);
  };
  const completeByDateString = formData?.get("completeByDate") as string;
  const completeByDate = new Date(completeByDateString);
  return (
    <div className="">
      {errorMessage && <ErrorAlert message={errorMessage} />}
      {showForm ? (
        <form
          className="p-5 mt-1 flex-wrap border rounded-lg shadow-md flex self-center justify-around w-9/12"
          onSubmit={handleSubmit}
        >
          <div>
            <p>Task Name:</p>
            <input name="taskName" placeholder="Task Name" required defaultValue={task?.taskName} />
          </div>
          <div>
            <p>Task Description:</p>
            <input
              name="taskDescription"
              placeholder="Task Description"
              required
              defaultValue={task?.taskDescription}
            />
          </div>
          <div>
            <p>Complete By:</p>
            <input name="completeByDate" type="date" required  defaultValue={completeState}/>
          </div>
          <div>
            <p>Assigned User:</p>
            <label
              htmlFor="assignedUserId"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select an option
            </label>
            <select
              name="assignedUserId"
              required
              id="AssignedUserId"
              defaultValue={task.assignedUserId}
              onChange={handleAssignedUserChange} 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <button
              className=" mb-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-red-600 w-60"
              type="submit"
            >
              Submit
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-60"
              type="button"
              onClick={() => {
                setErrorMessage(null);
                setShowForm(false);
                onEditFormToggle(null);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-red-600 w-60"
          onClick={() => {setShowForm(true);
            onEditFormToggle(task.id);}}
        >
          Edit Task
        </button>
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        onCancel={() => {
          setModalOpen(false);
        }}
        onConfirm={() => {
          handleEdit();
          setModalOpen(false);
        }}
      />
    </div>
  );
};

export default EditButton;
