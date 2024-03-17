import { IsBoolean, IsNumber, IsString } from "class-validator"
import { DtoProperty, DtoPropertyOptional } from "src/libs"

export class AppointmentDto{
    @DtoProperty()
    @IsString()
    time:string

    @DtoProperty()
    @IsNumber()
    duration:number

    @DtoProperty()
    data:Date
    
    @DtoPropertyOptional()
    @IsBoolean()
    asap:boolean
}