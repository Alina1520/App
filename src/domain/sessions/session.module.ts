import { DynamicModule, Global, Module } from "@nestjs/common";
import { JwtModule, provClass, provEntity } from "src/libs";
import { SESSION_REPOSITORY, SESSION_SERVICE } from "./typing";
import { SessionService } from "./session.service";
import { Session } from "./entities";
import { AuthGuard } from "./guards";
import { UserModule } from "../users";

@Module({})
export class SessionModule{
    static getProviders(){
        return [
            provClass(SESSION_SERVICE,SessionService),
            provEntity(SESSION_REPOSITORY,Session),
            AuthGuard
        ]
    }

    static getImports(){
        return [
            JwtModule.forFeature(),
            UserModule.forFeature()
        ]
    }

    static getExports(){
        return [SESSION_SERVICE]
    }

    static forRoot():DynamicModule{
        return {
            module:SessionModule,
            imports:SessionModule.getImports(),
            providers:SessionModule.getProviders(),
            exports:SessionModule.getExports()
        }
    }

    static forFeature():DynamicModule{
        return {
            module:SessionModule,
            imports:SessionModule.getImports(),
            providers:SessionModule.getProviders(),
            exports:SessionModule.getExports()
        }
    }
}