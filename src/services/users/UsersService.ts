import IUsersService from "../../interfaces/IUsersService.interface";
import IUsersRepository from "../../interfaces/IUsersRepository.interface";
import {db} from "../../db/db";

class UsersService implements IUsersService {
    constructor(private usersRepository: IUsersRepository = db.users) {}

    async usersCount() {
        return this.usersRepository.usersCount()
    }

    async getUserDetails(email: string, userId: number) {
        // TODO: GET BY EMAIL AND ID
        return this.usersRepository.userDetails(email)
    }

}

export default UsersService
