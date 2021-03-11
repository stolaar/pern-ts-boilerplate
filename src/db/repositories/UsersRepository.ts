import {IDatabase, IMain} from 'pg-promise';
import {IResult} from 'pg-promise/typescript/pg-subset';
import {users as sql} from '../sql';
import IUsersRepository from "../../interfaces/IUsersRepository.interface";
import bcrypt from 'bcryptjs'
import {Roles} from "../../services/rbac/RBACService";

// TODO: Move interface into separate file
export interface User {
    user_id: number;
    name: string;
    instagram_username: string;
    email: string;
}


interface UserData {
    name: string;
    email: string;
    instagram_username: string;
    password: string;
    city: string;
    address: string;
    postal_code: string;
    phone: string;
    birthday?: string
}

export class UsersRepository implements IUsersRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {
    }

    async create(): Promise<null | void> {
        await this.db.none(sql.create);

        return this.initMasterUser()
    }

    async drop(): Promise<null> {
        return this.db.none(sql.drop);
    }

    async empty(): Promise<null> {
        return this.db.none(sql.empty);
    }

    async createUser(values: UserData): Promise<User> {
        values.birthday = values.birthday ? values.birthday : ''
        return this.db.one(sql.add, values)
    }

    async remove(id: number): Promise<number> {
        return this.db.result('DELETE FROM users WHERE id = $1', +id, (r: IResult) => r.rowCount);
    }

    async findById(id: number): Promise<User | null> {
        return this.db.oneOrNone(sql.findById, {id})
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.db.oneOrNone(sql.findByEmail, {email})
    }

    async findByInstagramUsername(instagramUsername: string): Promise<User | null> {
        return this.db.oneOrNone('SELECT * FROM users WHERE instagram_username = ${instagram_username}', {instagram_username: instagramUsername})
    }

    async findByInstagramAndEmail(instagramUsername: string, email: string): Promise<User | null> {
        return this.db.oneOrNone('SELECT * FROM users WHERE instagram_username = ${instagram_username} OR email = ${email}', {
            instagram_username: instagramUsername,
            email
        })
    }

    async updateActiveStatus(active: boolean, userId: number): Promise<any> {
        return this.db.none('UPDATE users SET is_active = $1 WHERE user_id = $2', [active, userId])
    }

    usersCount() {
        return this.db.any('SELECT count(*) filter ( where is_active = true ) as active, count(*) filter ( where is_active = false ) as inactive FROM users')
    }

    updateUser(data: any, userId: number) {
        const keys = Object.keys(data).map(key => `${key} = '${data[key]}'`).join(',')
        return this.db.any(`UPDATE users SET ${keys} WHERE user_id = $1`, userId)
    }

    userDetails(email: string) {
        return this.db.oneOrNone(`SELECT email, name, instagram_username, user_id as id, address FROM users WHERE users.email = $1`, email)
    }

    /*
    * TODO: GET EMAIL AND PASSWORD FROM ENV
    *  */
    async initMasterUser(){
        const count = await this.db.one(
            'SELECT count(*) FROM users WHERE email = $1',
            ['stolaaar@gmail.com'],
            a => +a.count
        )
        if (count > 0) {
            return null
        }
        const password = await bcrypt.hash('123123', 12)

        const masterUser: UserData = {
            email: 'stolaaar@gmail.com',
            instagram_username: 'a_stolic',
            name: "Ace",
            address: 'Edvard Kardelj',
            city: "Struga",
            postal_code: '6330',
            phone: '78 999 222',
            birthday: '22 Juli 1996',
            password
        }

        const user = await this.createUser(masterUser)

        await this.db.tx(task => {
            task.userRoles.addUserRole(Roles.MASTER_USER, user.user_id)
        })
    }
}
