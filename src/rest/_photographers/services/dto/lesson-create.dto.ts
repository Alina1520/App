import { DtoProperty, DtoPropertyOptional } from "src/libs";

export class LessonCreateDto{
    @DtoProperty()
    title:string

    @DtoProperty()
    description:string

    @DtoProperty()
    duration:string
    
    @DtoPropertyOptional()
    videoFile:string
}