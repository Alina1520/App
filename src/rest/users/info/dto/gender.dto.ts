import { IsString } from "class-validator";
import { Gender } from "src/domain";
import { DtoProperty } from "src/libs";

export class GenderDto{
    @DtoProperty()
    @IsString()
    gender:Gender
}