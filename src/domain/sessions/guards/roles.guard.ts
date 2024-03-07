import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private readonly reflector:Reflector){}
    public async canActivate(context: ExecutionContext): Promise<boolean> {
        let {role} = context.switchToHttp().getRequest()
        if(!role) role = context.switchToHttp().getRequest().role
        const roleRequired = this.reflector.get<string>('role',context.getHandler())
        if(role!=roleRequired)  return false

        return true
        
    }

}