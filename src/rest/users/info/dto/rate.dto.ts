import { IsNumber } from "class-validator";
import { DtoProperty } from "src/libs";

export class RateDto{
    @DtoProperty()
    @IsNumber()
    amount:number

    @DtoProperty()
    per:string
    
    @DtoProperty()
    currency:string
}