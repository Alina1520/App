import { DtoProperty, DtoPropertyOptional } from "src/libs";

export class LessonUpdateDto{
    @DtoPropertyOptional()
    title:string

    @DtoPropertyOptional()
    description:string

    @DtoPropertyOptional()
    duration:string
    
    @DtoPropertyOptional()
    videoFile:string
}