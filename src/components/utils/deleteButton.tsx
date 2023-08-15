import React, { ReactNode, useState } from "react";
import { ModelProps } from "@/models/modelProps";
import { ConfirmationModal } from "./confirmationModal";

const DeleteButton: React.FC<ModelProps.DeleteProps> = ({
  children,
  onTaskChange,
  tasks,
  task,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleDelete = async (taskId: number) => {
    try {
      const response = await fetch("/api/task", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId }),
      });
      if (response.status === 200) {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        onTaskChange(updatedTasks);
      } else {
        console.error("Failed to delete.");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
    }
  };

  return (
    <div>
      {children}
      <button
        onClick={() => setModalOpen(true)}
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-60"
      >
        Delete
      </button>

      <ConfirmationModal
        isOpen={isModalOpen}
        onCancel={() => setModalOpen(false)}
        onConfirm={() => {
          handleDelete(task.id);
          setModalOpen(false);
        }}
      />
    </div>
  );
};

export default DeleteButton;
