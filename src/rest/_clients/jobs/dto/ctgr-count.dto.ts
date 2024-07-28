import { IsArray, IsNumber, IsString } from "class-validator";
import { Categories } from "src/domain";
import { DtoProperty } from "src/libs";

export class CategoriesDto{
    @DtoProperty()
    @IsString()
    category:Categories
}

export class CountMember{
    @DtoProperty()
    @IsNumber()
    participants:number
}