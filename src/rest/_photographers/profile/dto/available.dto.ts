import { IsBoolean } from "class-validator";
import { DtoProperty } from "src/libs";

export class AvailableDto{
    @DtoProperty()
    @IsBoolean()
    bool:boolean
}