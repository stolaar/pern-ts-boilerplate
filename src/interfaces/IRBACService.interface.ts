import {Roles} from "../services/rbac/RBACService";

interface IRBACService {
    getUserRoles: (userId: number) => any,
    getUserPermissions: (userId: number) => any,
    addUserRoles: (userId: number, roles: Roles[]) => any,
    isAllowed: (userId: number, permissionId: number) => any,
    middleware: (params: { userId: number, permissionId: number },
                 error: () => any,
                 success: () => any) => any
}

export default IRBACService
