import { Inject, Injectable } from "@nestjs/common";
import { ISessionService, SESSION_SERVICE} from "src/domain/sessions";
import { AUTH_USER_SERVICE, IAuthUserService, } from "src/domain/users";
import { ChangePassword, SignInDto, SignUpDto } from "./dto";

@Injectable()
export class RestAuthService{
    @Inject(SESSION_SERVICE)
    private readonly sessionService:ISessionService
    @Inject(AUTH_USER_SERVICE)
    private readonly userService:IAuthUserService

    public async signUp(dto:SignUpDto){
        const userId = await this.userService.signUp(dto)
        const session = await this.sessionService.start(userId)
        return {
            accessToken:session.accessToken,
            refreshToken:session.refreshToken
        }
    }

    public async signIn(dto:SignInDto){
        const userId = await this.userService.login(dto)
        const session = await this.sessionService.start(userId)
        return {
            accessToken:session.accessToken,
            refreshToken:session.refreshToken
        }
    }
    public async forgotPassword(dto:ChangePassword){
        await this.userService.forgotPassword(dto)
    }

}