import { AccountType, Gender, UserRole } from "../enum"

export interface IOnBoardService{
    saveDataPhotographer(userId:number,data:any):Promise<void>
    saveUserInfo(field: string, value: any, id: number): Promise<void>
    addLocation(payload:LocationPayload,userId:number)
}
export interface LocationPayload{
    country:string,
    city:string,
    longitude:string,
    latitude:string
}