import {IDatabase, IMain} from 'pg-promise';
import {IResult} from 'pg-promise/typescript/pg-subset';
import {userRoles as sql} from '../sql';
import IUserRolesRepository from "../../interfaces/IUserRolesRepository.interface";

export class UserRolesRepository implements IUserRolesRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {}

    async create(): Promise<null> {
        return this.db.none(sql.create);
    }

   addUserRole(role: any, userId: number) {
       return this.db.one(sql.add, {user_id: userId, role})
   }

   getUserRoles(userId: number) {
        return this.db.any('SELECT * FROM user_roles WHERE user_id = $1', userId)
   }

    async remove(userId: number): Promise<number> {
        return this.db.result('DELETE FROM user_roles WHERE id = $1', userId, (r: IResult) => r.rowCount);
    }

}
