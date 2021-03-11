interface IUsersRepository {
    findByEmail: (email: string) => any,
    createUser: (credentials: any) => any,
    findById: (id: any) => any,
    findByInstagramUsername: (instagram_username: string) => any,
    updateActiveStatus: (active: boolean, userId: number) => any
    findByInstagramAndEmail: (instagram_username: string, email: string) => any,
    usersCount: () => any,
    updateUser: (data: any, userId: number) => any,
    userDetails: (email: string) => any
}

export default IUsersRepository
