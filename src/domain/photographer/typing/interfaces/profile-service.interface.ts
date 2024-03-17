import { AccountType } from "src/domain/users"

export interface IProfileService{
    getPhotographerData(userId:number):Promise<IPhotographer>
    myProfile(userId:number):Promise<IProfile>
    availabitiy(userId:number,bool:boolean):Promise<void>
    about(userId:number,text:string):Promise<void>
    rate(userId:number,cost:string):Promise<void>
    speciality(userId:number,ctg:string[]):Promise<void>
    shots(userId:number,shots:string[]):Promise<void>
    avatar(userId:number,url:string):Promise<void>
}

export interface IPhotographer{
    avatar:string
    firstName:string
    lastName:string
    accountType:AccountType
    country:string
    city:string
    available:boolean
    balance:number
}
export interface IProfile{
    speciality:string[]
    amount:number
    per:string
    currency:string
    shots?:string[] | string
    portfolio?:string[] | string
    aboutYou:string
    jobs?:number
    feedbackIds:string
    inProcess?:number
    rating:number
}