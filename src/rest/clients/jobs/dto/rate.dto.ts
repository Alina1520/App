import { IsNumber } from "class-validator"
import { DtoProperty } from "src/libs"

export class CRateDto{
    @DtoProperty()
    @IsNumber()
    amount:number

    @DtoProperty()
    typePrice:string
    
    @DtoProperty()
    currency:string
}