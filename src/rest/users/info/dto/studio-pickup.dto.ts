import { IsBoolean } from "class-validator";
import { DtoProperty } from "src/libs";

export class PickupDto{
    @DtoProperty()
    @IsBoolean()
    delivery:boolean
}

export class StudioDto{
    @DtoProperty()
    @IsBoolean()
    studio:boolean
}