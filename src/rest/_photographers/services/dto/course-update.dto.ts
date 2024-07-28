import { IsNumber } from "class-validator";
import { DtoPropertyOptional } from "src/libs";

export class CourseUpdateDto{
    @DtoPropertyOptional()
    title:string

    @DtoPropertyOptional()
    description:string

    @DtoPropertyOptional()
    @IsNumber()
    amount:number
    
    @DtoPropertyOptional()
    currency:string
}