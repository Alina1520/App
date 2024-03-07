import { DynamicModule, Global, Module } from "@nestjs/common";
import { AuthUserService, PasswordService, UserInfoService,} from "./services";
import { provClass, provEntity } from "src/libs";
import { AUTH_USER_SERVICE, USER_INFO_SERVICE, USER_REPOSITORY } from "./typing";
import { User } from "./entities";
import { PHOTOGRAPHERS_REPOSITORY, Photographer, PhotographerModule } from "../photographer";

@Global()
@Module({})
export class AuthUserModule{
    static getProviders(){
        return [
            PasswordService,
            provClass(AUTH_USER_SERVICE,AuthUserService),
            provClass(USER_INFO_SERVICE,UserInfoService),
            provEntity(USER_REPOSITORY,User),
        ]
    }
    static forRoot():DynamicModule{
        return { 
            module:AuthUserModule,
            providers:AuthUserModule.getProviders(),
            imports:[PhotographerModule.forFeature()],
            exports:[AUTH_USER_SERVICE,USER_INFO_SERVICE,USER_REPOSITORY]
        }
    }
    static forFeature():DynamicModule{
        return { 
            imports:[PhotographerModule.forFeature()],
            module:AuthUserModule,
            providers:AuthUserModule.getProviders(),
            exports:[AUTH_USER_SERVICE,USER_INFO_SERVICE,USER_REPOSITORY]
        }
    }
}