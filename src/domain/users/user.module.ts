import { DynamicModule, Global, Module } from "@nestjs/common";
import { AuthUserService, PasswordService, UserBoardingService,} from "./services";
import { Seeder, provClass, provEntity } from "src/libs";
import { AUTH_USER_SERVICE, USER_BOARD_SERVICE,  USER_REPOSITORY } from "./typing";
import { User } from "./entities";
import { PhotographerModule } from "../photographer";
import { UserSeed } from "./seeders";
import { ClientModule } from "../clients";

@Global()
@Module({})
export class UserModule{
    static getProviders(){
        return [
            PasswordService,
            provClass(AUTH_USER_SERVICE,AuthUserService),
            provClass(USER_BOARD_SERVICE,UserBoardingService),
            provEntity(USER_REPOSITORY,User),
        ]
    }
    static forRoot():DynamicModule{
        return { 
            module:UserModule,
            imports:[PhotographerModule.forFeature(),ClientModule.forFeature()],
            providers:[...UserModule.getProviders()],
            exports:[AUTH_USER_SERVICE,USER_BOARD_SERVICE,USER_REPOSITORY]
        }
    }
    static forFeature():DynamicModule{
        return { 
            module:UserModule,
            imports:[PhotographerModule.forFeature(),ClientModule.forFeature()],
            providers:UserModule.getProviders(),
            exports:[AUTH_USER_SERVICE,USER_BOARD_SERVICE,USER_REPOSITORY]
        }
    }
}