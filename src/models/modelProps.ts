import { User } from "./user";
import { Task } from "./task";
import { Group } from "./group";
import { ReactNode } from "react";
export namespace ModelProps {
  interface CommonProps {
    user: User;
    tasks: Task[];
    users: User[];
  }

  interface TaskChangeProps {
    onTaskChange: (updatedTasks: Task[]) => void;
    tasks: Task[];
  }
 
  interface ChildrenProps {
    children: ReactNode;
  }

  export interface TaskProps extends CommonProps, TaskChangeProps {}

  export interface UserProps extends CommonProps {}

  export interface DeleteProps extends TaskChangeProps, ChildrenProps {
    task: Task;
  }

  export interface CreateProps extends TaskChangeProps, CommonProps {}
  export interface EditProps extends CreateProps {
    task: Task;
    onEditFormToggle: (taskId: number | null) => void;
  }
  export interface TaskValidationProps
    extends Omit<Task, "id" | "taskCreatedDate" | "lastModifiedDateTime"|"completeByDate"> {
      completeByDate: string;
    }
  export interface UserValidationProps
    extends Omit<User, "id" | "lastModifiedDateTime"> {}
  export interface EditUserProps extends Omit<CommonProps,'tasks'>{
    onUserChange: (upsertedUser:User, updatedUsers: User[]) => void;
    onEditFormToggle: (boolVal: true|false)=>void;
    editFormToggle:boolean;
  }
  export interface EditGroupProps extends GroupProps{
    onGroupChange:(upsertedGroup:Group)=>void;
    onEditFormToggle: (boolVal: true|false)=>void;
    editFormToggle:boolean;
  }
  export interface GroupProps {
    group: Group;
  }
  export interface GroupValidationProps extends Omit<Group,'lastModifiedTime'|'id'>{}
}
