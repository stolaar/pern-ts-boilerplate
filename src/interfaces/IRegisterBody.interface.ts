export interface IRegisterBody {
    name: string;
    email: string;
    instagram_username: string;
    password: string;
    password2: string;
    address: string;
    city: string;
    postal_code: number;
    phone: string;
    package_data: any;
    package_size: string;
    birthday?: string;
}
