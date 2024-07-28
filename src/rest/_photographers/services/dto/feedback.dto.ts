import { IsNumber } from "class-validator";
import { DtoProperty, DtoPropertyOptional } from "src/libs";

export class FeedbackDto{
    @DtoProperty()
    @IsNumber()
    rating:number

    @DtoPropertyOptional()
    text:string
}