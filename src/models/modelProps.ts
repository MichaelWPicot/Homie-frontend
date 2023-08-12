import {User} from './user';
import {Task} from './task';

export namespace ModelProps{
    export interface TaskProps {
        user: User;
        tasks:Task[];
        users:User[];
    }
    export interface UserProps {
        user: User;
        tasks:Task[];
    }
}
