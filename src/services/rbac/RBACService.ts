import IUserRolesRepository from "../../interfaces/IUserRolesRepository.interface";
import IRBACService from "../../interfaces/IRBACService.interface";
import {db} from "../../db/db";

export enum Roles {
    END_USER,
    MASTER_USER
}

enum UserPermissions {
    READ,
    WRITE,
    ADMIN
}

interface IRBACConfig {
    roles: Roles[],
    permissions: UserPermissions[]
}

const defaultConfig: IRBACConfig[] = [
    {roles: [Roles.END_USER], permissions: [UserPermissions.READ]},
    {roles: [Roles.MASTER_USER], permissions: [UserPermissions.ADMIN, UserPermissions.WRITE, UserPermissions.READ]}
]

class RBACService implements IRBACService {
    roles: any

    constructor(private userRolesRepository: IUserRolesRepository = db.userRoles, config: IRBACConfig[] = defaultConfig) {
        this.roles = config.reduce((accumulator: { [k: string]: UserPermissions[] }, current) => {
            for (let role of current.roles) {
                accumulator[role] = current.permissions
            }
            return accumulator
        }, {})
    }

    getUserRoles(userId: number) {
        if (!userId) console.error("No userId defined")
        return this.userRolesRepository.getUserRoles(userId)
    }

    async addUserRoles(userId: number, roles: Roles[]) {
        if (!userId || !roles) {
            console.error("userId or roles is not defined");
            return;
        }

        if (roles.length === 0) {
            console.error("roles length is 0, expected at least 1");
            return;
        }

        const userRoles = await this.getUserRoles(userId)
        for (let role of roles) {
            if (this.roles[role]) {
                if (userRoles) {
                    if (!userRoles.includes({role}))
                        await this.userRolesRepository.addUserRole(role, userId)
                }
                await this.userRolesRepository.addUserRole(role, userId)
            } else {
                console.error(role + " role is not defined in initial config")
                return;
            }
        }
    }

    async isAllowed(userId: number, permissionId: number) {
        if (!userId || !permissionId) {
            return false
        }

        const roles = await this.getUserRoles(userId)

        if (roles) {
            console.log(roles)
            return roles.some(({role}: { role: string }) => this.roles[role].includes(permissionId))
        } else {
            return false
        }
    }

    async getUserPermissions(userId: number) {
        const roles = await this.getUserRoles(userId)

        return roles.map((role: any) => role.role).reduce((accumulator: any, current: any) => {
            if (this.roles[current])
                this.roles[current].forEach((permission: any) => {
                    const existingPermissionIndex = accumulator.findIndex((value: any) => value === permission)
                    if (existingPermissionIndex < 0) accumulator.push(permission)
                })
            return accumulator
        }, [])
    }

    async middleware(
        params: { userId: number, permissionId: number },
        error: () => any,
        success: () => any
    ) {
        if (!params || !error || !success) {
            error();
            return;
        }
        const isAllowed = await this.isAllowed(params.userId, params.permissionId);
        if (isAllowed) {
            success()
        } else {
            error()
        }
    }
}

export default RBACService
