export interface IPasswordService{
    comparePassword(pass:string,repeatPass:string):boolean
    compareHashedPassword(password:string,hashed:string):Promise<Boolean>
    hashPassword(password:string):Promise<String>
}
export interface ChangePasswordPayload{
email:string,
pass:string,
repeatPass:string
}