import { User } from "src/domain/users"
import { Categories, PerEnum } from "../enums"


export interface IPhotographer{
    id:number
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
    inProcess:number
    aboutYou:string
    jobs:number;
    rating:number
    balance:number
    available:boolean
    avatar:string
    createdAt:Date
    updatedAt:Date
}