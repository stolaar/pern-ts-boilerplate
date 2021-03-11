interface IPasswordResetService {
    forgotPassword: (email: string, appUrl: string) => Promise<any>,
    resetPassword: (data: { password: string, password2: string, token: string, user: any }) => Promise<any >
}

export default IPasswordResetService
