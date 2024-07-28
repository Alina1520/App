import { AccountType, User } from "src/domain/users"
import { Photographer } from "../../entities"
import { Categories, PerEnum } from "../enums"

export interface IProfileService{
    changePhotographerData(userId:number,data:any):Promise<void>
    getPhotographerById(id:number):Promise<Photographer>
}

export interface IPhotographer{
    user:User
    speciality:Categories[]
    amount:number
    per:string
    currency:string
    studio:boolean
    delivery:boolean
    shots:string
    portfolio:string
    feedbackIds:string
    aboutYou:string
    jobs:number;
    rating:number
    balance:number
    available:boolean
    avatar:string
    createdAt:Date
    updatedAt:Date
}
export interface IProfile{
    speciality:Categories[]
    amount:number
    per:string
    currency:string
    shots?:string[] | string
    portfolio?:string[] | string
    aboutYou:string
    jobs?:number | string
    feedbackIds:string
    inProcess?:number
    rating:number
}