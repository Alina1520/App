import { IsEmail, IsString } from "class-validator";
import { DtoProperty } from "src/libs";

export class SignUpDto{
    @DtoProperty()
    @IsString()
    firstName:string
    
    @DtoProperty()
    @IsString()
    lastName:string
    
    @DtoProperty()
    @IsEmail()
    email:string
    
    @DtoProperty()
    pass:string

    @DtoProperty()
    repeatPass:string
}