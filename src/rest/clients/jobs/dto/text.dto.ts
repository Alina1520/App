import { IsString } from "class-validator";
import { DtoProperty, DtoPropertyOptional } from "src/libs";

export class AboutDto{
    @DtoProperty()
    @IsString()
    headline:string
    
    @DtoProperty()
    @IsString()
    description:string

    @DtoPropertyOptional()
    @IsString()
    file:string
}