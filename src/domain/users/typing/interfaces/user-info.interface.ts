import { AccountType, Gender, UserRole } from "../enum"

export interface IUserInfoService{
    addLocation(payload:LocationPayload,userId:number):Promise<void>
    chooseRole(role:UserRole.Client | UserRole.Photographer,userId:number):Promise<void>
    chooseGender(gender:Gender,userId:number):Promise<void>
    accountType(type:AccountType,userId:number):Promise<void>
    addCategories(categories:string[],userId:number):Promise<void>
    createRate(rate:RatePayload,userId:number):Promise<void>
    haveStudio(studio:boolean,userId:number):Promise<void>
    delivery(delivery:boolean,userId:number):Promise<void>
    description(text:string,userId:number):Promise<void>
    // uploadImages(images:string[])
}
export interface LocationPayload{
    country:string,
    city:string,
    longitude:string,
    latitude:string
}
export interface RatePayload{
    amount:number,
    currency:string,
    per:string
}