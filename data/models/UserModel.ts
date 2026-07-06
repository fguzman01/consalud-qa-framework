export interface UserModel {
    username: string;
    password: string;
}

export interface UsersData {
    validUser: UserModel;
    invalidUser: UserModel;
    empatyUser: UserModel;
}