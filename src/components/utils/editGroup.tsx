import React, { ReactNode, useEffect, useState } from "react";
import { Group } from "@/models/group";
import { ModelProps } from "@/models/modelProps";
import { ConfirmationModal } from "./confirmationModal";
import { GroupValidation } from "./groupValidation";
import ErrorAlert from "./errorAlert";
const EditGroup: React.FC<ModelProps.EditGroupProps> = ({
  group,
  onGroupChange,
  onEditFormToggle,
  editFormToggle}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (group) {
     const groupForm = new FormData();       
      groupForm.set("groupName", group.groupName);
      groupForm.set("groupDescription", group.groupDescription); 
      setFormData(groupForm);
    }
  }, [group]);
  
  const handleEdit = async () => {
    if (formData) {
      const groupBody = {
        id: group.id,
        groupName: formData.get("groupName") as string,
        groupDescription: formData.get("groupDescription") as string,
      };
      try {            
        GroupValidation(groupBody);
        const response = await fetch("/api/group", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(groupBody),
        });
        if (response.status === 200) {
          setErrorMessage(null);
          const upsertedGroup: Group = {
            ...groupBody,
            lastModifiedTime: new Date()  
        };
          onGroupChange(upsertedGroup);
          onEditFormToggle(true);
        } else {
          const errorData = await response.json(); 
          throw new Error(errorData.message ||`Failed to update user. Status code: ${response.status}`);
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
    <div className="">
      {errorMessage && <ErrorAlert message={errorMessage} />}
      {editFormToggle ? (
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-red-600 w-60"
          onClick={() => {onEditFormToggle(false)}}>
          Edit Group
        </button>
      ):(
        <form
          className="p-5 mt-1 flex-wrap border rounded-lg shadow-md flex self-center justify-around w-9/12"
          onSubmit={handleSubmit}
        >
          <div>
            <p>Group Name:</p>
            <input name="groupName" placeholder="Group Name" required defaultValue={group?.groupName} />
          </div>
          <div>
            <p>Group Description:</p>
            <input
              name="groupDescription"
              placeholder="Group Description"
              required
              defaultValue={group?.groupDescription}
            />
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
                onEditFormToggle(true);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) }
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

export default EditGroup;
