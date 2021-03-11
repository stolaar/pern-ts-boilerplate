interface IUsersService {
    usersCount: () => Promise<any>,
    getUserDetails: (email: string, userId: number) => any
}

export default IUsersService
