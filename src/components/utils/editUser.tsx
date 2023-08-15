import React, { ReactNode, useEffect, useState } from "react";
import { User } from "@/models/user";
import { ModelProps } from "@/models/modelProps";
import { ConfirmationModal } from "./confirmationModal";
import { UserValidation } from "./userValidation";
import ErrorAlert from "./errorAlert";
const EditUser: React.FC<ModelProps.EditUserProps> = ({
  user,
  users,
  onUserChange,
  onEditFormToggle,
editFormToggle}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
     const userForm = new FormData();       
      userForm.set("firstName", user.firstName);
      userForm.set("lastName", user.lastName); 
      setFormData(userForm);
    }
  }, [user]);
  
  const handleEdit = async () => {
    if (formData) {
      const userBody = {
        id: user.id,
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
      };
      try {            
        UserValidation(userBody);
        const response = await fetch("/api/user", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userBody),
        });
        if (response.status === 200) {
          setErrorMessage(null);
          const upsertedUser: User = {
            ...userBody,
            lastModifiedDateTime: new Date()  
        };
          const updatedUsers = users.map(user => user.id === upsertedUser.id ? upsertedUser : user)
          onUserChange(upsertedUser, updatedUsers);
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
          Edit User
        </button>
      ):(
        <form
          className="p-5 mt-1 flex-wrap border rounded-lg shadow-md flex self-center justify-around w-9/12"
          onSubmit={handleSubmit}
        >
          <div>
            <p>First Name:</p>
            <input name="firstName" placeholder="First Name" required defaultValue={user?.firstName} />
          </div>
          <div>
            <p>User Description:</p>
            <input
              name="lastName"
              placeholder="Last Name"
              required
              defaultValue={user?.lastName}
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

export default EditUser;
