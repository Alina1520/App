import { Body, Controller, Patch, Post } from "@nestjs/common";
import { RestAuthService } from "./auth.service";
import { ChangePassword, SignInDto, SignUpDto } from "./dto";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("auth")
@Controller("auth")
export class RestAuthController{
    constructor(private readonly userService:RestAuthService){}

    @ApiOkResponse({
        status:201,
        description:"Create user"
    })
    @Post("signup")
    public async signUp(@Body() dto:SignUpDto){
        return await this.userService.signUp(dto)
    }

    @ApiOkResponse({
        status:201,
        description:"Register user"
    })
    @Post("signin")
    public async signIn(@Body() dto:SignInDto){
        return await this.userService.signIn(dto)
    }

    @ApiOkResponse({
        status:201,
        description:"Change password"
    })
    @Patch("forgot-password")
    public async forgotPassword(@Body() dto:ChangePassword){
        await this.userService.forgotPassword(dto)
    }


}