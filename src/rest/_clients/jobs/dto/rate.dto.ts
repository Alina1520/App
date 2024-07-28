import { IsNumber } from "class-validator"
import { TypePriceEnum } from "src/domain"
import { DtoProperty } from "src/libs"

export class CRateDto{
    @DtoProperty()
    @IsNumber()
    amount:number

    @DtoProperty()
    typePrice:TypePriceEnum
    
    @DtoProperty()
    currency:string
}