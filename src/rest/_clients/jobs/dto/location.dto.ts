import { DtoProperty } from "src/libs"

export class LocationDto{
    @DtoProperty()
    country:string

    @DtoProperty()
    city:string
}