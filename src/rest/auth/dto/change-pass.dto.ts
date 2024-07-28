import { IsEmail } from "class-validator"
import { DtoProperty } from "src/libs"

export class ChangePassword{
    @DtoProperty()
    @IsEmail()
    email:string
    
    @DtoProperty()
    pass:string

    @DtoProperty()
    repeatPass:string
}