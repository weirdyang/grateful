export interface User {
    id: string;
    username: string;
    email: string;
}
export interface UserLogin {
    email: string;
    password: string;
}
export interface UserRegister {
    email: string;
    password: string;
    username: string;
}