import { IsString } from "class-validator";
import { DtoProperty } from "src/libs";

export class LocationDto{
    @DtoProperty()
    country:string

    @DtoProperty()
    city:string

    @DtoProperty()
    @IsString()
    longitude:string
    
    @DtoProperty()
    @IsString()
    latitude:string
}