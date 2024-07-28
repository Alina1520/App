import { DtoPropertyOptional } from "src/libs";

export class LetterFileDto{
    @DtoPropertyOptional()
    letter:string
    
    @DtoPropertyOptional()
    file:string
}