import React, { ReactNode, useState } from "react";
import { Task } from "@/models/task";
import { ModelProps } from "@/models/modelProps";
import { ConfirmationModal } from "./confirmationModal";
import { TaskValidation } from "./taskValidation";
import ErrorAlert from "./errorAlert";
const CreateButton: React.FC<ModelProps.CreateProps> = ({
  user,
  users,
  onTaskChange,
  tasks,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [assignedUserId, setAssignedUserId] = useState<string>("");
  const handleAssignedUserChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setAssignedUserId(e.target.value);
  };
  const handleCreate = async () => {
    if (formData) {
      const taskBody = {
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
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskBody),
        });
        if (response.status === 201) {
          setErrorMessage(null);
          const newTask: Task = await response.json();
          const updatedTaskArray = [...tasks, newTask];
          onTaskChange(updatedTaskArray);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to create task.");
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
  return (
    <div className="flex flex-col items-center justify-center">
      {errorMessage && <ErrorAlert message={errorMessage} />}
      {showForm ? (
        <form
          className="p-5 mt-1 flex-wrap border rounded-lg shadow-md flex self-center justify-around w-9/12"
          onSubmit={handleSubmit}
        >
          <div>
            <p>Task Name:</p>
            <input name="taskName" placeholder="Task Name" required />
          </div>
          <div>
            <p>Task Description:</p>
            <input
              name="taskDescription"
              placeholder="Task Description"
              required
            />
          </div>
          <div>
            <p>Complete By:</p>
            <input name="completeByDate" type="date" required />
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
              value={assignedUserId} 
              onChange={handleAssignedUserChange} 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
              <option value="" disabled hidden>
                Assign user
              </option>
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
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-red-600 w-60"
          onClick={() => setShowForm(true)}
        >
          Create New Task
        </button>
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        onCancel={() => {
          setModalOpen(false);
        }}
        onConfirm={() => {
          handleCreate();
          setModalOpen(false);
        }}
      />
    </div>
  );
};

export default CreateButton;
