import { Categories, Proposal } from "src/domain/photographer"
import { Client } from "../../entities"
import { User } from "src/domain/users"
import { TypePriceEnum } from "../enum"

export interface IJobService{
    chooseCategory(id:number,data:Categories):Promise<void>
    saveDataForJobs(data:any,job:IJob):Promise<void>
}

export interface IJob{
    id:number
    userId:number
    user:User
    proposal:Proposal[]
    data:Date
    time: string
    duration:number
    studio:boolean
    category:Categories
    asap:boolean
    typePrice:TypePriceEnum
    amount:number
    currency:string
    participants:number
    pickup:boolean
    description:string
    headline:string
    file:string   
    createdAt:Date
    updatedAt:Date
}    