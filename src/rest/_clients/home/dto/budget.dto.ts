import { IsNumber } from "class-validator"
import { TypePriceEnum } from "src/domain"
import { DtoPropertyOptional } from "src/libs"

export class CRateDto{
    @DtoPropertyOptional()
    @IsNumber()
    amount:number

    @DtoPropertyOptional()
    typePrice:TypePriceEnum
    
    @DtoPropertyOptional()
    currency:string
}