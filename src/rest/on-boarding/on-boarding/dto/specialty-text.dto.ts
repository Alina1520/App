import { IsArray } from "class-validator";
import { Categories } from "src/domain";
import { DtoProperty, DtoPropertyOptional } from "src/libs";

export class SpecialityDto{
    @DtoProperty()
    @IsArray()
    speciality:Categories[]
}

export class TextDto{
    @DtoPropertyOptional()
    text:string
 }