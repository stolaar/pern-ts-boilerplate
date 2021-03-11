import {UsersRepository} from './UsersRepository';
import {UserRolesRepository} from "./UserRolesRepository";

interface IExtensions {
    users: UsersRepository,
    userRoles: UserRolesRepository,
}

export {
    IExtensions,
    UsersRepository,
    UserRolesRepository
};
