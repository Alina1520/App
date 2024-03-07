import { DtoProperty, DtoPropertyOptional } from "src/libs";

export class SpecialityDto{
    @DtoProperty()
    categories:string[]
}

export class TextDto{
    @DtoPropertyOptional()
    text:string
 }