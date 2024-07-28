import { IsNumber } from "class-validator";
import { DtoProperty } from "src/libs";

export class CourseCreateDto{
    @DtoProperty()
    title:string

    @DtoProperty()
    description:string

    @DtoProperty()
    @IsNumber()
    amount:number
    
    @DtoProperty()
    currency:string
}