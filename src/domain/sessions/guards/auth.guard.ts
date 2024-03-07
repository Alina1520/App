import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { AUTH_USER_SERVICE, IAuthUserService } from "src/domain/users";
import { JwtService, removeBearerFromToken } from "src/libs";

@Injectable()
export class AuthGuard implements CanActivate{
    @Inject(AUTH_USER_SERVICE)
    private readonly userService:IAuthUserService
    constructor(private readonly jwtService:JwtService){}
    public async canActivate(context: ExecutionContext):Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const {headers} = request

        const token = removeBearerFromToken(headers.authorization)
        if(!token) throw new UnauthorizedException()

        const decoded =  this.jwtService.decodeToken(token)
        if(!decoded) throw new UnauthorizedException()

        request.userId = decoded.id
        const user = await this.userService.getUserById(decoded.id)

        request.role = user.role
        return true        
    }
}