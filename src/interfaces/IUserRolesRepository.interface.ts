interface IUserRolesRepository {
    getUserRoles: (userId: number) => any,
    addUserRole: (role: any, userId: number) => any
}

export default IUserRolesRepository
