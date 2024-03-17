import { IsNumber, IsString } from "class-validator";
import { DtoProperty } from "src/libs";

export class CategoriesDto{
    @DtoProperty()
    @IsString()
    type:string
}
export class CountMember{
    @DtoProperty()
    @IsNumber()
    count:number
}