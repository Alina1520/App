import { IsEmail } from "class-validator"
import { DtoProperty } from "src/libs"

export class SignInDto{    
    @DtoProperty()
    @IsEmail()
    email:string
    
    @DtoProperty()
    password:string
}