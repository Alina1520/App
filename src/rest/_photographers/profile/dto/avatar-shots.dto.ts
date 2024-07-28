import { DtoProperty, DtoPropertyOptional } from "src/libs";

export class AvatarDto{
    @DtoProperty()
    url:string
}
export class ShotsDto{
    @DtoPropertyOptional()
    urls:string[]
}