import { IsNumber } from "class-validator"
import { TypePriceEnum } from "src/domain"
import { DtoProperty, DtoPropertyOptional } from "src/libs"

export class TermsDto{
    @DtoPropertyOptional()
    @IsNumber()
    amount:number
    
    @DtoPropertyOptional()
    typePrice:TypePriceEnum
    
    @DtoPropertyOptional()
    currency:string
    
    @DtoPropertyOptional()
    @IsNumber()
    duration:number
}