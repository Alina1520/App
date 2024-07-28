import { Body, Controller, Patch, Post } from "@nestjs/common";
import { RestAuthService } from "./auth.service";
import { ChangePassword, SignInDto, SignUpDto } from "./dto";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("auth")
@Controller("auth")
export class RestAuthController{
    constructor(private readonly userService:RestAuthService){}
    @ApiOperation({ summary: 'Create user' })
    @ApiOkResponse({ status: 201, description: 'User created successfully' })
    @Post('signup')
    async signUp(@Body() dto: SignUpDto) {
        return await this.userService.signUp(dto);
    }

    @ApiOperation({ summary: 'Register user' })
    @ApiOkResponse({ status: 201, description: 'User signed in successfully' })
    @Post('signin')
    async signIn(@Body() dto: SignInDto) {
        return await this.userService.signIn(dto);
    }

    @ApiOperation({ summary: 'Change password' })
    @ApiOkResponse({ status: 201, description: 'Password changed successfully' })
    @Patch('forgot-password')
    async forgotPassword(@Body() dto: ChangePassword) {
        await this.userService.forgotPassword(dto);
    }

}