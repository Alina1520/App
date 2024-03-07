export interface ISession{
    userId?:number
    accessToken:string
    refreshToken:string
    createdAt?:Date
    updatedAt?:Date
}