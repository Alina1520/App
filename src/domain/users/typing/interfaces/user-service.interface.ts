import { ChangePasswordPayload } from "./password-service.interface";

export interface IAuthUserService{
    signUp(payload:CreateUserPayload)
    login(payload:LoginPayload)
    forgotPassword(payload:ChangePasswordPayload)
    getUserById(id:number)
}

export interface CreateUserPayload{
    firstName:string;
    lastName:string;
    email:string;
    pass:string;
    repeatPass:string
}
export interface LoginPayload{
    email:string;
    password:string;
}
export interface TokenPairs{
    accessToken:string;
    refreshToken:string;
}